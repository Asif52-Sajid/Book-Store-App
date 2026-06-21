import { motion } from 'framer-motion';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const AuthWarningModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={onClose} 
                className="absolute inset-0 bg-[#222]/80 backdrop-blur-sm" 
            />
            
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white border-4 border-[#222] w-full max-w-md rounded-[2rem] shadow-[12px_12px_0px_0px_#222] p-8 z-10 text-center space-y-6 relative"
            >
                <div className="w-16 h-16 bg-red-100 text-red-500 border-4 border-[#222] rounded-2xl flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#222]">
                    <HiOutlineLockClosed size={28} />
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-[1000] uppercase italic tracking-tight">ACCESS RESTRICTED</h3>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                        Anonymous viewing denied. You must do an authorized active login to see profile identity record.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button 
                        onClick={() => { onClose(); navigate('/login'); }}
                        className="flex-1 bg-[#64d4ac] border-4 border-[#222] py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#222] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        Login Now
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-gray-100 border-4 border-[#222] py-3 rounded-xl font-black text-xs uppercase tracking-wider text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        Dismiss Gate
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthWarningModal;