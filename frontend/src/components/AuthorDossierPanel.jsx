import { motion } from 'framer-motion';
import { HiOutlineIdentification } from 'react-icons/hi';

const AuthorDossierPanel = ({ author, onClose, onSelectBook }) => {
    if (!author) return null;

    return (
        <div className="fixed inset-0 z-[200] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#222]/60 backdrop-blur-md" />
            
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-[#fcfcfc] border-l-4 border-[#222] w-full max-w-2xl h-full shadow-2xl z-10 overflow-y-auto relative text-left flex flex-col justify-between"
            >
                <div className="p-6 border-b-4 border-[#222] bg-[#ffd166]/20 flex justify-between items-center sticky top-0 bg-white z-20">
                    <div className="flex items-center gap-3">
                        <HiOutlineIdentification size={24} className="text-[#222]" />
                        <h3 className="font-[1000] text-lg uppercase tracking-tight italic">Author Profile</h3>
                    </div>
                    <button onClick={onClose} className="bg-white border-2 border-[#222] w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center hover:bg-red-100 shadow-[2px_2px_0px_0px_#222]">✕</button>
                </div>

                <div className="p-6 md:p-8 space-y-8 flex-grow">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-white border-4 border-[#222] p-5 rounded-2xl shadow-[6px_6px_0px_0px_#222]">
                        <div className={`w-16 h-16 rounded-2xl border-4 border-[#222] flex items-center justify-center font-[1000] text-xl shadow-[3px_3px_0px_0px_#222] shrink-0 ${author.avatarBg}`}>
                            {author.initials}
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-[1000] uppercase tracking-tighter italic">{author.name}</h2>
                            <div className="flex flex-wrap gap-3">
                                <span className="bg-[#fafafa] border-2 border-[#222] text-[10px] font-black px-3 py-1 rounded-md shadow-[2px_2px_0px_0px_#222]">📚 {author.booksCount} INDEXED WORKS</span>
                                <span className="bg-[#fafafa] border-2 border-[#222] text-[10px] font-black px-3 py-1 rounded-md shadow-[2px_2px_0px_0px_#222]">👥 {author.followers.toLocaleString()} READERS</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">BIOGRAPHY PROFILE RECORD</h4>
                        <p className="text-sm font-medium text-gray-700 leading-relaxed border-l-4 border-[#64d4ac] pl-4 italic">
                            "{author.bio} Extracted directly from live store collection states."
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">PUBLICATIONS ALIGNED TO THIS RECORD ({author.booksCount})</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {author.works.map((book) => (
                                <div 
                                    key={book.id}
                                    onClick={(e) => { e.stopPropagation(); onSelectBook(book); }}
                                    className="bg-white border-2 border-[#222] p-3 rounded-xl shadow-[4px_4px_0px_0px_#222] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 group"
                                >
                                    <div className="w-12 h-16 bg-gray-50 border border-gray-300 rounded overflow-hidden shrink-0">
                                        <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="min-w-0 flex-grow">
                                        <h5 className="font-black text-xs uppercase tracking-tight truncate group-hover:text-[#64d4ac] transition-colors">{book.title}</h5>
                                        <span className="text-[10px] font-bold text-gray-400 block uppercase mb-0.5">{book.tag || 'Release'}</span>
                                        <span className="text-[10px] font-black text-white bg-[#222] px-1.5 py-0.5 rounded">${book.price}.00</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-[#222] text-white/50 text-[9px] font-black uppercase text-center tracking-widest">
                    © 2026 BOOKSTORE — PREMIUM LITERARY EXPERIENCE
                </div>
            </motion.div>
        </div>
    );
};

export default AuthorDossierPanel;