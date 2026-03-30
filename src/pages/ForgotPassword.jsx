import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Key } from 'lucide-react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        // Simulate verification and go to Update Password page
        navigate('/update-password');
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
                        <h2 className="text-lg font-bold text-[#0D121B] dark:text-white">DentaAI</h2>
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
                <h1 className="text-3xl font-black text-[#0D121B] dark:text-white tracking-tight">Recover Account Access</h1>

                {/* Logo Card with Blue Gradient */}
                <div className="relative w-full h-[180px] bg-gradient-to-br from-[#0D2E40] to-[#051A2E] rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-900/40 overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-150 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute inset-0 bg-blue-400/5 blur-3xl rounded-full scale-125 transform -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-18 h-18 rounded-[28px] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-all duration-500 bg-white/10 backdrop-blur-md">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl bg-white text-blue-900">
                                <Key size={28} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-[#0D121B] dark:text-white">Reset Credentials</h2>
                    <p className="text-[#4C669A] dark:text-gray-400 font-medium text-[15px] leading-relaxed">
                        Provide your registered email or mobile number to verify your professional identity and reset your vault password.
                    </p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={22} />
                        <input
                            type="text"
                            placeholder="Email or Mobile Number"
                            className="w-full h-[64px] pl-14 pr-4 bg-white dark:bg-slate-900 border border-[#CFD7E7]/60 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white shadow-sm shadow-blue-900/[0.02]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-[64px] bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                        <span>Verify Email</span>
                    </button>
                </form>

                <div className="pt-6">
                    <Link
                        to="/login"
                        className="inline-flex items-center space-x-2 text-[#4C669A] dark:text-gray-400 font-bold hover:text-blue-600 transition-all group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Sign In</span>
                    </Link>
                </div>

                <div className="py-8 pt-10">
                    <p className="text-sm font-black text-[#0D121B] tracking-wide border-t border-gray-100 pt-8 mt-10">
                        Powered by <span className="text-blue-600">SIMATS Engineering</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
