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

const RecentlyAdded = ({ books, onAuthorClick, onBookClick }) => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);
    const { user } = useAppContext();
    
    // Controlled internal state for the Modal overlay flags
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    const safeBooks = Array.isArray(books) ? books : [];

    // --- ARRAY INTERSECTION FILTER ---
    const newArrivalsBooks = safeBooks.filter((b) => {
        const bookCats = b.categories || [b.category];
        return (b.id > 4 && b.id <= 10) || bookCats.includes("New Arrivals");
    });

    const handleBookCardClick = (book) => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        
        // FIXED ACTION: Forwards item state up to parent portal context index execution
        if (onBookClick) {
            onBookClick(book);
        }
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
                    {/* Fresh Emerald Glowing Neo-Brutalist Badge */}
                    <div className="relative inline-block">
                        <span className="absolute inset-0 bg-[#64d4ac] rounded-2xl transform rotate-1 translate-x-1 translate-y-1 blur-sm opacity-60" />
                        <div className="relative bg-[#fcfcfc] text-[#222] font-[1000] text-sm md:text-base px-5 py-2.5 uppercase italic tracking-wider rounded-2xl border-4 border-[#222] flex items-center gap-2 shadow-[4px_4px_0px_0px_#64d4ac]">
                            <span className="animate-pulse">✨</span>
                            Fresh Arrivals
                        </div>
                    </div>

                    {/* Section Title */}
                    <h2 className="text-2xl md:text-4xl font-[1000] uppercase tracking-tighter text-[#222] italic">
                        NEW <span className="text-[#64d4ac]">ARRIVALS</span>
                    </h2>
                </div>

                {/* Stylish Mint Corner Slider Control Switches */}
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => handleScroll('prev')}
                        className="bg-white border-4 border-[#222] w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#222] hover:shadow-[1px_1px_0px_0px_#222] hover:translate-x-[3px] hover:translate-y-[3px] active:bg-gray-100 transition-all duration-150"
                    >
                        <HiOutlineArrowSmLeft size={22} className="text-[#222]" />
                    </button>

                    <button
                        onClick={() => handleScroll('next')}
                        className="bg-[#64d4ac] text-[#222] border-4 border-[#222] w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#222] hover:shadow-[1px_1px_0px_0px_#222] hover:translate-x-[3px] hover:translate-y-[3px] active:bg-[#4ebda3] transition-all duration-150"
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
                    {/* Map Through New Arrivals Books */}
                    {newArrivalsBooks.map((book) => {
                        const bookCats = (book.categories || [book.category]).filter(Boolean);

                        return (
                            <motion.div
                                key={book.id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    rotate: -1.5,
                                    boxShadow: "12px 12px 0px 0px #222"
                                }}
                                onClick={() => handleBookCardClick(book)}
                                className="bg-white border-4 border-[#222] p-3 md:p-4 rounded-[2.2rem] shadow-[8px_8px_0px_0px_#222] hover:border-[#64d4ac] transition-colors duration-300 cursor-pointer flex flex-col justify-between relative group overflow-hidden shrink-0 snap-start w-[190px] sm:w-[220px] md:w-[250px]"
                            >
                                {/* Inner Card Visual Display Frame Wrapper */}
                                <div className="bg-[#222]/5 border-4 border-[#222] rounded-2xl aspect-[4/5] w-full overflow-hidden relative flex items-center justify-center group-hover:bg-[#64d4ac]/10 transition-colors duration-300">
                                    <img
                                        src={book.img}
                                        alt={book.title}
                                        className="w-[82%] h-[88%] object-cover rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500"
                                        loading="lazy"
                                    />

                                    {/* Slanted Retro Product Badge Tag */}
                                    {book.tag && (
                                        <span className="absolute top-3 left-3 bg-[#64d4ac] text-[#222] text-[8px] md:text-[9px] font-black border-2 border-[#222] px-2.5 py-1 uppercase rounded-md transform rotate-6 shadow-[2px_2px_0px_0px_#222]">
                                            {book.tag}
                                        </span>
                                    )}
                                </div>

                                {/* Details Typography Strip Panel */}
                                <div className="mt-4 pt-2 border-t-4 border-dashed border-[#222]/10 flex-1 flex flex-col justify-between">
                                    <div>
                                        <p 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Avoid triggering card details popup simultaneously
                                                if (onAuthorClick) onAuthorClick(book.author);
                                            }}
                                            className="text-[9px] uppercase font-black tracking-widest text-gray-400 truncate hover:text-[#64d4ac] hover:underline cursor-pointer inline-block max-w-full pb-0.5"
                                        >
                                            {book.author}
                                        </p>

                                        <h3 className="font-black text-sm md:text-base uppercase italic tracking-tight text-[#222] line-clamp-1 group-hover:text-[#64d4ac] transition-colors mt-0.5">
                                            {book.title}
                                        </h3>

                                        {/* MATRIX MULTI-CATEGORY BADGE HUB */}
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

                                    <div className="mt-2 pt-1 border-t border-gray-100">
                                        <span className="text-lg md:text-xl font-[1000] text-[#222]">
                                            ${book.price}.00
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Premium "SEE MORE" New Arrivals Action Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{
                            y: -10,
                            rotate: 1.5,
                            boxShadow: "12px 12px 0px 0px #222"
                        }}
                        onClick={() => navigate('/details')}
                        className="bg-white border-4 border-[#222] rounded-[2.2rem] shadow-[8px_8px_0px_0px_#222] hover:border-[#64d4ac] transition-all duration-300 cursor-pointer flex flex-col justify-between relative group overflow-hidden shrink-0 snap-start w-[190px] sm:w-[220px] md:w-[250px]"
                    >
                        {/* Upper Display Visual Canvas Area */}
                        <div className="bg-[#f4fbf8] border-4 border-[#222] m-3 md:m-4 rounded-2xl aspect-[4/5] overflow-hidden relative flex flex-col items-center justify-center group-hover:bg-[#64d4ac]/5 transition-colors duration-300 gap-3">
                            <div className="w-14 h-14 bg-[#64d4ac] border-4 border-[#222] rounded-full flex items-center justify-center text-[#222] text-2xl font-black shadow-[4px_4px_0px_0px_#222] group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                                →
                            </div>
                            <span className="bg-[#222] text-white font-black text-[9px] uppercase px-2 py-0.5 rounded-md tracking-wider">
                                View Full Index
                            </span>
                        </div>

                        {/* Lower Action Mint Frame Strip */}
                        <div className="bg-[#64d4ac] border-t-4 border-[#222] p-4 text-center group-hover:bg-[#4ebda3] transition-colors duration-300">
                            <h4 className="font-black text-sm md:text-base uppercase italic tracking-tight text-[#222]">
                                See More Books
                            </h4>
                            <p className="text-[9px] text-[#222]/80 font-black uppercase mt-0.5 tracking-widest">
                                Explore Collection →
                            </p>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

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

export default RecentlyAdded;