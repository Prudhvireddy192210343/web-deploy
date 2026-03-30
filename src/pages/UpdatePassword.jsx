import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react';

function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Simulate update
        setIsUpdated(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
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
                <h1 className="text-3xl font-black text-[#0D121B] dark:text-white tracking-tight">Update Vault Password</h1>

                {/* Logo Card */}
                <div className="relative w-full h-[180px] bg-gradient-to-br from-[#0D2E40] to-[#051A2E] rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-900/40 overflow-hidden group">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className={`w-18 h-18 rounded-[28px] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-all duration-500 ${isUpdated ? 'bg-emerald-500/20' : 'bg-white/10 backdrop-blur-md'}`}>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl ${isUpdated ? 'bg-emerald-500 text-white' : 'bg-white text-blue-900'}`}>
                                {isUpdated ? <CheckCircle2 size={28} strokeWidth={2.5} /> : <Lock size={28} strokeWidth={2.5} />}
                            </div>
                        </div>
                    </div>
                </div>

                {isUpdated ? (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500 pt-10">
                        <h2 className="text-2xl font-black text-emerald-600">Password Updated Successfully!</h2>
                        <p className="text-[#4C669A] font-medium">Redirecting you to login...</p>
                    </div>
                ) : (
                    <>
                        {/* Message */}
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-[#0D121B] dark:text-white">New Credentials</h2>
                            <p className="text-[#4C669A] dark:text-gray-400 font-medium text-[15px] leading-relaxed">
                                Establish your new professional entry code. Ensure it meets the required clinical security guidelines.
                            </p>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Secure Password"
                                        className="w-full h-[64px] pl-14 pr-12 bg-white dark:bg-slate-900 border border-[#CFD7E7]/60 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white shadow-sm shadow-blue-900/[0.02]"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 hover:text-blue-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/50 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm New Password"
                                        className="w-full h-[64px] pl-14 pr-12 bg-white dark:bg-slate-900 border border-[#CFD7E7]/60 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-600/40 focus:ring-4 focus:ring-blue-100/30 transition-all font-medium text-[#0D121B] dark:text-white shadow-sm shadow-blue-900/[0.02]"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-[64px] bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300"
                            >
                                Update Password
                            </button>
                        </form>
                    </>
                )}

                {!isUpdated && (
                    <div className="pt-6">
                        <Link
                            to="/login"
                            className="inline-flex items-center space-x-2 text-[#4C669A] font-bold hover:text-blue-600 transition-all group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Login</span>
                        </Link>
                    </div>
                )}

                <div className="py-8 pt-10">
                    <p className="text-sm font-black text-[#0D121B] tracking-wide border-t border-gray-100 pt-8 mt-10">
                        Powered by <span className="text-blue-600">SIMATS Engineering</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UpdatePassword;
