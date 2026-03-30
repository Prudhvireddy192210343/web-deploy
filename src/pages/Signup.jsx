import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, ClipboardList, CheckCircle2 } from 'lucide-react';
import { useApp } from '../App';
import { apiCall } from '../services/api';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const { setDoctorName } = useApp();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        if (phone.length !== 10) {
            setError("Mobile number must be exactly 10 digits.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const data = await apiCall('/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: fullName,
                    email,
                    password,
                    mobile: phone,
                    role: 'Doctor'
                })
            });
            setDoctorName(fullName);
            setIsRegistered(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-950 flex flex-col items-center justify-start p-6 lg:p-12 overflow-y-auto transition-colors duration-500">
            {/* Logos at top Corners */}
            <div className="w-full max-w-lg flex items-center justify-between mb-12">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/10">
                        F
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[#0D121B]">DentaAI</h2>
                    </div>
                </div>
                <div className="flex items-center space-x-4 opacity-70">
                    <div className="w-14 h-8 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-[10px] font-bold text-[#4C669A] dark:text-gray-400 border border-gray-200 dark:border-slate-700">
                        SAVEETHA
                    </div>
                    <div className="w-14 h-8 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-[10px] font-bold text-[#4C669A] dark:text-gray-400 border border-gray-200 dark:border-slate-700">
                        SSE
                    </div>
                </div>
            </div>

            <div className="w-full max-w-lg text-center space-y-10">
                {/* Title */}
                <h1 className="text-3xl font-black text-[#0D121B] dark:text-white tracking-tight">Create Professional Account</h1>

                {/* Logo Card with Blue Gradient */}
                <div className="relative w-full h-[160px] bg-gradient-to-br from-[#0D2E40] to-[#051A2E] rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-900/40 overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-150 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute inset-0 bg-blue-400/5 blur-3xl rounded-full scale-125 transform -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-[24px] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-blue-900 shadow-xl">
                                <ClipboardList size={24} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[#0D121B] dark:text-white">Join Our Network</h2>
                    <p className="text-[#4C669A] dark:text-gray-400 font-medium text-[15px]">Empower your practice with AI-driven diagnostics</p>
                    {error && <p className="text-red-500 font-bold mt-2 text-sm">{error}</p>}
                </div>

                {/* Form Fields */}
                {isRegistered ? (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500 pt-10">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
                            <CheckCircle2 size={40} strokeWidth={3} />
                        </div>
                        <h2 className="text-2xl font-black text-emerald-600">Registered Successfully!</h2>
                        <p className="text-[#4C669A] font-medium">Preparing your clinical dashboard...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Full Name (with credentials)"
                                className="w-full h-[60px] pl-12 pr-4 bg-gray-50 dark:bg-slate-900 border border-[#CFD7E7]/50 dark:border-slate-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={20} />
                            <input
                                type="email"
                                placeholder="Professional Email"
                                className="w-full h-[60px] pl-12 pr-4 bg-gray-50 dark:bg-slate-900 border border-[#CFD7E7]/50 dark:border-slate-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={20} />
                            <input
                                type="tel"
                                placeholder="Mobile Number (10 digits)"
                                className="w-full h-[60px] pl-12 pr-4 bg-gray-50 dark:bg-slate-900 border border-[#CFD7E7]/50 dark:border-slate-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full h-[60px] pl-12 pr-4 bg-gray-50 dark:bg-slate-900 border border-[#CFD7E7]/50 dark:border-slate-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm"
                                    className="w-full h-[60px] pl-12 pr-4 bg-gray-50 dark:bg-slate-900 border border-[#CFD7E7]/50 dark:border-slate-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-[60px] bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300 mt-2"
                        >
                            Create Account
                        </button>
                    </form>
                )}

                <div className="flex items-center space-x-4">
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                    <span className="text-xs font-black text-[#4C669A]/30 uppercase tracking-widest">OR</span>
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>

                <Link
                    to="/login"
                    className="w-full h-[60px] bg-transparent text-[#0D121B] dark:text-white font-bold text-lg rounded-2xl border-2 border-[#CFD7E7]/60 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-gray-200 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                    <User size={20} />
                    <span>Back to Login</span>
                </Link>

                <div className="py-8 pt-10">
                    <p className="text-sm font-black text-[#0D121B] dark:text-white tracking-wide border-t border-gray-100 dark:border-slate-800 pt-8 mt-10">
                        Powered by <span className="text-blue-600">SIMATS Engineering</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
