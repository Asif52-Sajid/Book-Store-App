import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import books from '../data/books'; 
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AllBooks = () => {
    // Robust context checking to completely block destructuring crashes
    const context = useAppContext();
    const cart = context?.cart || [];
    const setCart = context?.setCart || (() => {});
    const user = context?.user || null;
    
    // Connect to the shared global search query from AppContext
    const searchQuery = context?.searchQuery || '';
    const setSearchQuery = context?.setSearchQuery || (() => {});

    const navigate = useNavigate();
    
    // --- FILTER & SORTING STATES ---
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'title'

    // Fallback if data file is missing entirely
    const safeBooks = books || [];

    // --- DYNAMICALLY EXTRACT UNIQUE CATEGORIES ---
    const rawCategories = safeBooks.reduce((acc, book) => {
        const cats = book?.categories || (book?.category ? [book.category] : []);
        cats.forEach(cat => {
            if (cat && !acc.includes(cat)) acc.push(cat);
        });
        return acc;
    }, []);
    const categoriesList = ['All', ...rawCategories];

    // --- FILTER & SORT LOGIC ---
    const filteredAndSortedBooks = safeBooks
        .filter((book) => {
            // 1. Filter by Search Query
            const matchesSearch = 
                book?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book?.author?.toLowerCase().includes(searchQuery.toLowerCase());

            // 2. Filter by Category Selection
            const bookCats = book?.categories || (book?.category ? [book.category] : []);
            const matchesCategory = selectedCategory === 'All' || bookCats.includes(selectedCategory);

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            // 3. Sort based on selection
            if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
            if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
            if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
            return 0; // Default order
        });

    const handleAddToCart = (e, book) => {
        e.stopPropagation(); 
        setCart([...cart, book]);
    };

    const handleViewDetails = (bookId) => {
        if (!user) {
            alert("🔒 Authentication required. Please sign in to view full book specifications.");
            return;
        }
        navigate(`/details/${bookId}`);
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] font-sans text-[#222] py-12">
            <div className="w-[92%] lg:w-[85%] mx-auto space-y-12">
                
                {/* HEADER HERO */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tight text-[#222]">
                        The Main <span className="text-[#64d4ac] drop-shadow-[2px_2px_0px_#222]">Catalog</span>
                    </h1>
                    <p className="font-medium text-[#222]/60 text-sm">
                        Explore our complete warehouse storage bank listing. Search through premium entries, filter by category tags, or sort matching asset indices.
                    </p>
                </div>

                {/* 🛰️ SEARCH & SORT CONTROL CONTROL PANEL */}
                <div className="max-w-4xl mx-auto bg-white border-4 border-[#222] p-5 rounded-2xl shadow-[6px_6px_0px_0px_#222] flex flex-col sm:flex-row gap-4 items-center justify-between">
                    
                    {/* Search Field */}
                    <div className="w-full sm:flex-1 relative flex items-center">
                        <svg className="absolute left-4 w-5 h-5 text-[#222] z-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by book title or author name..."
                            className="w-full bg-[#fcfcfc] border-3 border-[#222] pl-12 pr-4 py-3 rounded-xl focus:outline-none font-bold text-sm"
                        />
                    </div>

                    {/* Dropdown Sorting */}
                    <div className="w-full sm:w-60 flex items-center gap-2">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-white border-3 border-[#222] px-3 py-3 rounded-xl font-black text-xs uppercase cursor-pointer appearance-none text-center shadow-[3px_3px_0px_0px_#222] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all"
                        >
                            <option value="default">📟 Sort: Default</option>
                            <option value="price-low">📉 Price: Low to High</option>
                            <option value="price-high">📈 Price: High to Low</option>
                            <option value="title">🔤 Title: A-Z</option>
                        </select>
                    </div>
                </div>

                {/* 🗺️ CATALOG LAYOUT WITH SIDEBAR GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* SIDEBAR CATEGORY FILTER CARD */}
                    <div className="bg-white border-4 border-[#222] p-5 rounded-3xl shadow-[6px_6px_0px_0px_#222] space-y-4 lg:sticky lg:top-6">
                        <h3 className="font-black text-xs uppercase tracking-wider border-b-2 border-dashed border-[#222]/10 pb-2 flex items-center gap-2">
                            <span>🏷️</span> Category Streams
                        </h3>
                        <div className="flex flex-row lg:flex-col flex-wrap gap-2">
                            {categoriesList.map((cat, idx) => {
                                const isActive = selectedCategory === cat;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-2 rounded-xl text-xs font-black uppercase transition-all border-2 border-[#222] ${
                                            isActive 
                                            ? 'bg-[#64d4ac] shadow-[3px_3px_0px_0px_#222] translate-x-[-2px] translate-y-[-2px]' 
                                            : 'bg-white hover:bg-gray-50 shadow-[1px_1px_0px_0px_#222]'
                                        }`}
                                    >
                                        {cat === "All" ? "🌐 All Archives" : cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* CATALOG CARDS MATRIX GRID */}
                    <div className="lg:col-span-3">
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredAndSortedBooks.map((book) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={book.id}
                                        onClick={() => handleViewDetails(book.id)}
                                        className="bg-white border-4 border-[#222] p-4 rounded-3xl shadow-[6px_6px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="bg-[#f3f4f6] border-4 border-[#222] rounded-2xl h-56 w-full overflow-hidden relative flex items-center justify-center">
                                                <img 
                                                    src={book.img} 
                                                    alt={book.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {book.isSale && (
                                                    <span className="absolute top-3 right-3 bg-[#ff6b6b] text-[10px] font-black border-2 border-[#222] px-2 py-0.5 uppercase rounded-lg transform rotate-6 shadow-[2px_2px_0px_0px_#222]">
                                                        Sale
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-4 space-y-1 flex-grow">
                                                <p className="text-[10px] uppercase font-black tracking-widest text-[#222]/40 truncate">{book.author}</p>
                                                <h3 className="font-black text-base uppercase italic tracking-tight line-clamp-1 group-hover:text-[#64d4ac] transition-colors">{book.title}</h3>
                                                <p className="text-xl font-[1000] italic text-[#222]">${book.price}.00</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t-2 border-[#222]/10 flex gap-2">
                                            <button
                                                onClick={(e) => handleAddToCart(e, book)}
                                                className="w-full bg-[#64d4ac] border-2 border-[#222] py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#222] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <svg className="w-4 h-4 text-[#222]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Add To Bag
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* EMPTY FALLBACK ERROR */}
                        {filteredAndSortedBooks.length === 0 && (
                            <div className="text-center py-20 bg-white border-4 border-dashed border-[#222]/20 rounded-3xl">
                                <span className="text-3xl block mb-2">📡</span>
                                <p className="font-black text-sm uppercase italic text-[#222]/40">No system records match your filter criteria.</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AllBooks;