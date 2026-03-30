import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Sparkles, ShieldCheck, Zap, Activity, ChevronRight,
    ArrowRight, Phone, Mail, User, Info, CheckCircle2,
    Stethoscope, Microscope, BrainCircuit
} from 'lucide-react';

const Preloader = () => (
    <div className="fixed inset-0 z-[200] bg-[#051A2E] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">


        <div className="space-y-4 text-center">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase">FMR DentaAI</h2>
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
            </div>
            <p className="text-blue-200/50 text-xs font-black tracking-[0.2em] uppercase pt-2">Initializing Neural Engine</p>
        </div>
    </div>
);

function Landing() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Snappier load time
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Preloader />;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden transition-colors duration-500">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-black text-[#0D121B] dark:text-white tracking-tighter hover:scale-[1.02] transition-transform cursor-default">FMR DentaAI</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-10">
                        <a href="#features" className="text-lg font-black text-[#4C669A] dark:text-gray-400 hover:text-blue-600 transition-colors">Features</a>
                        <a href="#complaints" className="text-lg font-black text-[#4C669A] dark:text-gray-400 hover:text-blue-600 transition-colors">Chief Complaints</a>
                        <a href="#about" className="text-lg font-black text-[#4C669A] dark:text-gray-400 hover:text-blue-600 transition-colors">About</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/login')} className="hidden sm:block text-sm font-black text-blue-600 dark:text-blue-400 px-6 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">Sign In</button>
                        <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:scale-[1.05] transition-all active:scale-95">Sign Up</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10 animate-in slide-in-from-left-8 duration-1000">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                            <Sparkles className="text-blue-600" size={16} />
                            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">power your practice with AI-driven diagnostics</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-[#0D121B] dark:text-white tracking-tighter leading-[0.95]">
                            Precision AI <br /> for Digital <span className="text-blue-600">Rehabilitation</span>
                        </h1>
                        <p className="text-xl text-[#4C669A] dark:text-gray-400 font-medium leading-relaxed max-w-xl">
                            DentaAI empowers clinicians with automated diagnostics, functional analysis, and optimized treatment sequencing powered by neural clinical engines.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                            <button onClick={() => navigate('/signup')} className="w-full sm:w-auto px-10 h-16 bg-blue-600 text-white font-black text-lg rounded-[24px] shadow-2xl shadow-blue-600/30 flex items-center justify-center space-x-4 hover:scale-[1.02] transition-all">
                                <span>Start New Case</span>
                                <ArrowRight size={22} />
                            </button>
                            <div className="flex -space-x-3 items-center">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-sm">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="pl-6"><p className="text-sm font-black text-[#0D121B] dark:text-white">2.5k+ Clinicians</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="relative animate-in zoom-in duration-1000 delay-200">
                        <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-[120px] scale-110"></div>
                        <div className="relative rounded-[48px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 aspect-[4/3]">
                            <img src="/images/landing_hero.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-xl border border-white/20 p-6 rounded-3xl flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Zap size={24} /></div>
                                    <div>
                                        <p className="text-xs font-black text-white/60 uppercase">Real-Time Processing</p>
                                        <p className="text-lg font-black text-white">Full-Mouth Analysis</p>
                                    </div>
                                </div>
                                <div className="h-4 w-4 bg-emerald-500 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#F8F9FC] py-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    <StatItem label="Precision Rate" value="99.2%" icon={ShieldCheck} />
                    <StatItem label="Analysis Time" value="< 2.5s" icon={Zap} />
                    <StatItem label="Clinicians" value="2,540+" icon={User} />
                    <StatItem label="Cases Analyzed" value="120k+" icon={Activity} />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-5">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0D121B] tracking-tight">Advanced Diagnostic Stack</h2>
                        <p className="text-[#4C669A] font-medium max-w-2xl mx-auto text-lg leading-relaxed">Integrated clinical intelligence for every step of your restorative workflow.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureCard
                            title="Occlusal Stability"
                            desc="Automatic assessment of centric relation and occlusal contact points using 3D scan data."
                            icon={Zap}
                            color="blue"
                        />
                        <FeatureCard
                            title="VDO Engine"
                            desc="Precise vertical dimension calculations based on facial landmarks and clinical photography."
                            icon={BrainCircuit}
                            color="emerald"
                        />
                        <FeatureCard
                            title="Prognosis Pro"
                            desc="AI-driven status tracking for tooth structural integrity and periodontal health prognosis."
                            icon={Microscope}
                            color="purple"
                        />
                    </div>
                </div>
            </section>
            {/* Chief Complaints Section */}
            <section id="complaints" className="py-32 px-6 bg-[#F8F9FC] dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-5">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0D121B] dark:text-white tracking-tight">Chief Complaints of Rehabilitation</h2>
                        <p className="text-[#4C669A] dark:text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                            Full-mouth rehabilitation cases present complex challenges ranging from structural wear to functional collapse.<br />
                            Our systematic AI-driven approach ensures every clinical complaint is analyzed and mapped to a precise, predictable treatment sequence.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { title: "Pain", img: "/images/complaint_pain.png", desc: "Resolving acute and chronic dental discomfort." },
                            { title: "Poor Esthetics", img: "/images/complaint_esthetics.png", desc: "Smile design and cosmetic transformations." },
                            { title: "Worn Teeth", img: "/images/complaint_worn_teeth.png", desc: "Restoring vertical dimension and tooth structure." },
                            { title: "Difficulty Chewing", img: "/images/complaint_difficulty_chewing.png", desc: "Correcting functional and occlusal imbalances." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden border border-gray-100 dark:border-slate-700 shadow-xl hover:scale-[1.05] transition-all group">
                                <div className="h-48 overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-black text-[#0D121B] dark:text-white mb-3">{item.title}</h3>
                                    <p className="text-sm text-[#4C669A] dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-32">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-black text-[#0D121B] dark:text-white tracking-tighter leading-tight">Bridging Technology <br /> and Clinical Expertise</h2>
                            <p className="text-xl text-[#4C669A] dark:text-gray-400 font-medium leading-relaxed">
                                DentaAI is not just a tool; it's a clinical companion. We combine advanced neural networks with the rigorous principles of restorative dentistry to bring precision and predictability back to complex full-mouth cases.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={14} /></div>
                                    <span className="font-bold text-[#0D121B] dark:text-white text-lg">AI-Driven Diagnostics</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={14} /></div>
                                    <span className="font-bold text-[#0D121B] dark:text-white text-lg">Optimized Treatment Sequencing</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={14} /></div>
                                    <span className="font-bold text-[#0D121B] dark:text-white text-lg">Predictable Functional Outcomes</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-600/10 blur-3xl rounded-full"></div>
                            <img src="/images/about_ai.png" className="relative rounded-[40px] shadow-2xl border-4 border-white dark:border-slate-800" alt="Dental AI Technology" />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center flex-row-reverse">
                        <div className="relative order-2 lg:order-1">
                            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
                            <img src="/images/about_smile.png" className="relative rounded-[40px] shadow-2xl border-4 border-white dark:border-slate-800" alt="Smile Transformation" />
                        </div>
                        <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-5xl font-black text-[#0D121B] dark:text-white tracking-tighter leading-tight">Join Our Network</h2>
                            <p className="text-xl text-[#4C669A] dark:text-gray-400 font-medium leading-relaxed">
                                Empower your practice with AI-driven diagnostics and join the future of digital dentistry. Our systematic approach ensures every clinical case is analyzed with maximum precision.
                            </p>
                            <button onClick={() => navigate('/signup')} className="px-10 h-16 bg-[#0D121B] dark:bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StatItem({ label, value, icon: Icon }) {
    return (
        <div className="space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-md border border-gray-100"><Icon size={24} /></div>
            <div>
                <p className="text-lg text-[#4C669A] font-bold">{label}</p>
                <p className="text-3xl font-black text-[#0D121B]">{value}</p>
            </div>
        </div>
    );
}

function FeatureCard({ title, desc, icon: Icon, color }) {
    const colors = {
        blue: 'bg-blue-600 text-blue-600',
        emerald: 'bg-emerald-500 text-emerald-500',
        purple: 'bg-purple-500 text-purple-500'
    };

    return (
        <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-2xl shadow-blue-900/[0.02] hover:scale-[1.03] transition-all group space-y-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color].split(' ')[0]} bg-opacity-10 shadow-inner group-hover:scale-110 transition-transform`}>
                <Icon size={28} className={colors[color].split(' ')[1]} />
            </div>
            <h3 className="text-2xl font-black text-[#0D121B] tracking-tight">{title}</h3>
            <p className="text-[#4C669A] font-medium leading-relaxed">{desc}</p>

        </div>
    );
}

export default Landing;
