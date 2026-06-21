import { motion } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi';

const AuthorCard = ({ author, idx, user, onClick }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.04, type: "spring", stiffness: 90 }}
            whileHover={{ 
                scale: 1.03, 
                rotate: idx % 2 === 0 ? 1 : -1,
                shadow: "12px 12px 0px 0px #222"
            }}
            onClick={onClick}
            className="bg-white border-4 border-[#222] rounded-[2rem] p-5 shadow-[6px_6px_0px_0px_#222] flex flex-col justify-between items-start text-left group transition-all duration-300 relative overflow-hidden cursor-pointer"
        >
            <div className="space-y-4 w-full">
                <div className="flex justify-between items-start w-full">
                    <div className={`w-16 h-16 rounded-2xl border-4 border-[#222] flex items-center justify-center font-[1000] text-xl tracking-tight shadow-[4px_4px_0px_0px_#222] ${author.avatarBg}`}>
                        {author.initials}
                    </div>
                    <span className="bg-[#64d4ac] border-2 border-[#222] px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-wider shadow-[2px_2px_0px_0px_#222]">
                        ★ {author.category}
                    </span>
                </div>

                <div className="space-y-1">
                    <h2 className="text-xl font-[1000] uppercase tracking-tight italic line-clamp-1 group-hover:text-[#64d4ac] transition-colors">
                        {author.name}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
                        {author.bio}
                    </p>
                </div>
            </div>

            <div className="w-full mt-6 bg-[#222] text-white group-hover:bg-[#64d4ac] group-hover:text-[#222] py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-[#222] transition-colors">
                {!user && <HiOutlineLockClosed size={14} />}
                <span>Access Profile</span>
                <HiOutlineArrowRight size={14} />
            </div>
        </motion.div>
    );
};

export default AuthorCard;