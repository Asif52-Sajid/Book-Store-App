import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) navigate('/');
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-6 bg-[#222]">
            <div className="bg-[#64d4ac] w-full max-w-md p-10 rounded-[2rem] border-4 border-[#222] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
                
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-[900] text-[#222] uppercase tracking-tighter italic">Welcome</h2>
                    <p className="text-[#222]/70 font-bold text-sm uppercase tracking-widest">Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="relative group">
                        <label className="block text-[10px] font-black uppercase text-[#222] mb-1 ml-4">Email Address</label>
                        <div className="flex items-center">
                            <HiOutlineMail className="absolute left-4 text-[#222] text-xl" />
                            <input 
                                type="email" 
                                placeholder="name@example.com"
                                className="w-full bg-white/40 border-2 border-[#222] pl-12 pr-4 py-4 rounded-2xl outline-none focus:bg-white font-bold text-[#222] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-none"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <label className="block text-[10px] font-black uppercase text-[#222] mb-1 ml-4">Password</label>
                        <div className="flex items-center">
                            <HiOutlineLockClosed className="absolute left-4 text-[#222] text-xl" />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-white/40 border-2 border-[#222] pl-12 pr-4 py-4 rounded-2xl outline-none focus:bg-white font-bold text-[#222] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-none"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-[#222] text-[#64d4ac] py-5 rounded-2xl font-[900] uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95">
                        Log In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm font-bold text-[#222]">
                        Don't have an account? <Link to="/signup" className="underline decoration-2 hover:text-white transition-colors">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;