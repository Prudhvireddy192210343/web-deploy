import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronRight, X, Trash2, Edit2, MoreVertical, FileText, UserCircle, Zap, Microscope, Activity, CheckCircle2, Camera, Smile, Sparkles, Heart, Navigation, Layers, Shield, Settings, Cross, FileClock } from 'lucide-react';
import { useApp } from '../App';

const initialCases = [
    { id: '1024', name: 'John Doe', complaint: 'Full Mouth Rehabilitation', status: 'Active', date: '2h ago' },
    { id: '1025', name: 'Jane Smith', complaint: 'Orthodontic Consultation', status: 'Pending', date: '5h ago' },
    { id: '1026', name: 'Robert Brown', complaint: 'Dental Implant', status: 'Completed', date: '1d ago' },
    { id: '1027', name: 'Alice Wilson', complaint: 'Worn Teeth Treatment', status: 'Active', date: '2d ago' },
    { id: '1028', name: 'Michael Chen', complaint: 'Periodontal Review', status: 'Completed', date: '3d ago' },
];

function Cases() {
    const navigate = useNavigate();
    const { cases, deleteCase, updateCaseStatus, openEditModal } = useApp();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [activeMenu, setActiveMenu] = useState(null);
    const [expandedCaseId, setExpandedCaseId] = useState(null);

    const getSequenceForComplaint = (complaint) => {
        const c = (complaint || '').toLowerCase();
        if (c.includes('pain')) {
            return [
                { title: "Emergency Triage", desc: "Immediate pain relief and infection control.", color: "text-red-600 bg-red-50", icon: Zap },
                { title: "Diagnostic Imaging", desc: "CBCT and periapical radiographs.", color: "text-gray-600 bg-gray-50", icon: Microscope },
                { title: "Endodontics / Extraction", desc: "Vital therapy or atraumatic extraction.", color: "text-gray-600 bg-gray-50", icon: Activity },
                { title: "Definitive Restoration", desc: "Post-op healing and final placement.", color: "text-gray-600 bg-gray-50", icon: CheckCircle2 }
            ];
        } else if (c.includes('esthetic') || c.includes('poor')) {
            return [
                { title: "Digital Smile Design", desc: "2D/3D smile analysis and facial harmony.", color: "text-blue-600 bg-blue-50", icon: Camera },
                { title: "Mock-up & Trial", desc: "Intraoral preview of proposed smile.", color: "text-gray-600 bg-gray-50", icon: Smile },
                { title: "Esthetic Prep", desc: "Minimally invasive preparation.", color: "text-gray-600 bg-gray-50", icon: Sparkles },
                { title: "Final Bonding", desc: "Seat and cementation of definitive units.", color: "text-gray-600 bg-gray-50", icon: Heart }
            ];
        } else if (c.includes('worn')) {
            return [
                { title: "OVD Assessment", desc: "Evaluate vertical dimension of occlusion loss.", color: "text-amber-600 bg-amber-50", icon: Navigation },
                { title: "Provisional Overlay", desc: "Test new vertical dimension temporarily.", color: "text-gray-600 bg-gray-50", icon: Layers },
                { title: "Full Arch Reconstruction", desc: "Definitive crowns/onlays at new OVD.", color: "text-gray-600 bg-gray-50", icon: Settings },
                { title: "Final Delivery", desc: "Equilibration and final seating.", color: "text-gray-600 bg-gray-50", icon: CheckCircle2 }
            ];
        } else if (c.includes('chew') || c.includes('difficult')) {
            return [
                { title: "Occlusal Analysis", desc: "Detailed articulation and bite forces.", color: "text-emerald-600 bg-emerald-50", icon: Cross },
                { title: "TMJ Relining / Splint", desc: "De-program muscles and stabilize TMJ.", color: "text-gray-600 bg-gray-50", icon: Shield },
                { title: "Posterior Support", desc: "Rebuild posterior occlusion strategically.", color: "text-gray-600 bg-gray-50", icon: Layers },
                { title: "Final Equilibration", desc: "Ensure harmonious chewing forces.", color: "text-gray-600 bg-gray-50", icon: CheckCircle2 }
            ];
        } else {
            return [
                { title: "Initial Assessment", desc: "Comprehensive charting and diagnostics.", color: "text-blue-600 bg-blue-50", icon: FileClock },
                { title: "Disease Control", desc: "Caries control and initial therapy.", color: "text-gray-600 bg-gray-50", icon: Shield },
                { title: "Core Buildups", desc: "Foundational restorations.", color: "text-gray-600 bg-gray-50", icon: Layers },
                { title: "Prosthetic Delivery", desc: "Delivery and final adjustment.", color: "text-gray-600 bg-gray-50", icon: CheckCircle2 }
            ];
        }
    };

    const filteredCases = cases.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.id.includes(search) ||
            c.complaint.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || c.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-[#0D121B] dark:text-white tracking-tight">Cases</h1>
                <Link to="/dashboard/new-case" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all">
                    <Plus size={24} strokeWidth={3} />
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4C669A]/40 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search cases, IDs or patients..."
                    className="w-full h-14 pl-12 pr-12 bg-white dark:bg-slate-900 border border-[#CFD7E7]/40 dark:border-slate-800 shadow-sm focus:border-blue-600/30 focus:ring-4 focus:ring-blue-100/20 outline-none transition-all font-medium text-[#0D121B] dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {['All', 'Active', 'Pending', 'Completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${filter === f
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-white dark:bg-slate-900 border-[#CFD7E7]/40 dark:border-slate-800 text-[#4C669A] dark:text-gray-400 hover:border-blue-600/20 dark:hover:border-blue-900'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-[#CFD7E7]/30 dark:border-slate-800 shadow-2xl shadow-blue-950/[0.03] overflow-hidden">
                {filteredCases.length > 0 ? (
                    filteredCases.map((c, index) => (
                        <div key={c.id} className="group relative">
                            <div
                                onClick={() => setExpandedCaseId(expandedCaseId === c.id ? null : c.id)}
                                className={`p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-all ${index !== filteredCases.length - 1 && expandedCaseId !== c.id ? 'border-b border-gray-100/50 dark:border-slate-800/50' : ''}`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-100 transition-colors">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-bold text-[#0D121B] dark:text-white">{c.name}</h3>
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                                                c.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' :
                                                    'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                }`}>
                                                {c.status}
                                            </span>
                                        </div>
                                        <p className="text-[#4C669A] dark:text-gray-400 text-sm font-medium">{c.complaint}</p>
                                        <p className="text-[#4C669A]/40 text-[11px] font-bold tracking-widest uppercase">ID: {c.id} • {c.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === c.id ? null : c.id)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors text-gray-400"
                                    >
                                        <MoreVertical size={20} />
                                    </button>

                                    {activeMenu === c.id && (
                                        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl p-2 min-w-[200px] animate-in slide-in-from-right-2 duration-200">
                                            <button
                                                onClick={() => navigate('/dashboard/treatment-plan')}
                                                className="w-full text-left px-3 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center space-x-2"
                                            >
                                                <FileText size={16} />
                                                <span>View Summary Report</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    openEditModal(c);
                                                    setActiveMenu(null);
                                                }}
                                                className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#0D121B] dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center space-x-2"
                                            >
                                                <UserCircle size={16} />
                                                <span>Edit Details</span>
                                            </button>
                                            <div className="h-px bg-gray-100 dark:bg-slate-700 my-2"></div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 py-2">Change Status</div>
                                            {['Active', 'Pending', 'Completed'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => {
                                                        updateCaseStatus(c.id, status);
                                                        setActiveMenu(null);
                                                    }}
                                                    className="w-full text-left px-3 py-2 text-sm font-bold text-[#0D121B] dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                            <div className="h-px bg-gray-100 dark:bg-slate-700 my-2"></div>
                                            <button
                                                onClick={() => {
                                                    deleteCase(c.id);
                                                    setActiveMenu(null);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center justify-between"
                                            >
                                                <span>Delete Case</span>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Expandable Treatment Sequence */}
                            {expandedCaseId === c.id && (
                                <div className="bg-gray-50/80 dark:bg-[#080d15] border-t border-b border-gray-100 dark:border-slate-800/80 p-6 sm:p-8 animate-in slide-in-from-top-2 duration-300">
                                    <h4 className="text-[#0D121B] dark:text-white font-black uppercase tracking-widest text-[11px] opacity-60 mb-6">Generated Treatment Sequence</h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-2">
                                        {getSequenceForComplaint(c.complaint).map((seq, i) => {
                                            const SeqIcon = seq.icon;
                                            return (
                                                <div key={i} className="flex flex-col space-y-3 relative group/seq">
                                                    {/* Connecting Line (Desktop) */}
                                                    {i !== 3 && (
                                                        <div className="hidden sm:block absolute top-[28px] left-[56px] right-[-10px] h-0.5 bg-gradient-to-r from-gray-200 to-transparent dark:from-slate-700"></div>
                                                    )}

                                                    <div className={`w-14 h-14 rounded-[20px] shrink-0 border border-black/5 dark:border-white/5 flex items-center justify-center shadow-inner relative z-10 transition-transform duration-300 group-hover/seq:scale-110 ${seq.color} dark:bg-slate-800/80 dark:text-blue-400`}>
                                                        <SeqIcon size={24} strokeWidth={2.5} />
                                                    </div>

                                                    <div className="space-y-1 mt-2">
                                                        <h5 className="font-bold text-[#0D121B] dark:text-white text-sm">Step {i + 1}: {seq.title}</h5>
                                                        <p className="text-[12px] font-medium text-[#4C669A] dark:text-gray-400 max-w-[90%] leading-relaxed">{seq.desc}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={() => navigate('/dashboard/treatment-plan')}
                                            className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-full shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-transform"
                                        >
                                            Execute Full AI Analysis
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-20 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                            <Filter size={40} />
                        </div>
                        <div>
                            <p className="text-[#0D121B] font-bold">No cases found</p>
                            <p className="text-[#4C669A] text-sm">Try adjusting your search or filters</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cases;
