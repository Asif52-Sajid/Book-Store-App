import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiTrash, HiMinus, HiPlus, HiOutlineShoppingBag } from 'react-icons/hi';
import { useAppContext } from '../context/AppContext';

const panelVariants = {
    hidden: { 
        x: '100%',
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    },
    visible: { 
        x: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        transition: { 
            type: 'spring', 
            damping: 24, 
            stiffness: 160,
            mass: 0.8,
            when: "beforeChildren", 
            staggerChildren: 0.08
        }
    },
    exit: { 
        x: '100%',
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        transition: { 
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.25,
            when: "afterChildren"
        }
    }
};

const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.92, rotate: -1 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotate: 0,
        transition: { type: 'spring', damping: 15, stiffness: 120 } 
    },
    exit: { 
        opacity: 0, 
        x: 50, 
        scale: 0.9, 
        transition: { duration: 0.2 } 
    }
};

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, setCart } = useAppContext();

    const groupedCart = cart.reduce((acc, book) => {
        const found = acc.find(item => item.id === book.id);
        if (found) {
            found.quantity += 1;
        } else {
            acc.push({ ...book, quantity: 1 });
        }
        return acc;
    }, []);

    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const handleQuantityChange = (bookId, action) => {
        if (action === 'increase') {
            const bookToCopy = cart.find(b => b.id === bookId);
            setCart([...cart, bookToCopy]);
        } else if (action === 'decrease') {
            const indexToRemove = cart.findLastIndex(b => b.id === bookId);
            if (indexToRemove !== -1) {
                const newCart = [...cart];
                newCart.splice(indexToRemove, 1);
                setCart(newCart);
            }
        }
    };

    const removeItemCompletely = (bookId) => {
        setCart(cart.filter(book => book.id !== bookId));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm"
                    />

                    <motion.div 
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white border-l-8 border-[#222] z-[200] flex flex-col font-['Work_Sans'] text-[#222]"
                    >
                        <div className="p-6 border-b-4 border-[#222] flex items-center justify-between bg-[#64d4ac]">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <HiOutlineShoppingBag size={28} className="text-[#222]" />
                                </motion.div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Your Bag ({totalItems})</h2>
                            </div>
                            <button 
                                onClick={onClose}
                                className="bg-white border-2 border-[#222] p-2 rounded-xl shadow-[3px_3px_0px_0px_#222] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                            >
                                <HiX size={20} />
                            </button>
                        </div>

                        <motion.div 
                            variants={listVariants}
                            className="flex-grow p-6 overflow-y-auto space-y-4 bg-[#fcfcfc]"
                        >
                            <AnimatePresence mode="popLayout">
                                {groupedCart.length === 0 ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60"
                                    >
                                        <HiOutlineShoppingBag size={64} className="text-[#222]/40" />
                                        <p className="font-black uppercase tracking-wider text-sm">Your basket is completely empty!</p>
                                    </motion.div>
                                ) : (
                                    groupedCart.map((item) => (
                                        <motion.div 
                                            key={item.id}
                                            variants={itemVariants}
                                            className="bg-white border-4 border-[#222] p-4 rounded-2xl shadow-[6px_6px_0px_0px_#222] flex gap-4 items-center origin-left"
                                        >

                                            <div className="w-16 h-20 bg-[#f3f4f6] rounded-xl border-2 border-[#222] overflow-hidden flex-shrink-0">
                                                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                            </div>

                                            <div className="flex-grow min-w-0">
                                                <h4 className="font-black uppercase italic text-sm truncate">{item.title}</h4>
                                                <p className="text-lg font-black text-[#64d4ac] drop-shadow-[1px_1px_0px_#222] mt-0.5">${item.price * item.quantity}</p>
                                                

                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex items-center border-2 border-[#222] bg-white rounded-lg overflow-hidden">
                                                        <button 
                                                            onClick={() => handleQuantityChange(item.id, 'decrease')}
                                                            className="px-2 py-1 hover:bg-gray-100 border-r-2 border-[#222] transition-colors"
                                                        >
                                                            <HiMinus size={12} />
                                                        </button>
                                                        <span className="px-3 text-xs font-black">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => handleQuantityChange(item.id, 'increase')}
                                                            className="px-2 py-1 hover:bg-gray-100 border-l-2 border-[#222] transition-colors"
                                                        >
                                                            <HiPlus size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                            <button 
                                                onClick={() => removeItemCompletely(item.id)}
                                                className="text-red-500 hover:text-red-700 p-2 border-2 border-transparent hover:border-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <HiTrash size={18} />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {groupedCart.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="p-6 border-t-4 border-[#222] bg-white space-y-4 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs uppercase font-black tracking-widest text-[#222]/40">Subtotal Order</p>
                                        <p className="text-sm font-medium text-[#222]/60">Shipping and taxes calculated at checkout</p>
                                    </div>
                                    <p className="text-4xl font-[1000] text-[#222] italic">${totalPrice}.00</p>
                                </div>

                                <button 
                                    className="w-full bg-[#64d4ac] text-[#222] border-4 border-[#222] py-4 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_#222] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                                >
                                    Proceed To Checkout Order
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;