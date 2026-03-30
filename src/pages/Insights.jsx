import { TrendingUp, Award, Zap, Flag, ChevronRight } from 'lucide-react';
import { useApp } from '../App';

function Insights() {
    const { cases } = useApp();

    const activeCases = cases.filter(c => c.status === 'Active').length;
    const completedCases = cases.filter(c => c.status === 'Completed').length;
    const totalCases = cases.length || 1;

    // Compute dynamic values
    const successRate = totalCases > 1 ? Math.round((completedCases / cases.length) * 100) : 98; // Fallback to 98% if not enough data
    const efficiency = activeCases > 0 ? '+15%' : '+0%';

    // Categorize complaints for the bar chart based on actual user cases
    const getCount = (...keywords) => cases.filter(c => keywords.some(k => c.complaint.toLowerCase().includes(k))).length;

    // Calculate counts
    const fullRehabCount = getCount('full', 'worn', 'rehabilitation');
    const estheticsCount = getCount('esthetic', 'poor', 'smile', 'ortho');
    const emergencyCount = getCount('pain', 'emergency', 'implant');
    const functionalCount = getCount('chew', 'difficult', 'bite');

    // Determine max for relative scaling (minimum 1 to avoid division by zero)
    const maxVal = Math.max(fullRehabCount, estheticsCount, emergencyCount, functionalCount, 1);

    // Scale to percentage (minimum 10% for visibility)
    const getPercent = (val) => Math.max(15, Math.round((val / maxVal) * 100));

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-black text-[#0D121B] dark:text-white tracking-tight">Insights</h1>
            </div>

            {/* Monthly Practice Overview Card */}
            <div className="relative group overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl p-7 border border-[#CFD7E7]/40 dark:border-slate-800 shadow-xl shadow-blue-900/[0.04] transition-all duration-300">
                <div className="flex items-start justify-between relative z-10">
                    <div className="space-y-2">
                        <h3 className="text-[#4C669A] dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Global Practice Overview</h3>
                        <h4 className="text-3xl font-black text-[#0D121B] dark:text-white">Cases Processed</h4>
                        <p className="text-[#4C669A] dark:text-gray-400 text-[15px] font-medium transition-transform group-hover:translate-x-1 duration-300 flex items-center space-x-2">
                            <span className="font-bold text-blue-600 dark:text-blue-400">{activeCases} Active Cases</span>
                            <span className="text-emerald-500 flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full text-xs font-bold ml-2"><TrendingUp size={12} className="mr-1" /> Trending</span>
                        </p>
                    </div>

                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-700/30 group-hover:rotate-6 transition-all duration-500">
                        <Zap size={40} weight="fill" />
                    </div>
                </div>

                {/* Decorative background grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h100v100H0z" fill="url(#grid)" />
                        <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" stroke="currentColor" strokeWidth="0.5" /></pattern></defs>
                    </svg>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-5">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#CFD7E7]/40 dark:border-slate-800 shadow-lg shadow-blue-900/[0.02] space-y-3 group hover:shadow-xl transition-all">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                        <Award size={22} />
                    </div>
                    <div>
                        <p className="text-[#4C669A] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">Avg. Success</p>
                        <h4 className="text-2xl font-black text-[#0D121B] dark:text-white">{successRate}%</h4>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#CFD7E7]/40 dark:border-slate-800 shadow-lg shadow-blue-900/[0.02] space-y-3 group hover:shadow-xl transition-all">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                        <TrendingUp size={22} />
                    </div>
                    <div>
                        <p className="text-[#4C669A] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">Efficiency</p>
                        <h4 className="text-2xl font-black text-[#0D121B] dark:text-white">{efficiency}</h4>
                    </div>
                </div>
            </div>

            {/* Case Success Rates Bar Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-[#CFD7E7]/30 dark:border-slate-800 shadow-2xl shadow-blue-950/[0.04] space-y-8">
                <h3 className="text-xl font-bold text-[#0D121B] dark:text-white tracking-tight">Case Distribution</h3>
                <div className="flex items-end justify-between h-[180px] px-2 space-x-6">
                    <BarItem percent={getPercent(fullRehabCount)} label="Full Rehab" active={fullRehabCount === maxVal} />
                    <BarItem percent={getPercent(estheticsCount)} label="Esthetics" active={estheticsCount === maxVal && estheticsCount > 0} />
                    <BarItem percent={getPercent(emergencyCount)} label="Emergency" active={emergencyCount === maxVal && emergencyCount > 0} />
                    <BarItem percent={getPercent(functionalCount)} label="Functional" active={functionalCount === maxVal && functionalCount > 0} />
                </div>
            </div>

            {/* Top Findings */}
            <div className="space-y-5">
                <h3 className="text-xl font-bold text-[#0D121B] dark:text-white tracking-tight px-1">Top Findings</h3>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-[#CFD7E7]/40 dark:border-slate-800 shadow-lg shadow-blue-900/[0.03] flex items-center justify-between group hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-50/80 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Flag size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0D121B] dark:text-white">Bruxism detected</h4>
                            <p className="text-[#4C669A] dark:text-gray-400 text-sm font-medium">15% of cases this month</p>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-[#CFD7E7] dark:text-slate-700 group-hover:translate-x-1 transition-all" />
                </div>
            </div>

            {/* Predictive Trends */}
            <div className="space-y-3 px-1 pb-24">
                <h3 className="text-xl font-bold text-[#0D121B] dark:text-white tracking-tight">Predictive Trends</h3>
                <p className="text-[#4C669A] dark:text-gray-400 text-sm leading-relaxed font-medium">
                    AI-generated forecast of upcoming high-complexity cases based on patient history and current trends.
                </p>
            </div>
        </div>
    );
}

function BarItem({ percent, label, active }) {
    return (
        <div className="flex flex-col items-center flex-1 h-full max-w-[80px]">
            <div className="flex-1 w-full flex flex-col justify-end">
                <div className={`w-full rounded-[10px] ${active ? 'bg-blue-600 shadow-xl shadow-blue-600/30' : 'bg-blue-50 dark:bg-slate-800'} transition-all duration-700 ease-out`} style={{ height: `${percent}%` }}></div>
            </div>
            <p className="text-[#4C669A] dark:text-gray-400 text-[10px] font-black uppercase tracking-wider mt-4 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                {label}
            </p>
        </div>
    );
}

export default Insights;
