import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '../components/Hero';
import FlashDeals from '../components/FlashDeals';
import RecentlyAdded from '../components/RecentlyAdded';
import AuthorProfileModal from '../components/AuthorProfileModal';
import { useAppContext } from '../context/AppContext';

const Home = ({ books }) => {
    const { cart, setCart } = useAppContext();
    
    // Core States for popups tracking
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);

    // FIX: FREEZE BACKGROUND DOCUMENT BODY SCROLLING WHEN POPUPS ARE OPEN
    useEffect(() => {
        if (selectedAuthor || selectedBook) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedAuthor, selectedBook]);

    const handleAuthorClick = (authorName) => {
        if (!authorName) return;
        
        setSelectedAuthor({
            name: authorName,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
            bio: `Renowned creator specializing in progressive structural worldbuilding, complex prose development, and historical reference catalogs for alternative realities.`
        });
    };

    return (
        <div className="bg-[#222] pb-20 min-h-screen relative">
    
            <Hero />

            <main className="bg-[#fafafa] min-h-screen pb-24 space-y-20 pt-12 overflow-x-hidden">
                {/* FIX: Both logged-in and logged-out users pass directly to the 
                  details modal without triggering any authentication warnings.
                */}
                <FlashDeals 
                    books={books} 
                    onAuthorClick={handleAuthorClick} 
                    onBookClick={(book) => setSelectedBook(book)}
                />
                
                <RecentlyAdded 
                    books={books} 
                    onAuthorClick={handleAuthorClick} 
                    onBookClick={(book) => setSelectedBook(book)}
                />
            </main>

            {/* =========================================================
                 ANIMATEPRESENCE PORTAL HUB (OVERLAY MANAGEMENT AREA)
               ========================================================= */}
            <AnimatePresence>
                {/* AUTHOR MODAL OVERLAY */}
                {selectedAuthor && (
                    <AuthorProfileModal
                        authorData={selectedAuthor}
                        books={books}
                        onClose={() => setSelectedAuthor(null)}
                        onSelectBook={(book) => setSelectedBook(book)} 
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* FIX: INLINE BOOK DETAILS MODAL OVERLAY (With internal responsive scrolling fix) */}
                {selectedBook && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
                        {/* Background Dark Dimmer Backing */}
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setSelectedBook(null)} 
                            className="absolute inset-0 bg-[#222]/70 backdrop-blur-md" 
                        />

                        {/* FIX: Modal Box Window Shell Container with responsive max-height and custom scrollbar controls */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-[#fcfcfc] border-4 border-[#222] w-full max-w-4xl rounded-[2.5rem] shadow-[16px_16px_0px_0px_#222] z-10 overflow-y-auto max-h-[85vh] md:max-h-[90vh] relative grid grid-cols-1 md:grid-cols-12 text-[#222]"
                        >
                            {/* Close Exit Circle Trigger Button */}
                            <button 
                                onClick={() => setSelectedBook(null)} 
                                className="absolute top-4 right-4 bg-white border-2 border-[#222] w-10 h-10 rounded-full font-black text-sm flex items-center justify-center hover:bg-red-100 transition-colors z-20 shadow-[2px_2px_0px_0px_#222]"
                            >
                                ✕
                            </button>

                            {/* Left Section Frame: Book Cover Art Display */}
                            <div className="md:col-span-5 bg-[#f3f4f6] p-6 border-b-4 md:border-b-0 md:border-r-4 border-[#222] flex items-center justify-center min-h-[260px] shrink-0">
                                <div className="w-full aspect-[3/4] max-w-[180px] md:max-w-[220px] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[6px_6px_0px_0px_#222] bg-white">
                                    <img src={selectedBook.img} alt={selectedBook.title} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Right Section Frame: Product Metadata Informative Matrix */}
                            <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between space-y-6 text-left overflow-y-visible">
                                <div className="space-y-4">
                                    <span className="inline-block bg-[#ffd166] text-[#222] border-2 border-[#222] px-4 py-1 rounded-full font-black text-xs uppercase shadow-[2px_2px_0px_0px_#222]">
                                        {selectedBook.tag || "Premium Index"}
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-[1000] uppercase italic tracking-tight text-[#222] leading-none">
                                        {selectedBook.title}
                                    </h2>
                                    <p className="text-sm font-bold text-gray-500">
                                        Author: <span className="text-[#222] underline decoration-[#64d4ac] decoration-4">{selectedBook.author}</span>
                                    </p>
                                    <div className="h-[2px] bg-dashed bg-gray-200 my-2" />
                                    <p className="text-xs md:text-sm text-[#222]/80 leading-relaxed font-medium">
                                        {selectedBook.desc || selectedBook.description || "No customized contextual log synopsis provided for this literary system registry record catalog catalog index."}
                                    </p>
                                </div>

                                {/* Purchase Action Terminal Controls UI */}
                                <div className="space-y-4 pt-4">
                                    <div className="bg-[#222] text-white p-4 rounded-2xl border-4 border-[#222] shadow-[4px_4px_0px_0px_#64d4ac] flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-white/50">Market Price</p>
                                            <p className="text-2xl md:text-3xl font-[1000] text-[#64d4ac]">${selectedBook.price}.00</p>
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-[#64d4ac]">In Stock</span>
                                    </div>
                                    
                                    {/* FIX: Buttons layout optimized to support Go Back and Dismiss actions layout */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button 
                                            type="button"
                                            onClick={() => setSelectedBook(null)}
                                            className="flex-[2] bg-[#64d4ac] text-[#222] border-4 border-[#222] py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                        >
                                            Go Back
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                setSelectedBook(null); // Closes book popup
                                                setSelectedAuthor(null); // Closes profile background panel layout entirely
                                            }} 
                                            className="flex-1 bg-white text-[#222] border-4 border-[#222] py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-center"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;