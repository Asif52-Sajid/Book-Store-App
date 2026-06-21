import { Link } from 'react-router-dom';
import { 
    FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
    FaEnvelope, FaMapMarkerAlt, FaPhone 
} from 'react-icons/fa';
import { HiOutlineBookOpen } from 'react-icons/hi';

// Import your local images from your assets folder
import footerBg from '../assets/footer-bg.jpg'; 
import decorImg from '../assets/book-decor.jpg'; 

const Footer = () => {
    return (
        <footer 
            className="relative w-full border-t-8 border-[#222] overflow-hidden bg-[#222]"
            style={{ 
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed' // Creates that high-end parallax scroll
            }}
        >
            {/* 1. DARK GRADIENT OVERLAY (Removes the green, makes image clear) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#222]/40 via-[#222]/60 to-[#222]/90 backdrop-blur-[1px]"></div>

            {/* 2. CONTENT CONTAINER (Must be relative to stay above the overlay) */}
            <div className="relative z-10 w-[90%] lg:w-[85%] mx-auto pt-20 pb-10 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* BRAND SECTION */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-[#64d4ac] p-3 rounded-2xl shadow-[5px_5px_0px_0px_rgba(34,34,34,1)]">
                                <HiOutlineBookOpen className="text-[#222] text-3xl" />
                            </div>
                            <span className="text-3xl font-[950] tracking-tighter uppercase italic">
                                BOOK<span className="text-[#64d4ac]">STORE</span>
                            </span>
                        </Link>
                        <p className="text-white/80 font-bold text-sm leading-relaxed">
                            Discover worlds between pages. We provide the best collection of modern and classic literature, delivered to your doorstep.
                        </p>
                        {/* SOCIAL ICONS */}
                        <div className="flex gap-3">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                <a key={i} href="#" className="bg-[#64d4ac] text-[#222] p-3 rounded-xl border-2 border-[#222] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* EXPLORE SECTION */}
                    <div className="space-y-4">
                        <h4 className="text-[#64d4ac] font-black uppercase tracking-widest border-b-4 border-[#64d4ac] inline-block pb-1">Explore</h4>
                        <div className="flex flex-col gap-3 font-bold text-sm">
                            <Link to="/" className="hover:text-[#64d4ac] transition-colors underline decoration-[#64d4ac]/30 underline-offset-4">New Arrivals</Link>
                            <Link to="/" className="hover:text-[#64d4ac] transition-colors underline decoration-[#64d4ac]/30 underline-offset-4">Best Sellers</Link>
                            <Link to="/authors" className="hover:text-[#64d4ac] transition-colors underline decoration-[#64d4ac]/30 underline-offset-4">Famous Authors</Link>
                            {/* LOCAL DECOR IMAGE */}
                            <img src={decorImg} alt="books" className="w-full h-28 object-cover rounded-xl border-2 border-[#64d4ac] mt-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]" />
                        </div>
                    </div>

                    {/* CONTACT SECTION */}
                    <div className="space-y-6">
                        <h4 className="text-[#64d4ac] font-black uppercase tracking-widest border-b-4 border-[#64d4ac] inline-block pb-1">Contact</h4>
                        <div className="space-y-5 font-bold text-sm">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#64d4ac] text-xl mt-1" />
                                <span>101 Library Street,<br />Knowledge City, 2026</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#64d4ac] text-xl" />
                                <span>support@bookstore.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhone className="text-[#64d4ac] text-xl" />
                                <span>+880 1234 567 890</span>
                            </div>
                        </div>
                    </div>

                    {/* NEWSLETTER BOX */}
                    <div className="bg-[#64d4ac] p-6 rounded-[2rem] border-4 border-[#222] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] transform -rotate-1">
                        <h4 className="text-[#222] font-black uppercase mb-2 tracking-tighter text-xl">Join the Club</h4>
                        <p className="text-[#222]/70 text-xs font-bold mb-4 uppercase">Get 10% off your first book!</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Your Email" 
                                className="w-full py-4 px-4 rounded-xl bg-white border-2 border-[#222] text-[#222] outline-none focus:ring-2 ring-[#222]/20 font-bold transition-all"
                            />
                            <button className="absolute right-2 top-2 bg-[#222] text-[#64d4ac] px-4 py-2 rounded-lg font-black text-xs hover:scale-105 active:scale-95 transition-all">
                                JOIN
                            </button>
                        </div>
                    </div>

                </div>

                {/* COPYRIGHT BAR */}
                <div className="mt-20 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/40 font-black text-[10px] tracking-[0.6em] uppercase">
                        &copy; 2026 BOOKSTORE — PREMIUM LITERARY EXPERIENCE
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;