import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    HiArrowSmLeft, 
    HiBookOpen, 
    HiShieldCheck, 
    HiSparkles, 
    HiClock,
    HiTicket
} from 'react-icons/hi';

// --- IMPORTING IMAGES DIRECTLY FROM YOUR ASSETS FOLDER ---
import bookstoreBg from '../assets/footer-bg.jpg'; 
import missionSideBg from '../assets/hero1.jpg';
import inventorySideBg from '../assets/hero2.jpg';

const About = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('manifesto');

    // Smooth Spring Presets for Snappy Neo-Brutalist Feel
    const springTransition = { type: 'spring', stiffness: 120, damping: 14 };

    // Ticker text rolling across the screen like a stock ticker
    const tickerText = " THE VAULT BOOKSTORE // ARCHIVAL PRINTS // RARE CLASSICS // FLASH SALE STOCK LIVE // ";

    return (
        <div className="min-h-screen bg-[#fcfcfc] text-[#222] pb-32 overflow-x-hidden relative select-none">
            
            {/* HERO HEADER WITH BACKGROUND IMAGE */}
            <div 
                className="py-20 px-6 border-b-4 border-[#222] text-center relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${bookstoreBg})` }}
            >
                {/* Dark tint overlay to keep text ultra-readable against the image background */}
                <div className="absolute inset-0 bg-[#222]/80 backdrop-blur-[2px]" />
                
                {/* Blueprint grid layout pattern overlapping on top of the image */}
                <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:25px_25px]" />
                
                <div className="relative z-10 space-y-4 max-w-4xl mx-auto">
                    {/* Return Action */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-0 left-0 bg-[#64d4ac] text-[#222] border-3 border-[#222] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.25)] hover:bg-white hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1"
                    >
                        <HiArrowSmLeft size={16} /> Return
                    </button>

                    <span className="inline-block bg-[#ffd166] text-[#222] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border-2 border-[#222] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                        ABOUT INDEX
                    </span>
                    <h1 className="text-5xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-none text-white">
                        ABOUT <span className="text-[#64d4ac]">BOOKSTORE</span>
                    </h1>
                    <p className="text-white/70 text-xs md:text-sm max-w-md mx-auto font-black tracking-wide uppercase bg-[#222]/60 p-2 rounded-xl border-2 border-dashed border-white/20">
                        Uncompromising storage guidelines, curated cataloging, and reading rules.
                    </p>
                </div>
            </div>

            {/* MARQUEE RUNNING TICKER STRIP */}
            <div className="bg-[#ffd166] border-b-4 border-[#222] py-2 overflow-hidden flex whitespace-nowrap relative z-20">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                    className="flex text-xs font-black uppercase tracking-widest text-[#222]"
                >
                    <span>{tickerText + tickerText + tickerText + tickerText}</span>
                </motion.div>
            </div>

            {/* THE ARCHIVAL TAB CONTROLLER WRAPPER */}
            <div className="w-[95%] lg:w-[75%] mx-auto mt-16">
                
                {/* INTERACTIVE FOLDER TABS */}
                <div className="flex flex-wrap gap-2 md:gap-0 items-end relative z-10 transition-all">
                    {[
                        { id: 'manifesto', label: 'OUR MISSION', color: 'bg-[#ff6b6b]' },
                        { id: 'rules', label: 'VAULT ACCESS RULES', color: 'bg-[#64d4ac]' },
                        { id: 'collections', label: 'RARE INVENTORY', color: 'bg-purple-400' },
                    ].map((tab) => {
                        const isSelected = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    border-4 border-b-0 border-[#222] px-6 py-3.5 font-black text-xs md:text-sm tracking-wider uppercase rounded-t-2xl transition-all relative top-[4px] md:top-0
                                    ${isSelected 
                                        ? `${tab.color} text-[#222] shadow-[0px_-4px_0px_#222] z-30 pt-5 pb-4 translate-y-0` 
                                        : 'bg-white text-[#222]/50 hover:text-[#222] hover:bg-gray-100 z-10 translate-y-1 md:translate-y-2'
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* MAIN COURIER SCREEN CONTAINER */}
                <div className="bg-white border-4 border-[#222] rounded-b-[2.5rem] rounded-tr-[2.5rem] p-6 md:p-12 shadow-[12px_12px_0px_0px_#222] min-h-[450px] relative z-20 overflow-hidden">
                    
                    <AnimatePresence mode="wait">
                        
                        {/* TAB 1: BOOKSTORE MISSION */}
                        {activeTab === 'manifesto' && (
                            <motion.div
                                key="manifesto"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={springTransition}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                            >
                                <div className="lg:col-span-7 space-y-6 text-left">
                                    <div className="inline-flex items-center gap-2 bg-[#ff6b6b]/10 border-2 border-[#ff6b6b] text-[#ff6b6b] px-3 py-1 rounded-md text-xs font-black uppercase">
                                        <HiBookOpen /> PRESERVING PROSE
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-[1000] italic tracking-tight text-[#222] leading-none">
                                        Not just a catalog, an Undergroud Hoard.
                                    </h2>
                                    <p className="text-sm md:text-base text-[#222]/80 leading-relaxed font-medium">
                                        The Vault was founded for readers who treat books like prized assets. We reject cluttered store designs, intrusive advertising pop-ups, and algorithms that bury classic text. Our goal is simple: map out historical literature, high-tier worldbuilding series, and underground editions onto a transparent digital terminal.
                                    </p>
                                    <blockquote className="border-l-4 border-[#ff6b6b] bg-gray-50 p-4 rounded-r-xl font-bold italic text-xs md:text-sm text-[#222]/70">
                                        "Books aren't ornaments—they are blueprints for structural ideas. We supply them raw, quick, and unfiltered."
                                    </blockquote>
                                </div>
                                <div className="lg:col-span-5 flex justify-center">
                                    {/* Completely stripped the color overlay here */}
                                    <div 
                                        className="w-full max-w-[280px] aspect-square border-4 border-[#222] rounded-[2rem] shadow-[8px_8px_0px_0px_#222] flex flex-col justify-between p-6 relative group bg-cover bg-center overflow-hidden"
                                        style={{ backgroundImage: `url(${missionSideBg})` }}
                                    >
                                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
                                    
                                        <span className="relative z-10 font-black text-white text-xl uppercase tracking-tighter leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Curated inventory integrity.</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 2: STORE RULES & ACCESS */}
                        {activeTab === 'rules' && (
                            <motion.div
                                key="rules"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={springTransition}
                                className="space-y-8"
                            >
                                <div className="text-left space-y-2">
                                    <h2 className="text-3xl font-[1000] uppercase tracking-tight">VAULT VISITATION RULES</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">How our index system maintains fairness</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { icon: <HiShieldCheck size={24} />, title: "The Security Gate", color: "bg-[#64d4ac]", desc: "To browse structural details or view deeper author bios, our gate requires a rapid terminal login. Unverified visitors are restricted." },
                                        { icon: <HiClock size={24} />, title: "Flash Sale Spikes", color: "bg-[#ffd166]", desc: "Items highlighted with our flash banner sit on fluctuating tickers. They are subject to rapid stock exhaustion based on live local client traffic." },
                                        { icon: <HiTicket size={24} />, title: "Bag Constraints", color: "bg-[#ff6b6b]", desc: "Once locked in your bag, prices are held locally. However, ignoring check-out flags risks losing rare editions to other users clearing memory." }
                                    ].map((rule, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -6, scale: 1.01 }}
                                            className="bg-[#fcfcfc] border-4 border-[#222] p-6 rounded-2xl shadow-[6px_6px_0px_0px_#222] space-y-4 text-left transition-shadow"
                                        >
                                            <div className={`w-12 h-12 ${rule.color} border-3 border-[#222] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#222]`}>
                                                {rule.icon}
                                            </div>
                                            <h3 className="text-lg font-black uppercase tracking-tight">{rule.title}</h3>
                                            <p className="text-xs text-[#222]/70 font-medium leading-relaxed">{rule.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 3: INVENTORY EXPLANATIONS */}
                        {activeTab === 'collections' && (
                            <motion.div
                                key="collections"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={springTransition}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left"
                            >
                                {/* Completely stripped the tint color overlay here */}
                                <div 
                                    className="lg:col-span-4 p-6 rounded-3xl border-4 border-[#222] flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(34,34,34,0.3)] bg-cover bg-center relative min-h-[180px] lg:min-h-auto"
                                    style={{ backgroundImage: `url(${inventorySideBg})` }}
                                >
                                    <div className="space-y-2 relative z-10">
                                        <span className="text-[9px] bg-purple-400 text-[#222] border-2 border-[#222] px-2 py-0.5 rounded font-black uppercase tracking-wider shadow-sm">CATALOG SPEC LOG</span>
                                        <h3 className="text-xl font-[1000] uppercase italic tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">STOCK CATEGORIES</h3>
                                    </div>
                                </div>

                                <div className="lg:col-span-8 flex flex-col justify-between gap-3">
                                    {[
                                        { name: "Premium Vault Stacks", detail: "Elite pieces carrying highly technical prose, higher valuation marks, and distinct gold badges.", icon: <HiSparkles className="text-[#ffd166]" /> },
                                        { name: "Bestselling Classics", detail: "Highly sought-after, popular volumes flag-tagged for immediate audience retention values.", icon: <HiBookOpen className="text-[#64d4ac]" /> },
                                        { name: "Recently Added Arrivals", detail: "Fresh catalog logs newly unpacked from arriving inventory shipments into our archive system.", icon: <HiClock className="text-[#ff6b6b]" /> },
                                        { name: "Dynamic Admin Archives", detail: "Custom, unpredictable categories hand-injected into our registry matrix directly by the vault managers.", icon: <HiBookOpen className="text-purple-400" /> }
                                    ].map((tech, idx) => (
                                        <div 
                                            key={idx}
                                            className="bg-gray-50 border-3 border-[#222] p-3 px-4 rounded-xl flex items-center justify-between shadow-[3px_3px_0px_0px_#222]"
                                        >
                                            <div className="flex items-center gap-3 truncate">
                                                <span className="text-xl shrink-0 bg-white border-2 border-[#222] p-1.5 rounded-lg shadow-[1.5px_1.5px_0px_0px_#222]">{tech.icon}</span>
                                                <div className="truncate">
                                                    <p className="text-xs font-black uppercase tracking-tight truncate">{tech.name}</p>
                                                    <p className="text-[10px] text-[#222]/50 font-bold truncate">{tech.detail}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default About;