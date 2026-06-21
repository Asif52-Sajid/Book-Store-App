import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import { useAppContext } from '../context/AppContext';

// Import the shared authentication barrier modal
import AuthWarningModal from './AuthWarningModal';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 14
        }
    }
};

const FlashDeals = ({ books, onAuthorClick }) => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);
    const { user, cart, setCart } = useAppContext();
    
    // Controlled internal state for the Modals
    const [selectedBook, setSelectedBook] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    const safeBooks = Array.isArray(books) ? books : [];

    // --- ARRAY INTERSECTION FILTER ---
    const flashSaleBooks = safeBooks.filter((b) => {
        const bookCats = b.categories || [b.category];
        return b.id <= 6 || bookCats.includes("Flash Sale");
    });

    // Guard barrier gate check for authenticated context profiles
    const handleBookClick = (book) => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        setSelectedBook(book);
    };

    const handleAddToBag = (e, book) => {
        e.stopPropagation();
        setCart([...cart, book]);
    };

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 220 : 320;
            scrollContainerRef.current.scrollBy({
                left: direction === 'next' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="w-[92%] lg:w-[85%] mx-auto space-y-8 py-4 relative">

            {/* Header Layout Row */}
            <div className="flex items-center justify-between border-b-4 border-[#222] pb-4 gap-4">
                
                {/* Left Header Info */}
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Glowing Neo-Brutalist Badge */}
                    <div className="relative inline-block">
                        <span className="absolute inset-0 bg-[#ff6b6b] rounded-2xl transform -rotate-2 translate-x-1 translate-y-1 blur-sm opacity-60" />
                        <div className="relative bg-[#fcfcfc] text-[#222] font-[1000] text-sm md:text-base px-5 py-2.5 uppercase italic tracking-wider rounded-2xl border-4 border-[#222] flex items-center gap-2 shadow-[4px_4px_0px_0px_#ff6b6b]">
                            <span className="animate-pulse">⚡</span>
                            Limited Edition
                        </div>
                    </div>

                    {/* Section Title */}
                    <h2 className="text-2xl md:text-4xl font-[1000] uppercase tracking-tighter text-[#222] italic">
                        FLASH <span className="text-[#ff6b6b]">DEALS</span>
                    </h2>
                </div>

                {/* Control Arrow Switch Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => handleScroll('prev')}
                        className="bg-white border-4 border-[#222] w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#222] hover:shadow-[1px_1px_0px_0px_#222] hover:translate-x-[3px] hover:translate-y-[3px] active:bg-gray-100 transition-all duration-150"
                    >
                        <HiOutlineArrowSmLeft size={22} className="text-[#222]" />
                    </button>

                    <button
                        onClick={() => handleScroll('next')}
                        className="bg-[#ff6b6b] text-white border-4 border-[#222] w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#222] hover:shadow-[1px_1px_0px_0px_#222] hover:translate-x-[3px] hover:translate-y-[3px] active:bg-[#e55a5a] transition-all duration-150"
                    >
                        <HiOutlineArrowSmRight size={22} />
                    </button>
                </div>
            </div>

            {/* Horizontal Runway Slider Deck */}
            <div className="w-full overflow-hidden px-1">
                <motion.div
                    ref={scrollContainerRef}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="flex items-stretch gap-5 md:gap-7 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 pr-12 md:pr-24"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {/* Map Through Flash Sale Books */}
                    {flashSaleBooks.map((book) => {
                        const bookCats = (book.categories || [book.category]).filter(Boolean);

                        return (
                            <motion.div
                                key={book.id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    rotate: 1.5,
                                    boxShadow: "12px 12px 0px 0px #222"
                                }}
                                onClick={() => handleBookClick(book)}
                                className="bg-white border-4 border-[#222] p-3 md:p-4 rounded-[2.2rem] shadow-[8px_8px_0px_0px_#222] hover:border-[#ff6b6b] transition-colors duration-300 cursor-pointer flex flex-col justify-between relative group overflow-hidden shrink-0 snap-start w-[190px] sm:w-[220px] md:w-[250px]"
                            >
                                {/* Inner Card Visual Display Frame Wrapper */}
                                <div className="bg-[#222]/5 border-4 border-[#222] rounded-2xl aspect-[4/5] w-full overflow-hidden relative flex items-center justify-center group-hover:bg-[#ff6b6b]/10 transition-colors duration-300">
                                    <img
                                        src={book.img}
                                        alt={book.title}
                                        className="w-[82%] h-[88%] object-cover rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500"
                                        loading="lazy"
                                    />

                                    {/* Slanted Retro Product Badge Tag */}
                                    {book.tag && (
                                        <span className="absolute top-3 left-3 bg-[#ff6b6b] text-white text-[8px] md:text-[9px] font-black border-2 border-[#222] px-2.5 py-1 uppercase rounded-md transform -rotate-6 shadow-[2px_2px_0px_0px_#222]">
                                            {book.tag}
                                        </span>
                                    )}
                                </div>

                                {/* Details Typography Strip Panel */}
                                <div className="mt-4 pt-2 border-t-4 border-dashed border-[#222]/10 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* INTERACTIVE AUTHOR LINK TRIGGER */}
                                        <p 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Blocks parent item detail activation engine
                                                if (onAuthorClick) {
                                                    onAuthorClick(book.author);
                                                }
                                            }}
                                            className="text-[10px] uppercase font-[1000] tracking-widest text-gray-400 truncate hover:text-[#ff6b6b] hover:underline transition-colors cursor-pointer inline-block max-w-full pb-0.5"
                                        >
                                            {book.author}
                                        </p>

                                        <h3 className="font-black text-sm md:text-base uppercase italic tracking-tight text-[#222] line-clamp-1 group-hover:text-[#ff6b6b] transition-colors mt-0.5">
                                            {book.title}
                                        </h3>

                                        {/* CATEGORY TAG COMPONENT GRID */}
                                        {bookCats.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2 mb-1">
                                                {bookCats.map((cat, index) => (
                                                    <span 
                                                        key={index} 
                                                        className="text-[7px] md:text-[8px] font-black bg-[#64d4ac]/20 text-[#222] border border-black px-1.5 py-0.5 rounded-md uppercase tracking-tight"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-baseline gap-2 mt-2 pt-1 border-t border-gray-100">
                                        <span className="text-lg md:text-xl font-[1000] text-[#222]">
                                            ${book.price}.00
                                        </span>
                                        <span className="text-[10px] md:text-xs line-through text-gray-400 font-bold">
                                            ${book.price + 12}.00
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Premium "SEE MORE" End-Of-Row Action Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{
                            y: -10,
                            rotate: -1.5,
                            boxShadow: "12px 12px 0px 0px #222"
                        }}
                        onClick={() => navigate('/details')}
                        className="bg-white border-4 border-[#222] rounded-[2.2rem] shadow-[8px_8px_0px_0px_#222] hover:border-[#ff6b6b] transition-all duration-300 cursor-pointer flex flex-col justify-between relative group overflow-hidden shrink-0 snap-start w-[190px] sm:w-[220px] md:w-[250px]"
                    >
                        {/* Upper Display Visual Canvas Area */}
                        <div className="bg-[#fff9f9] border-4 border-[#222] m-3 md:m-4 rounded-2xl aspect-[4/5] overflow-hidden relative flex flex-col items-center justify-center group-hover:bg-[#ff6b6b]/5 transition-colors duration-300 gap-3">
                            <div className="w-14 h-14 bg-[#ff6b6b] border-4 border-[#222] rounded-full flex items-center justify-center text-white text-2xl font-black shadow-[4px_4px_0px_0px_#222] group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                                →
                            </div>
                            <span className="bg-[#222] text-white font-black text-[9px] uppercase px-2 py-0.5 rounded-md tracking-wider">
                                View Full Index
                            </span>
                        </div>

                        {/* Lower Action Frame Strip */}
                        <div className="bg-[#ff6b6b] border-t-4 border-[#222] p-4 text-center group-hover:bg-[#e55a5a] transition-colors duration-300">
                            <h4 className="font-black text-sm md:text-base uppercase italic tracking-tight text-white">
                                See More Books
                            </h4>
                            <p className="text-[9px] text-white/80 font-black uppercase mt-0.5 tracking-widest">
                                Explore Collection →
                            </p>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

            {/* INTERLOCKING MODAL TREE */}
            <AnimatePresence>
                {selectedBook && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBook(null)} className="absolute inset-0 bg-[#222]/60 backdrop-blur-sm" />

                        {/* INTERNAL RESPONSIVE SCROLL FIXED BOUNDARY CONTAINER */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-[#fcfcfc] border-4 border-[#222] w-full max-w-4xl rounded-[2.5rem] shadow-[16px_16px_0px_0px_#222] z-10 overflow-y-auto max-h-[85vh] md:max-h-[90vh] relative grid grid-cols-1 md:grid-cols-12 text-[#222] font-['Work_Sans']"
                        >
                            <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 bg-white border-2 border-[#222] w-10 h-10 rounded-full font-black text-sm flex items-center justify-center hover:bg-red-100 transition-colors z-20 shadow-[2px_2px_0px_0px_#222]">✕</button>

                            <div className="md:col-span-5 bg-[#f3f4f6] p-6 border-b-4 md:border-b-0 md:border-r-4 border-[#222] flex items-center justify-center min-h-[300px] md:min-h-auto shrink-0">
                                <div className="w-full aspect-[3/4] max-w-[240px] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[6px_6px_0px_0px_#222] bg-white">
                                    <img src={selectedBook.img} alt={selectedBook.title} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between space-y-6 text-left overflow-y-visible">
                                <div className="space-y-4">
                                    <span className="inline-block bg-[#ffd166] text-[#222] border-2 border-[#222] px-4 py-1 rounded-full font-black text-xs uppercase shadow-[2px_2px_0px_0px_#222]">
                                        {selectedBook.tag || "Premium Index"}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-[1000] uppercase italic tracking-tight text-[#222] leading-none">{selectedBook.title}</h2>
                                    <p className="text-sm font-bold text-gray-500">Author: <span className="text-[#222] underline decoration-[#64d4ac] decoration-4">{selectedBook.author}</span></p>
                                    <div className="h-[2px] bg-dashed bg-gray-200 my-2" />
                                    <p className="text-xs md:text-sm text-[#222]/80 leading-relaxed font-medium">{selectedBook.desc || selectedBook.description}</p>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="bg-[#222] text-white p-4 rounded-2xl border-4 border-[#222] shadow-[4px_4px_0px_0px_#64d4ac] flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-white/50">Market Price</p>
                                            <p className="text-2xl md:text-3xl font-[1000] text-[#64d4ac]">${selectedBook.price}.00</p>
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-[#64d4ac]">In Stock</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                handleAddToBag(e, selectedBook);
                                                setSelectedBook(null);
                                            }}
                                            className="flex-1 bg-[#64d4ac] text-[#222] border-4 border-[#222] py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                        >
                                            Add Item To Bag
                                        </button>
                                        <button type="button" onClick={() => setSelectedBook(null)} className="bg-white text-gray-500 border-4 border-gray-300 py-3.5 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors">Dismiss</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* GLOBAL SECURE ACCOUNT AUTHENTICATION PORTAL MODAL DIALOG */}
            <AnimatePresence>
                {isAuthModalOpen && (
                    <AuthWarningModal 
                        isOpen={isAuthModalOpen} 
                        onClose={() => setIsAuthModalOpen(false)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default FlashDeals;