import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineShoppingCart, HiArrowLeft } from 'react-icons/hi';
import { useAppContext } from '../context/AppContext';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, setCart } = useAppContext();

    // 1. Read live books array streaming dynamically out of browser localStorage
    const savedBooks = localStorage.getItem('my_bookstore_books');
    const dynamicBooks = savedBooks ? JSON.parse(savedBooks) : [];

    // 2. Safely look up matching ID structures by casting both values to Strings
    const book = dynamicBooks.find((b) => b && b.id?.toString() === id?.toString());

    if (!book) {
        return (
            <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 text-[#222]">
                <h2 className="text-4xl font-black uppercase italic mb-4">Book Not Found</h2>
                <p className="text-sm text-gray-400 font-bold uppercase mb-6 tracking-wider">
                    ID Index Reference: {id}
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    className="bg-[#64d4ac] text-[#222] border-4 border-[#222] px-6 py-3 font-black uppercase rounded-xl shadow-[5px_5px_0px_0px_#222] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <main className="bg-[#fcfcfc] min-h-screen py-16 text-[#222]">
            <div className="w-[95%] lg:w-[85%] mx-auto">
                
                {/* BACK NAVIGATION ACTION ELEMENT */}
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-12 flex items-center gap-2 bg-white text-[#222] border-4 border-[#222] px-5 py-2.5 rounded-xl font-black uppercase text-sm shadow-[4px_4px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                    <HiArrowLeft size={18} /> Back
                </button>

                {/* THE CORE LAYOUT WRAPPER GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* LEFT ROW LAYER FRAME: MEDIA GRAPHICS COVER CONTAINER */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 bg-white border-4 border-[#222] p-6 rounded-[2.5rem] shadow-[16px_16px_0px_0px_rgba(34,34,34,1)]"
                    >
                        <div className="aspect-[3/4] w-full rounded-[1.5rem] overflow-hidden border-2 border-[#222] bg-gray-50 flex items-center justify-center">
                            <img src={book.img} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                    </motion.div>

                    {/* RIGHT ROW LAYER FRAME: DATA METADATA RENDERING NODES */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {book.tag && (
                                    <span className="inline-block bg-[#64d4ac] text-[#222] border-2 border-[#222] px-4 py-1 rounded-full font-black text-xs uppercase shadow-[2px_2px_0px_0px_#222]">
                                        {book.tag}
                                    </span>
                                )}
                                {book.category && (
                                    <span className="inline-block bg-[#ff6b6b] text-white border-2 border-[#222] px-4 py-1 rounded-full font-black text-xs uppercase shadow-[2px_2px_0px_0px_#222]">
                                        {book.category}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-5xl md:text-6xl font-[1000] uppercase italic tracking-tighter leading-none">
                                {book.title}
                            </h1>
                            
                            <div className="flex flex-col gap-0.5">
                                <p className="text-xl font-black text-[#222]/60 italic">
                                    by <span className="text-[#222] underline decoration-[#64d4ac] decoration-4">{book.author}</span>
                                </p>
                                {book.publishedDate && (
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                                        Release Date: {book.publishedDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* PRICE BANNER CARD SEGMENT */}
                        <div className="bg-[#222] text-white p-6 rounded-[2rem] border-4 border-[#222] shadow-[8px_8px_0px_0px_#64d4ac] flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase font-black text-white/50 mb-1">Price</p>
                                <p className="text-5xl font-[1000] text-[#64d4ac]">${book.price}.00</p>
                            </div>
                        </div>

                        {/* COMPILATION RICH TEXT SYNOPSIS MODULE */}
                        <div className="bg-white border-4 border-[#222] p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_#222] space-y-2">
                            <h3 className="text-xl font-black uppercase italic pb-2 border-b-2 border-dashed border-[#222]/20">Synopsis</h3>
                            <p className="text-[#222]/80 leading-relaxed text-base font-medium">
                                {book.description || book.desc || "No custom synopsis available for this item portfolio entry."}
                            </p>
                        </div>

                        {/* CART SYSTEM TRIGGER ACTION SUBMIT BUTTON */}
                        <button 
                            type="button"
                            onClick={() => setCart([...cart, book])}
                            className="w-full bg-[#64d4ac] text-[#222] border-4 border-[#222] py-5 rounded-[1.5rem] font-black text-lg uppercase tracking-wide flex items-center justify-center gap-3 shadow-[10px_10px_0px_0px_#222] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            <HiOutlineShoppingCart size={22} /> Add To Bag
                        </button>
                    </motion.div>

                </div>
            </div>
        </main>
    );
};

export default BookDetails;