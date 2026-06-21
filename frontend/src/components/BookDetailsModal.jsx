import { motion } from 'framer-motion';
import { HiX, HiOutlineArrowLeft } from 'react-icons/hi';

const BookDetailsModal = ({ book, onClose, onDismissAll }) => {
    if (!book) return null;

    return (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            {/* BACKGROUND OVERLAY */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={onClose} 
                className="absolute inset-0 bg-[#222]/80 backdrop-blur-sm" 
            />
            
            {/* INNER MODAL BOX WITH SCROLL INTERFACE FIX */}
            <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-[#f3f3f3] border-4 border-[#222] w-full max-w-4xl rounded-[2rem] shadow-[20px_20px_0px_0px_#222] z-10 text-left flex flex-col md:flex-row relative max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
            >
                {/* STICKY TOP-RIGHT CLOSE ICON FOR SCROLLABLE VIEWPORTS */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 bg-white border-2 border-[#222] w-10 h-10 rounded-full font-black flex items-center justify-center hover:bg-gray-100 shadow-[2px_2px_0px_0px_#222] transition-all z-50"
                >
                    <HiX size={20} className="text-[#222]" />
                </button>

                {/* LEFT SIDE PANE: COVER ART WORKSPACE */}
                <div className="w-full md:w-[42%] bg-[#f3f3f3] p-6 md:p-8 flex items-center justify-center relative shrink-0">
                    <div className="w-full aspect-[3/4] max-w-[180px] md:max-w-[240px] bg-[#ffd166] border-4 border-[#222] rounded-[1.5rem] p-4 md:p-6 shadow-[8px_8px_0px_0px_#222] flex items-center justify-center relative overflow-hidden">
                        <img 
                            src={book.img} 
                            alt={book.title} 
                            className="w-full h-full object-cover rounded-lg shadow-lg border-2 border-[#222]" 
                        />
                    </div>
                </div>

                {/* VISUAL DIVIDER LINE (HIDDEN ON VERTICAL COLLAPSED MOBILE LAYOUTS) */}
                <div className="hidden md:block w-1 bg-[#222] self-stretch shrink-0" />

                {/* RIGHT SIDE PANE: INTERNAL METADATA CONTROLS */}
                <div className="w-full md:w-[58%] bg-white p-6 md:p-8 flex flex-col justify-between space-y-6 overflow-y-visible">
                    <div className="space-y-4">
                        <div>
                            <span className="bg-[#ffd166] border-2 border-[#222] px-4 py-1 rounded-full font-[1000] text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#222]">
                                {book.tag || 'TRENDING'}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-4xl font-[1000] uppercase tracking-tighter italic leading-none text-[#222]">
                            {book.title}
                        </h3>
                        
                        <p className="text-sm font-black text-gray-500 uppercase tracking-wide">
                            Author: <span className="text-[#222] underline decoration-4 decoration-[#64d4ac] underline-offset-4">{book.author}</span>
                        </p>
                        
                        <hr className="border-t-2 border-gray-100 my-2" />
                        
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">
                            {book.description || "An evolutionary journey exploring innovation, human nature, and how ideas spread across global cultures."}
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        {/* BRUTALIST PRICING LAYOUT INFOMODULE */}
                        <div className="bg-[#222] text-white p-4 rounded-xl flex justify-between items-center border-2 border-[#222] shadow-[4px_4px_0px_0px_#64d4ac]">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MARKET PRICE</span>
                                <span className="text-2xl md:text-3xl font-[1000] tracking-tight text-[#64d4ac]">${book.price}.00</span>
                            </div>
                            <span className="text-[10px] font-black text-[#64d4ac] bg-[#64d4ac]/10 px-2.5 py-1 rounded border border-[#64d4ac]/30 uppercase tracking-widest">IN STOCK</span>
                        </div>

                        {/* NAV INTERFACES ROW */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button 
                                onClick={onClose}
                                className="flex-[2] bg-[#64d4ac] text-[#222] border-4 border-[#222] py-3.5 rounded-xl font-[1000] text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <HiOutlineArrowLeft size={16} />
                                <span>GO BACK</span>
                            </button>
                            
                            <button 
                                onClick={onDismissAll}
                                className="flex-1 bg-white border-4 border-[#222] py-3.5 rounded-xl font-[1000] text-sm uppercase tracking-wider text-[#222] hover:bg-gray-100 shadow-[4px_4px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-center"
                            >
                                DISMISS
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BookDetailsModal;