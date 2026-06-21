import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    HiOutlineShoppingBag,
    HiMenuAlt3,
    HiX,
    HiOutlineBookOpen,
    HiUserCircle
} from 'react-icons/hi';

import { useAppContext } from '../context/AppContext';
import CartDrawer from './CartDrawer'; 

const Header = () => {
    const context = useAppContext();
    const user = context?.user || null;
    const cart = context?.cart || [];
    const logout = context?.logout || (() => {});

    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); 

    const getFirstName = (fullName) => {
        if (!fullName) return "";
        return fullName.split(' ')[0];
    };

    const mobileLinkStyle = ({ isActive }) =>
        isActive
            ? "bg-[#222] text-[#64d4ac] py-3 px-4 rounded-xl shadow-lg font-[800] scale-105 transition-all duration-300"
            : "text-[#222] py-2 px-4 font-[800] hover:bg-[#222]/5 rounded-xl transition-all";

    const desktopLinkStyle = ({ isActive }) =>
        isActive
            ? "border-b-4 border-[#222] pb-1 opacity-100 scale-110 transition-all duration-300"
            : "hover:opacity-60 transition-all duration-300 pb-1 hover:scale-105";

    return (
        <header className="bg-[#64d4ac] w-full shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] font-['Work_Sans'] sticky top-0 z-50">
            <div className="w-[92%] lg:w-[85%] mx-auto flex items-center justify-between py-5 gap-4">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-[#222] p-3 rounded-2xl shadow-[5px_5px_0px_0px_rgba(255,255,255,0.3)]">
                        <HiOutlineBookOpen className="text-[#64d4ac] text-3xl" />
                    </div>
                    <span className="text-3xl font-[800] text-[#222] tracking-tighter uppercase italic">
                        BOOK<span className="text-white">STORE</span>
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden xl:flex items-center gap-10 text-[13px] font-[800] uppercase text-[#222] whitespace-nowrap ml-auto pr-10">
                    <NavLink to="/" className={desktopLinkStyle}>Home</NavLink>
                    <NavLink to="/details" className={desktopLinkStyle}>Details</NavLink>
                    {/* FIXED: Path corrected from '/authors' to '/author' to perfectly match App.jsx */}
                    <NavLink to="/author" className={desktopLinkStyle}>Author</NavLink>
                    <NavLink to="/about" className={desktopLinkStyle}>About</NavLink>
                </nav>

                {/* CONTROLS */}
                <div className="flex items-center gap-4 md:gap-8 border-l-2 border-[#222]/10 pl-4 md:pl-8 shrink-0">
                    <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer group">
                        <HiOutlineShoppingBag className="text-[#222] text-3xl group-hover:-rotate-12 transition-transform duration-300" />
                        <span className="absolute -top-1 -right-2 bg-[#222] text-[#64d4ac] text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#64d4ac] shadow-md">
                            {cart.length}
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-[#222]/10 px-3 py-2 rounded-full border border-[#222]/20 shadow-sm hover:scale-105 transition-all duration-300">
                                    <div className="relative">
                                        <HiUserCircle className="text-[#222] text-2xl" />
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                                    </div>
                                    <span className="text-[12px] font-[900] uppercase tracking-wide text-[#222]">
                                        Hi, {getFirstName(user.name)}
                                    </span>
                                </div>
                                <button onClick={logout} className="text-[11px] font-[800] uppercase border-2 border-[#222] text-[#222] px-4 py-2 rounded-lg hover:bg-[#222] hover:text-white transition-all duration-300">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-[12px] font-[800] uppercase text-[#222] hover:underline underline-offset-4 transition-all duration-300">Login</Link>
                                <Link to="/signup" className="text-[11px] font-[800] uppercase bg-[#222] text-white px-6 py-2.5 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300">Sign Up</Link>
                            </>
                        )}
                    </div>

                    <button className="xl:hidden text-[#222] text-3xl hover:rotate-90 transition-all duration-300" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>
            </div>

            {/* MOBILE NAV */}
            {isOpen && (
                <div className="xl:hidden bg-[#64d4ac] border-t-2 border-[#222] p-8 shadow-2xl">
                    <nav className="flex flex-col gap-3 text-center uppercase">
                        <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Home</NavLink>
                        <NavLink to="/details" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Details</NavLink>
                        {/* FIXED: Path corrected from '/authors' to '/author' here as well */}
                        <NavLink to="/author" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Author</NavLink>
                        <NavLink to="/about" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>About</NavLink>
                    </nav>
                </div>
            )}
            
            {CartDrawer && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
        </header>
    );
};

export default Header;