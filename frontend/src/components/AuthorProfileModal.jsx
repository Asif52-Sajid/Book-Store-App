import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineBookOpen, HiOutlineCalendar, HiOutlineCollection } from 'react-icons/hi';
import { useAppContext } from '../context/AppContext';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } }
};

const AuthorProfileModal = ({ authorData, books, onClose, onSelectBook }) => {
    const navigate = useNavigate();
    const { user } = useAppContext();
    const scrollContainerRef = useRef(null);
    const [showLockOverlay, setShowLockOverlay] = useState(false);

    if (!authorData) return null;

    const safeBooks = Array.isArray(books) ? books : [];
    const authorBooks = safeBooks.filter(
        (b) => b.author?.toLowerCase().trim() === authorData.name?.toLowerCase().trim()
    );

    const totalPublished = authorBooks.length;
    const latestRelease = authorBooks.reduce((latest, book) => {
        const year = parseInt(book.year || book.publishYear, 10);
        if (!isNaN(year) && year > latest) return year;
        return latest;
    }, 0);

    const handleProtectedAction = (e) => {
        if (!user) {
            e.stopPropagation();
            setShowLockOverlay(true);
        }
    };

    const handleBookClick = (e, book) => {
        e.stopPropagation();
        if (!user) {
            setShowLockOverlay(true);
            return;
        }
        onClose();
        if (onSelectBook) {
            onSelectBook(book);
        }
    };

    // Extract first two letters or first letter depending on character availability
    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return name.trim().substring(0, 2).toUpperCase();
    };

    const authorInitials = getInitials(authorData.name);

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={onClose} 
                className="absolute inset-0 bg-[#222]/70 backdrop-blur-md" 
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="bg-[#fcfcfc] border-4 border-[#222] w-full max-w-3xl rounded-[2.5rem] shadow-[16px_16px_0px_0px_#222] z-10 overflow-hidden relative max-h-[85vh] flex flex-col text-[#222]"
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 bg-white border-2 border-[#222] w-10 h-10 rounded-full font-black text-sm flex items-center justify-center hover:bg-red-100 transition-colors z-30 shadow-[2px_2px_0px_0px_#222]"
                >
                    ✕
                </button>

                <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-6 scrollbar-hide">
                    
                    {/* SECTION 1: PUBLIC IDENTITY BANNER */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b-4 border-dashed border-[#222]/10 text-center sm:text-left relative">
                        
                        {/* NEO-BRUTALIST BADGE INITIALS SIGNATURE BLOCK */}
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-[#222] bg-[#54b4e4] text-[#222] flex items-center justify-center shrink-0 shadow-[5px_5px_0px_0px_#222] select-none font-black text-3xl md:text-4xl tracking-tight">
                            {authorInitials}
                        </div>

                        <div className="space-y-2 flex-1">
                            <span className="inline-block bg-[#64d4ac] text-[#222] text-[10px] font-black border-2 border-[#222] px-3 py-0.5 uppercase rounded-md tracking-wider shadow-[2px_2px_0px_0px_#222]">
                                Verified Creator Index
                            </span>
                            <h2 className="text-3xl md:text-4xl font-[1000] uppercase italic tracking-tight text-[#222]">
                                {authorData.name}
                            </h2>
                            <p className="text-xs md:text-sm text-gray-500 font-bold max-w-md">
                                {authorData.bio || "Master novelist, visual conceptualist, and contributing structural academic researcher."}
                            </p>
                        </div>
                    </div>

                    {/* LOWER CONTAINER DATA CONTROL BLOCK */}
                    <div className="relative min-h-[240px]">
                        
                        {!user && (
                            <div 
                                className="absolute inset-0 z-20 rounded-2xl bg-white/40 backdrop-blur-xs flex items-center justify-center cursor-pointer group"
                                onClick={handleProtectedAction}
                            >
                                <motion.div 
                                    animate={showLockOverlay ? { scale: [1, 1.03, 1] } : {}}
                                    className="bg-[#ff6b6b] text-white border-4 border-[#222] p-6 rounded-2xl shadow-[8px_8px_0px_0px_#222] max-w-sm text-center space-y-3 mx-4"
                                >
                                    <HiOutlineLockClosed size={28} className="mx-auto text-white" />
                                    <h4 className="font-black text-sm uppercase tracking-wide">Error</h4>
                                    <p className="text-[11px] text-white/90 leading-relaxed font-medium">
                                     Log in to view author full Profiles.
                                    </p>
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="inline-block bg-[#222] text-white border-2 border-white px-4 py-1.5 rounded-xl text-xs font-black uppercase shadow-md hover:bg-white hover:text-[#222] transition-colors"
                                    >
                                        Go to Login →
                                    </button>
                                </motion.div>
                            </div>
                        )}

                        <div className={`space-y-6 select-none ${!user ? 'opacity-25 filter blur-[2px] pointer-events-none' : ''}`}>
                            
                            {/* METRICS HUB GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-[#f4fbf8] border-4 border-[#222] p-4 rounded-2xl flex items-center gap-4 shadow-[4px_4px_0px_0px_#222]">
                                    <div className="p-2.5 bg-[#64d4ac] border-2 border-[#222] rounded-xl text-[#222]">
                                        <HiOutlineCollection size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wide">Total Volumes</p>
                                        <p className="text-xl font-[1000]">{totalPublished} Books Published</p>
                                    </div>
                                </div>

                                <div className="bg-[#fffdf4] border-4 border-[#222] p-4 rounded-2xl flex items-center gap-4 shadow-[4px_4px_0px_0px_#222]">
                                    <div className="p-2.5 bg-[#ffd166] border-2 border-[#222] rounded-xl text-[#222]">
                                        <HiOutlineCalendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wide">Latest Timeline Update</p>
                                        <p className="text-xl font-[1000]">{latestRelease || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* COLLECTION FEED ARCHIVE */}
                            <div className="space-y-3 text-left">
                                <h3 className="text-lg font-[1000] uppercase tracking-tight flex items-center gap-2">
                                    <HiOutlineBookOpen size={20} className="text-[#64d4ac]" />
                                    Published Collection Index
                                </h3>

                                {authorBooks.length === 0 ? (
                                    <div className="border-4 border-dashed border-gray-200 rounded-2xl p-8 text-center text-xs font-bold text-gray-400 uppercase">
                                        No registered book assets found matching author identity.
                                    </div>
                                ) : (
                                    <motion.div 
                                        ref={scrollContainerRef}
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="show"
                                        className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide snap-x snap-mandatory"
                                    >
                                        {authorBooks.map((book) => (
                                            <motion.div
                                                key={book.id}
                                                variants={itemVariants}
                                                whileHover={{ y: -6, rotate: -1, boxShadow: "6px_6px_0px_0px_#222" }}
                                                onClick={(e) => handleBookClick(e, book)}
                                                className="bg-white border-4 border-[#222] p-3 rounded-2xl shadow-[4px_4px_0px_0px_#222] transition-colors cursor-pointer flex flex-col justify-between shrink-0 snap-start w-[145px] sm:w-[165px] hover:border-[#64d4ac]"
                                            >
                                                <div className="bg-[#222]/5 border-2 border-[#222] rounded-xl aspect-[4/5] w-full overflow-hidden flex items-center justify-center mb-2">
                                                    <img src={book.img} alt={book.title} className="w-[85%] h-[85%] object-cover rounded-md" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-black text-[11px] sm:text-xs uppercase tracking-tight line-clamp-1">
                                                        {book.title}
                                                    </h4>
                                                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                                                        <span className="text-xs font-[1000]">${book.price}.00</span>
                                                        <span className="text-[9px] font-black bg-[#64d4ac]/20 text-[#222] px-1 rounded border border-[#222]">
                                                            View
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default AuthorProfileModal;