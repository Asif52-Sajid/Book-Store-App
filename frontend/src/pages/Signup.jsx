import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { signup } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signup(formData);
        if (success) navigate('/');
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-6 bg-[#222]">
            <div className="bg-[#64d4ac] w-full max-w-md p-10 rounded-[2rem] border-4 border-[#222] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-[900] text-[#222] uppercase tracking-tighter italic">Join Us</h2>
                    <p className="text-[#222]/70 font-bold text-sm uppercase tracking-widest">Start your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="relative">
                        <label className="block text-[10px] font-black uppercase text-[#222] mb-1 ml-4">Full Name</label>
                        <div className="flex items-center">
                            <HiOutlineUser className="absolute left-4 text-[#222] text-xl" />
                            <input 
                                type="text" 
                                placeholder="Your Name"
                                className="w-full bg-white/40 border-2 border-[#222] pl-12 pr-4 py-4 rounded-2xl outline-none focus:bg-white font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="block text-[10px] font-black uppercase text-[#222] mb-1 ml-4">Email</label>
                        <div className="flex items-center">
                            <HiOutlineMail className="absolute left-4 text-[#222] text-xl" />
                            <input 
                                type="email" 
                                placeholder="name@example.com"
                                className="w-full bg-white/40 border-2 border-[#222] pl-12 pr-4 py-4 rounded-2xl outline-none focus:bg-white font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-[10px] font-black uppercase text-[#222] mb-1 ml-4">Password</label>
                        <div className="flex items-center">
                            <HiOutlineLockClosed className="absolute left-4 text-[#222] text-xl" />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-white/40 border-2 border-[#222] pl-12 pr-4 py-4 rounded-2xl outline-none focus:bg-white font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-[#222] text-[#64d4ac] py-5 rounded-2xl font-[900] uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all mt-4">
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-bold text-[#222]">
                    Already a member? <Link to="/login" className="underline decoration-2 hover:text-white transition-colors">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;