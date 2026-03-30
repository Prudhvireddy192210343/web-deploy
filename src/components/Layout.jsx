import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Briefcase, ChartArea, Settings } from 'lucide-react';

const navItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Cases', path: '/dashboard/cases', icon: Briefcase },
    { label: 'Insights', path: '/dashboard/insights', icon: ChartArea },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
];

import { useApp } from '../App';

function Layout({ children }) {
    const location = useLocation();
    const { doctorName } = useApp();

    return (
        <div className="flex bg-[#F8F9FC] dark:bg-slate-950 min-h-screen transition-colors duration-500">
            {/* Sidebar for Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-[#CFD7E7]/50 dark:border-slate-800 p-6 sticky top-0 h-screen">
                <div className="flex items-center space-x-3 mb-10 px-2 leading-none">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/10">
                        F
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[#0D121B] dark:text-white">DentaAI</h2>
                        <span className="text-[10px] uppercase font-bold text-blue-600/60 tracking-wider">Clinician App</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5 focus:outline-none outline-none">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 outline-none focus:outline-none ${isActive
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/15'
                                    : 'text-[#4C669A]/80 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 hover:text-[#0D121B] dark:hover:text-white'
                                    }`}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="font-semibold text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/30 dark:border-blue-800/20">
                    <p className="text-[11px] text-[#4C669A] dark:text-gray-400 leading-relaxed">
                        Logged in as <br /><span className="text-[#0D121B] dark:text-white font-bold">Dr. {doctorName}</span>
                    </p>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 font-appPrimaryText dark:text-gray-100">
                <div className="max-w-4xl mx-auto p-5 lg:p-12 pb-32 lg:pb-12">
                    {children || <Outlet />}
                </div>
            </main>

            {/* Bottom Navigation for Mobile */}
            <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-[72px] bg-white/90 dark:bg-slate-900/90 border border-[#CFD7E7]/40 dark:border-slate-800 rounded-[28px] shadow-2xl shadow-blue-900/10 flex items-center justify-around px-2 z-50 backdrop-blur-xl">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-[#4C669A]/70'
                                }`}
                        >
                            <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 shadow-inner' : ''}`}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default Layout;
