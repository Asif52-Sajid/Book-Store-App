import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { 
    HiOutlineChevronDown, 
    HiOutlineFilter, 
    HiArrowSmRight
} from 'react-icons/hi';

// --- IMPORT THE MODALS FROM COMPONENTS ---
import AuthorProfileModal from '../components/AuthorProfileModal';
import AuthWarningModal from '../components/AuthWarningModal';

const Details = () => {
    const { user, cart, setCart } = useAppContext();
    const navigate = useNavigate();

    // Core Functional Component States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Vault Collections');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Controlled state manager for Auth Warning Modal
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    // Controlled state manager for Author Profiler Overlay
    const [selectedAuthorData, setSelectedAuthorData] = useState(null);

    // --- LOCK BACKGROUND SCROLL WHEN ANY MODAL IS OPEN ---
    useEffect(() => {
        const anyModalOpen = !!selectedBook || !!selectedAuthorData || isAuthModalOpen;
        if (anyModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [selectedBook, selectedAuthorData, isAuthModalOpen]);

    // Read live catalog resources
    const savedBooks = localStorage.getItem('my_bookstore_books');
    const safeBooks = savedBooks ? JSON.parse(savedBooks) : [];

    const searchedBooks = safeBooks.filter(b => 
        b?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b?.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rowRefs = useRef({});

    const scrollRowRight = (categoryKey) => {
        const el = rowRefs.current[categoryKey];
        if (el) {
            el.scrollBy({ left: 240, behavior: 'smooth' });
        }
    };

    const standardStockBooks = searchedBooks.filter(b => !b.category || b.category === "General Stock");
    const flashSaleBooks = standardStockBooks.filter(b => b.id <= 4);
    const newArrivalsBooks = standardStockBooks.filter(b => b.id > 4 && b.id <= 8);
    const premiumVaultBooks = standardStockBooks.filter(b => b.id > 8);
    const bestsellerBooks = standardStockBooks.filter(b => b.tag === "Bestseller" || b.price > 25);

    const adminCategories = [...new Set(safeBooks
        .map(b => b.category)
        .filter(cat => cat && cat !== "General Stock")
    )];

    const baseSections = [
        { id: 'Flash Sale Items', title: 'Flash Sale Block', books: flashSaleBooks, badge: '⚡ Limited', color: 'bg-[#ff6b6b]' },
        { id: 'Recently Added Arrivals', title: 'Recently Added Arrivals', books: newArrivalsBooks, badge: '✨ Fresh', color: 'bg-[#64d4ac]' },
        { id: 'Recommended Stacks', title: 'Recommended Vault Stacks', books: premiumVaultBooks, badge: '👑 Premium', color: 'bg-[#ffd166]' },
        { id: 'Bestselling Classics', title: 'Bestselling Classics', books: bestsellerBooks, badge: '🔥 Popular', color: 'bg-purple-400' }
    ];

    const dynamicAdminSections = adminCategories.map((catName) => ({
        id: catName,
        title: catName,
        books: searchedBooks.filter(b => b.category === catName),
        badge: '⭐ Archive',
        color: 'bg-indigo-500'
    }));

    const allRenderedSections = [...baseSections, ...dynamicAdminSections];

    const categoryOptions = [
        'All Vault Collections',
        'Flash Sale Items',
        'Recently Added Arrivals',
        'Recommended Stacks',
        'Bestselling Classics',
        ...adminCategories
    ];

    const handleCardOpenClick = (e, book) => {
        e.stopPropagation();
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        setSelectedBook(book);
    };

    const handleAuthorClick = (e, authorName) => {
        e.stopPropagation();
        
        const simulatedAuthorPayload = {
            name: authorName,
            avatar: null, 
            bio: `Author profile archive for ${authorName}. Renowned creator specializing in complex structural worldbuilding and prose development.`
        };

        setSelectedAuthorData(simulatedAuthorPayload);
    };

    const handleAddToBag = (e, book) => {
        e.stopPropagation();
        setCart([...cart, book]);
    };

    const BookCard = ({ book }) => (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={(e) => handleCardOpenClick(e, book)}
            className="bg-white border-4 border-[#222] p-4 rounded-3xl shadow-[6px_6px_0px_0px_#222] transition-all cursor-pointer flex flex-col justify-between relative group overflow-hidden w-[220px] md:w-auto shrink-0"
        >
            <div className="bg-[#f3f4f6] border-4 border-[#222] rounded-2xl aspect-[4/5] w-full overflow-hidden relative flex items-center justify-center">
                <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                {book.tag && (
                    <span className="absolute top-2.5 right-2.5 bg-[#ff6b6b] text-[10px] font-black border-2 border-[#222] px-2.5 py-0.5 uppercase rounded-md shadow-[2px_2px_0px_0px_#222] text-white tracking-wider">
                        {book.tag}
                    </span>
                )}
            </div>

            <div className="mt-4 space-y-1 flex-grow">
                <p 
                    onClick={(e) => handleAuthorClick(e, book.author)}
                    className="text-[10px] uppercase font-black tracking-widest text-[#222]/40 truncate hover:text-[#64d4ac] hover:underline transition-all cursor-pointer inline-block max-w-full pb-0.5"
                >
                    {book.author}
                </p>
                <h3 className="font-black text-base uppercase italic tracking-tight line-clamp-1 group-hover:text-[#64d4ac] transition-colors">{book.title}</h3>
                <p className="text-xl font-[1000] text-[#222]">${book.price}.00</p>
            </div>

            <button
                type="button"
                onClick={(e) => handleAddToBag(e, book)}
                className="mt-4 w-full bg-[#64d4ac] text-[#222] border-3 border-[#222] py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#222] hover:text-white transition-all duration-300"
            >
                ⚡ Quick Add
            </button>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfc] text-[#222] pb-32 overflow-x-hidden relative">

            {/* HERO HEADER */}
            <div className="bg-[#222] text-white py-16 px-6 border-b-4 border-[#222] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
                <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
                    <span className="bg-[#64d4ac] text-[#222] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border-2 border-[#222] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
                        Archival Interface
                    </span>
                    <h1 className="text-5xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-none">
                        THE VAULT <span className="text-[#64d4ac]">INDEX</span>
                    </h1>
                    <p className="text-white/60 text-xs md:text-sm max-w-lg mx-auto font-medium">
                        Filter across rows seamlessly or toggle dropdown queries to see unique publishing categories instantly.
                    </p>
                </div>
            </div>

            {/* FILTER CONTROLS STRIP */}
            <div className="bg-[#64d4ac] border-b-4 border-[#222] sticky top-[0px] z-40 py-4 px-4 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    <div className="flex-1 relative">
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type keywords to see live view..."
                            className="w-full bg-[#fcfcfc] text-[#222] border-3 border-[#222] pl-4 pr-4 py-3 rounded-xl focus:outline-none font-black text-xs md:text-sm shadow-[4px_4px_0px_0px_#222]"
                        />
                    </div>

                    <div className="relative md:w-72">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full bg-white text-[#222] border-3 border-[#222] px-4 py-3 rounded-xl font-black text-xs md:text-sm flex items-center justify-between shadow-[4px_4px_0px_0px_#222] hover:bg-gray-50 transition-all"
                        >
                            <span className="flex items-center gap-2 uppercase truncate">
                                <HiOutlineFilter className="text-[#64d4ac] text-base shrink-0" />
                                {selectedCategory}
                            </span>
                            <HiOutlineChevronDown className={`transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                                    <motion.ul
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 5, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 right-0 bg-white border-4 border-[#222] mt-2 rounded-2xl shadow-[8px_8px_0px_0px_#222] z-50 overflow-hidden divide-y-2 divide-gray-100 font-bold text-xs uppercase tracking-wide text-[#222] max-h-60 overflow-y-auto"
                                    >
                                        {categoryOptions.map((option) => (
                                            <li 
                                                key={option}
                                                onClick={() => {
                                                    setSelectedCategory(option);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between hover:bg-[#64d4ac]/20 ${selectedCategory === option ? 'bg-[#64d4ac] font-black' : ''}`}
                                            >
                                                <span className="truncate">{option}</span>
                                                {selectedCategory === option && <span className="text-[10px] bg-[#222] text-white px-2 py-0.5 rounded shrink-0">Active</span>}
                                            </li>
                                        ))}
                                    </motion.ul>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* MAIN CATALOG BODY FEED */}
            <div className="w-[95%] lg:w-[85%] mx-auto mt-16 space-y-20">
                <AnimatePresence mode="wait">
                    {allRenderedSections.map((section) => {
                        const shouldShowSection = section.books.length > 0 && 
                            (selectedCategory === 'All Vault Collections' || selectedCategory === section.id);

                        if (!shouldShowSection) return null;

                        return (
                            <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="flex items-center justify-between border-b-4 border-[#222] pb-3">
                                    <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                                        <span className={`text-white font-black text-[10px] md:text-xs px-3 py-1 uppercase rounded-lg border-2 border-[#222] shadow-[2px_2px_0px_0px_#222] ${section.color}`}>
                                            {section.badge}
                                        </span>
                                        <h2 className="text-xl md:text-3xl font-[1000] uppercase italic tracking-tight text-[#222]">{section.title}</h2>
                                        <span className="bg-white text-[#222] border-2 border-[#222] text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#222]">
                                            {section.books.length} {section.books.length === 1 ? 'Book' : 'Books'} Available
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => scrollRowRight(section.id)}
                                        className="md:hidden flex items-center gap-1 bg-white text-[#222] border-3 border-[#222] p-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none bg-amber-50 shrink-0 ml-2"
                                    >
                                        Next <HiArrowSmRight size={16} className="text-[#64d4ac]" />
                                    </button>
                                </div>

                                <div ref={el => rowRefs.current[section.id] = el} className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0 scroll-smooth">
                                    {section.books.map(book => (
                                        <div key={book.id} className="snap-center shrink-0">
                                            <BookCard book={book} />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {searchedBooks.length === 0 && (
                    <div className="text-center py-24 bg-white border-4 border-dashed border-[#222]/20 rounded-3xl">
                        <p className="font-black text-lg md:text-xl uppercase italic text-[#222]/40">No entries match your filtering keywords</p>
                    </div>
                )}
            </div>

            {/* ITEM SELECTION PROFILE MODAL DETAILED INDEX */}
            <AnimatePresence>
                {selectedBook && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBook(null)} className="absolute inset-0 bg-[#222]/60 backdrop-blur-sm" />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-[#fcfcfc] border-4 border-[#222] w-full max-w-4xl rounded-[2.5rem] shadow-[16px_16px_0px_0px_#222] z-10 relative grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto"
                        >
                            <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 bg-white border-2 border-[#222] w-10 h-10 rounded-full font-black text-sm flex items-center justify-center hover:bg-red-100 transition-colors z-20 shadow-[2px_2px_0px_0px_#222]">✕</button>
                            <div className="md:col-span-5 bg-[#f3f4f6] p-6 border-b-4 md:border-b-0 md:border-r-4 border-[#222] flex items-center justify-center min-h-[300px] md:min-h-auto">
                                <div className="w-full aspect-[3/4] max-w-[240px] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[6px_6px_0px_0px_#222] bg-white">
                                    <img src={selectedBook.img} alt={selectedBook.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between space-y-6">
                                <div className="space-y-4 text-left">
                                    <span className="inline-block bg-[#ffd166] text-[#222] border-2 border-[#222] px-4 py-1 rounded-full font-black text-xs uppercase shadow-[2px_2px_0px_0px_#222]">{selectedBook.tag || "Premium Index"}</span>
                                    <h2 className="text-3xl md:text-4xl font-[1000] uppercase italic tracking-tight text-[#222] leading-none">{selectedBook.title}</h2>
                                    <p className="text-sm font-bold text-gray-500">
                                        Author:{' '} 
                                        <span 
                                            onClick={(e) => handleAuthorClick(e, selectedBook.author)}
                                            className="text-[#222] underline decoration-[#64d4ac] decoration-4 hover:text-[#64d4ac] hover:decoration-[#64d4ac] cursor-pointer transition-colors font-black"
                                        >
                                            {selectedBook.author}
                                        </span>
                                    </p>
                                    <div className="h-[2px] bg-dashed bg-gray-200 my-2" />
                                    <p className="text-xs md:text-sm text-[#222]/80 leading-relaxed font-medium">{selectedBook.desc || selectedBook.description}</p>
                                </div>
                                <div className="space-y-4 pt-4">
                                    <div className="bg-[#222] text-white p-4 rounded-2xl border-4 border-[#222] shadow-[4px_4px_0px_0px_#64d4ac] flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-white/50">Market Price</p>
                                            <p className="text-3xl font-[1000] text-[#64d4ac]">${selectedBook.price}.00</p>
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-[#64d4ac]">In Stock</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button 
                                            type="button"
                                            onClick={(e) => { handleAddToBag(e, selectedBook); setSelectedBook(null); }}
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

            {/* AUTHOR PROFILE OVERLAY */}
            <AnimatePresence>
                {selectedAuthorData && (
                    <AuthorProfileModal 
                        authorData={selectedAuthorData}
                        books={safeBooks}
                        onClose={() => setSelectedAuthorData(null)}
                        onSelectBook={(book) => {
                            if (!user) {
                                setSelectedAuthorData(null);
                                setIsAuthModalOpen(true);
                                return;
                            }
                            setSelectedAuthorData(null);
                            setSelectedBook(book);
                        }}
                        user={user}
                        navigate={navigate}
                    />
                )}
            </AnimatePresence>

            {/* --- AUTH WARNING MODAL OVERLAY GATING SYSTEM --- */}
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

export default Details;