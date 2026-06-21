import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import your 3 local images
import img1 from '../assets/hero1.jpg';
import img2 from '../assets/hero2.jpg';
import img3 from '../assets/hero3.jpg';

const Hero = () => {
    return (
        <section className="w-[95%] lg:w-[85%] mx-auto mt-8 mb-20 font-['Work_Sans']">
            {/* Removed fixed h-[600px] to prevent stretching/cropping on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. LARGE MASTER CARD (Left Side) */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    /* Using aspect-video or custom aspect to keep proportions perfect */
                    className="lg:col-span-7 relative group overflow-hidden rounded-[2.5rem] border-4 border-[#222] shadow-[12px_12px_0px_0px_rgba(34,34,34,1)] aspect-square md:aspect-video lg:aspect-auto"
                >
                    <img 
                        src={img1} 
                        alt="Bestsellers" 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222]/90 via-[#222]/20 to-transparent flex flex-col justify-end p-6 md:p-12">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-[#64d4ac] text-[#222] w-fit px-4 py-1 rounded-full font-black text-xs uppercase mb-4 shadow-[4px_4px_0px_0px_#222]"
                        >
                            Trending Now
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl xl:text-7xl font-[950] text-white uppercase italic tracking-tighter leading-[0.9]">
                            Uncover <br /> New Worlds
                        </h2>
                        <Link 
                            to="/details" 
                            className="mt-8 bg-white text-[#222] w-fit px-8 py-4 rounded-xl font-black uppercase hover:bg-[#64d4ac] transition-all shadow-[6px_6px_0px_0px_rgba(100,212,172,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN (Two Stacked Images) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    
                    {/* 2. TOP RIGHT CARD */}
                    <motion.div 
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative flex-1 group overflow-hidden rounded-[2.5rem] border-4 border-[#222] shadow-[8px_8px_0px_0px_rgba(100,212,172,1)] min-h-[250px]"
                    >
                        <img src={img2} alt="Classics" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[#222]/40 group-hover:bg-[#222]/20 transition-all flex items-center justify-center">
                            <h3 className="text-white text-3xl xl:text-4xl font-[950] uppercase italic tracking-tighter border-b-8 border-[#64d4ac] px-2">Vintage Rare</h3>
                        </div>
                    </motion.div>

                    {/* 3. BOTTOM RIGHT CARD */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative flex-1 group overflow-hidden rounded-[2.5rem] border-4 border-[#222] shadow-[8px_8px_0px_0px_rgba(34,34,34,1)] min-h-[250px]"
                    >
                        <img src={img3} alt="New Arrivals" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#64d4ac]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center z-20">
                            <p className="text-[#222] font-[1000] uppercase text-2xl leading-none">New Arrivals<br/>Weekly</p>
                            <Link to="/details" className="mt-4 bg-[#222] text-white px-6 py-2 rounded-lg font-black uppercase text-sm">Explore More</Link>
                        </div>

                        {/* Static Label */}
                        <div className="absolute bottom-6 left-6 z-10 group-hover:opacity-0 transition-opacity">
                            <h3 className="text-white text-xl xl:text-2xl font-[900] uppercase italic tracking-tighter bg-[#222] border-l-8 border-[#64d4ac] px-4 py-2">
                                Modern Literature
                            </h3>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;