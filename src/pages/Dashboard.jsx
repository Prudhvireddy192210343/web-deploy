import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Plus, User, CheckCircle2, Clock, X, Trash2, MoreVertical, FileText, UserCircle } from 'lucide-react';
import { useApp } from '../App';

const ToothIcon = ({ size = 24, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M18.8,3.4C17.7,2.5,15.7,2,14.3,2c-1.4,0-2.3,0.5-2.3,0.5S11,2,9.7,2C8.3,2,6.3,2.5,5.2,3.4C3.2,5.1,3,10,3,10 c0,1,1,3,2,4l1,7c0.1,0.6,0.6,1,1.2,1h2.5c0.6,0,1.1-0.4,1.2-1l1-4.1l1,4.1c0.1,0.6,0.6,1,1.2,1h2.5c0.6,0,1.1-0.4,1.2-1l1-7 c1-1,2-3,2-4C21,10,20.8,5.1,18.8,3.4z" />
    </svg>
);

function Dashboard() {
    const { cases, notifications, clearNotifications, markAllAsRead, deleteCase, openEditModal, doctorName } = useApp();
    const [showNotifications, setShowNotifications] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const activeCases = cases.filter(c => c.status === 'Active').length;
    const pendingCases = cases.filter(c => c.status === 'Pending').length;
    const completedCases = cases.filter(c => c.status === 'Completed').length;
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleToggleNotifications = () => {
        if (!showNotifications) {
            markAllAsRead();
        }
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="space-y-10">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 bg-white rounded-full border-2 border-blue-500/20 shadow-md p-0.5 overflow-hidden">
                        <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <User size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-[#0D121B] dark:text-white tracking-tight">Welcome, Dr. {doctorName}</h1>
                        <p className="text-[#4C669A] dark:text-gray-400 font-medium tracking-wide">Elevating Smile Precision with AI</p>
                    </div>
                </div>

                <button
                    onClick={handleToggleNotifications}
                    className="relative p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-[#CFD7E7]/40 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group overflow-visible"
                >
                    <Bell size={22} className="text-[#0D121B] dark:text-white group-hover:text-blue-600 transition-colors" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
                    )}
                </button>

                {/* Notifications Overlay */}
                {showNotifications && (
                    <>
                        <div className="fixed inset-0 z-[60]" onClick={() => setShowNotifications(false)}></div>
                        <div className="absolute right-0 top-16 w-[320px] bg-white dark:bg-slate-800 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-2xl z-[70] p-6 animate-in slide-in-from-top-4 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-[#0D121B] dark:text-white">Notifications</h3>
                                {notifications.length > 0 && (
                                    <button
                                        onClick={clearNotifications}
                                        className="text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                {notifications.length > 0 ? (
                                    notifications.map(n => (
                                        <div key={n.id} className="space-y-1 relative">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-bold text-[#0D121B] dark:text-white">{n.title}</p>
                                                    <p className="text-xs text-[#4C669A] dark:text-gray-400 line-clamp-2 leading-relaxed">{n.message}</p>
                                                    <p className="text-[10px] font-bold text-[#4C669A]/40 uppercase tracking-widest pt-1">{n.time}</p>
                                                </div>
                                                {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 ml-2"></div>}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center space-y-3">
                                        <div className="w-12 h-12 bg-gray-50 dark:bg-slate-700 rounded-full mx-auto flex items-center justify-center text-gray-200">
                                            <Bell size={24} />
                                        </div>
                                        <p className="text-xs font-bold text-[#4C669A]">No new notifications</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* New Patient Case Card */}
            <Link to="/dashboard/new-case" className="w-full block relative overflow-hidden bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-[32px] p-8 border border-[#CFD7E7]/40 dark:border-slate-700 shadow-lg shadow-blue-900/[0.03] flex items-center justify-between group hover:scale-[1.01] active:scale-[0.99] transition-all duration-300">
                <div className="flex-1 text-left relative z-10">
                    <h2 className="text-2xl font-black text-[#0D121B] dark:text-white">New Patient Case</h2>
                    <p className="text-[#4C669A] dark:text-gray-400 text-base mt-1.5 font-medium leading-relaxed max-w-xs">Begin a new professional treatment plan assessment with DentaAI</p>
                </div>

                <div className="relative w-32 h-32 bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/20 rounded-[40px] flex items-center justify-center overflow-hidden border border-blue-200/30 dark:border-blue-700/30 group-hover:scale-110 transition-transform duration-500">
                    <div className="w-18 h-18 bg-blue-600/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <ToothIcon size={48} />
                    </div>
                    {/* Floating decoration */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
                </div>
            </Link>

            {/* Case Statistics */}
            <div>
                <h3 className="text-lg font-bold text-[#0D121B] mb-5 tracking-tight px-1">Case Statistics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard title="Active Plans" value={activeCases} color="blue" icon={Clock} />
                    <StatCard title="Pending Review" value={pendingCases} color="amber" icon={Plus} />
                    <StatCard title="Completed" value={completedCases} color="emerald" icon={CheckCircle2} />
                </div>
            </div>

            {/* Recent Patient Cases */}
            <div>
                <h3 className="text-lg font-bold text-[#0D121B] mb-5 tracking-tight px-1 flex items-center justify-between">
                    <span>Recent Patient Cases</span>
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
                </h3>
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-[#CFD7E7]/40 dark:border-slate-700 shadow-xl shadow-blue-900/[0.03] overflow-hidden">
                    {cases.slice(0, 3).map((patient, index) => (
                        <div key={patient.id} className={`p-4 flex items-center justify-between group cursor-pointer hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors ${index !== Math.min(cases.length, 3) - 1 ? 'border-b border-gray-100/60 dark:border-slate-700/60' : ''}`}>
                            <div className="flex items-center space-x-4">
                                <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600/80 font-bold group-hover:bg-blue-50 transition-colors">
                                    {patient.name.charAt(0)}
                                </div>
                                <div className="leading-tight">
                                    <h4 className="font-bold text-[#0D121B] dark:text-white text-[15px]">{patient.name}</h4>
                                    <p className="text-[#4C669A] dark:text-gray-400 text-[13px] mt-0.5">{patient.complaint}</p>
                                    <p className="text-[#4C669A]/60 dark:text-gray-500 text-[11px] font-bold tracking-widest mt-1 uppercase">ID: {patient.id} • {patient.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 relative">
                                <div className={`w-2.5 h-2.5 rounded-full ${patient.status === 'Active' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' :
                                    patient.status === 'Pending' ? 'bg-amber-500 shadow-lg shadow-amber-500/30' : 'bg-gray-300'
                                    }`}></div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveMenu(activeMenu === patient.id ? null : patient.id);
                                    }}
                                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-[#4C669A]"
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {activeMenu === patient.id && (
                                    <>
                                        <div className="fixed inset-0 z-[60]" onClick={() => setActiveMenu(null)}></div>
                                        <div className="absolute right-0 top-10 w-[180px] bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-2xl z-[70] p-1.5 animate-in slide-in-from-top-2 duration-200">
                                            <Link
                                                to="/dashboard/treatment-plan"
                                                className="w-full text-left px-3 py-2 text-[13px] font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center space-x-2"
                                            >
                                                <FileText size={14} />
                                                <span>View Summary</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    openEditModal(patient);
                                                    setActiveMenu(null);
                                                }}
                                                className="w-full text-left px-3 py-2 text-[13px] font-bold text-[#0D121B] dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center space-x-2"
                                            >
                                                <UserCircle size={14} />
                                                <span>Edit Details</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteCase(patient.id);
                                                    setActiveMenu(null);
                                                }}
                                                className="w-full text-left px-3 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center space-x-2"
                                            >
                                                <Trash2 size={14} />
                                                <span>Delete Case</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, color, icon: Icon }) {
    const colors = {
        blue: 'text-blue-600 bg-blue-50 border-blue-100/50',
        amber: 'text-amber-600 bg-amber-50 border-amber-100/50',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100/50',
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-[#CFD7E7]/40 dark:border-slate-700 shadow-lg shadow-blue-900/[0.02] flex flex-col space-y-5 group hover:shadow-xl transition-all duration-300">
            <div className={`w-10 h-10 ${colors[color]} rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform`}>
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <div>
                <p className="text-[#4C669A] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
                <h4 className="text-3xl font-black text-[#0D121B] dark:text-white mt-1">{value}</h4>
            </div>
        </div>
    );
}

export default Dashboard;
