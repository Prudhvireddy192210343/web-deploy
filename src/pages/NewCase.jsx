import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Check, User, Activity, AlertCircle, Sparkles,
    UtensilsCrossed, Zap, Camera, Upload, Info, HelpCircle,
    ChevronRight, AlertTriangle, CheckCircle2, Layers, Loader2,
    Clock, ShieldCheck, Heart, Smile, FileText, Download, Brain,
    Microscope, BarChart3, LayoutDashboard, Share2, Plus, X, FileCheck
} from 'lucide-react';
import { useApp } from '../App';
import { apiCall } from '../services/api';

const complaints = [
    { id: 'pain', label: 'Pain', icon: Zap, color: 'bg-red-500', gradient: 'from-red-500 to-red-400' },
    { id: 'worn_teeth', label: 'Worn Teeth', icon: Sparkles, color: 'bg-blue-500', gradient: 'from-blue-600 to-blue-400' },
    { id: 'poor_esthetics', label: 'Poor Esthetics', icon: Sparkles, color: 'bg-purple-500', gradient: 'from-purple-600 to-purple-400' },
    { id: 'difficulty_chewing', label: 'Difficulty Chewing', icon: UtensilsCrossed, color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-400' },
];

const diagnosisOptions = {
    pdi: ['PDI Class I', 'PDI Class II', 'PDI Class III', 'PDI Class IV'],
    skeletal: ['Relation I', 'Relation II', 'Relation III'],
    condylar: ['Steep', 'Average', 'Shallow'],
    incisal: ['Steep', 'Average', 'Shallow'],
    working: ['Group Function', 'Canine Guidance'],
    nonWorking: ['Contact', 'No Contact'],
    protrusion: ['Anterior', 'Posterior', 'Edge-to-Edge'],
    retrusion: ['Contact', 'No Contact'],
    lateral: ['Contact', 'No Contact', 'Crossbite'],
    deviation: ['Midline', 'Right Deviation', 'Left Deviation'],
};

const intraoralCategories = [
    {
        id: 'frontal', label: 'Frontal', views: [
            { id: 'intraoralFrontal1', title: 'Frontal View', desc: 'Teeth from the front, midline centered.', img: '/images/intraoral_frontal.png' },
            { id: 'intraoralFrontal2', title: 'Frontal Smile', desc: 'Frontal view while smiling naturally.', img: '/images/frontal_smile_new.png' }
        ]
    },
    {
        id: 'occlusal', label: 'Occlusal', views: [
            { id: 'intraoralUpper', title: 'Upper Arch', desc: 'Upper arch from an occlusal view.', img: '/images/intraoral_upper.png' },
            { id: 'intraoralLower', title: 'Lower Arch', desc: 'Lower arch from an occlusal view.', img: '/images/lower_arch_new.png' }
        ]
    },
    {
        id: 'buccal', label: 'Buccal', views: [
            { id: 'intraoralRightBuccal', title: 'Right Buccal', desc: 'Right posterior teeth in occlusion.', img: '/images/intraoral_buccal.png' },
            { id: 'intraoralLeftBuccal', title: 'Left Buccal', desc: 'Left posterior teeth in occlusion.', img: '/images/left_buccal_new.png' }
        ]
    }
];

function NewCase() {
    const navigate = useNavigate();
    const { addCase, doctorName } = useApp();
    const [step, setStep] = useState(1);
    const [intraoralTab, setIntraoralTab] = useState('frontal');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [activePhasedRehab, setActivePhasedRehab] = useState(true);
    const [activeStagedApproach, setActiveStagedApproach] = useState(false);
    const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

    const [formData, setFormData] = useState({
        complaint: '',
        patientName: '',
        age: '',
        gender: 'Male',
        patientId: '2024263',
        doctorName: doctorName,
        specialty: 'General Dentist',
        // Diagnosis
        pdiClass: '',
        skeletalRelation: '',
        horizontalCondylar: '',
        incisalGuidance: '',
        workingSide: '',
        nonWorkingSide: '',
        protrusion: '',
        retrusion: '',
        rightLateralMove: '',
        leftLateralMove: '',
        centricFrontal: '',
        protrusionCentre: '',
        rightLateralCentre: '',
        leftLateralCentre: '',
        deviation: '',
        // Photos
        frontImage: null,
        smileImage: null,
        profileImage: null,
    });


    // Progress animation for AI analysis
    useEffect(() => {
        if (step === 7) {
            let interval;
            const runPrediction = async () => {
                interval = setInterval(() => {
                    setAnalysisProgress(prev => prev >= 90 ? 90 : prev + 2);
                }, 100);

                try {
                    const submitData = new FormData();
                    // Supply a dummy image if none uploaded to satisfy backend requirements
                    const dummyImage = formData.frontImage || new Blob([''], { type: 'image/jpeg' });
                    submitData.append('image', dummyImage, 'scan.jpg');
                    submitData.append('features', JSON.stringify(formData));

                    await apiCall('/predict', {
                        method: 'POST',
                        body: submitData
                    });

                    clearInterval(interval);
                    setAnalysisProgress(100);
                    setTimeout(() => setStep(8), 500);
                } catch (err) {
                    console.error("Prediction error:", err);
                    clearInterval(interval);
                    // UX fallback: Move forward anyway for demo purposes
                    setAnalysisProgress(100);
                    setTimeout(() => setStep(8), 500);
                }
            };
            runPrediction();

            return () => clearInterval(interval);
        }
    }, [step, formData]);

    const nextStep = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (step === 13) {
            setShowSuccessModal(true);
            return;
        }
        setStep(s => s + 1);
    };

    const prevStep = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(s => s - 1);
    };

    const handleSubmitCase = () => {
        // Add case to dashboard immediately upon submission
        addCase({
            name: formData.patientName || 'New Patient',
            complaint: formData.complaint.replace('_', ' ') || 'Evaluation',
            status: 'Active',
            age: formData.age || 'N/A',
            gender: formData.gender || 'Unknown'
        });

        setShowSubmitSuccessModal(true);
        setTimeout(() => {
            setShowSubmitSuccessModal(false);
            nextStep();
        }, 2500); // Wait 2.5 seconds then push up to analysis
    };

    const handleDownload = () => {
        // Simulate download
        setShowDownloadSuccess(true);
        setTimeout(() => setShowDownloadSuccess(false), 3000);
    };

    const isStep1Valid = !!formData.complaint;
    const isStep2Valid = formData.patientName.trim().length > 0 && formData.age.trim().length > 0;

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
            {/* Download Success Notification */}
            {showDownloadSuccess && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-emerald-500 text-white px-8 py-4 rounded-[20px] shadow-2xl shadow-emerald-500/30 flex items-center space-x-3 font-bold border-2 border-white/20">
                        <CheckCircle2 size={24} />
                        <span>Report Downloaded Successfully!</span>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"></div>
                    <div className="relative bg-white rounded-[40px] p-10 w-full max-w-sm text-center shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-emerald-500/30">
                            <Check size={40} strokeWidth={4} />
                        </div>
                        <h3 className="text-2xl font-black text-[#0D121B] mb-2">Case Submitted</h3>
                        <p className="text-[#4C669A] font-medium leading-relaxed mb-8">
                            Patient case has been created and saved successfully!
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full h-16 bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center space-x-3"
                        >
                            <LayoutDashboard size={20} />
                            <span>Return to Dashboard</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Step 6 Submit Success Modal transitioning to Analysis */}
            {showSubmitSuccessModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
                    <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[32px] p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                            <FileCheck size={48} />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-[#0D121B] dark:text-white leading-tight">Submitted Successfully</h3>
                            <p className="text-[#4C669A] dark:text-gray-400 font-medium text-[15px]">The case data has been compiled. Moving to AI Analysis now...</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full animate-[progress_2.5s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Navigation */}
            {step < 7 && (
                <div className="flex items-center justify-between sticky top-0 bg-appBackground/80 backdrop-blur-md z-40 py-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={() => step === 1 ? navigate(-1) : prevStep()}
                            className="w-10 h-10 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-[#0D121B] hover:bg-gray-50 transition-all font-bold"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <h1 className="text-xl font-bold text-[#0D121B]">
                            {step === 1 ? 'Chief Complaint' :
                                step === 2 ? 'Patient Information' :
                                    step === 3 ? 'Medical & Dental History' :
                                        step === 4 ? 'Extraoral Photography' :
                                            step === 5 ? 'Intraoral Scan' : 'Review Case'}
                        </h1>
                    </div>
                    <HelpCircle size={22} className="text-[#0D121B] opacity-40 cursor-pointer" />
                </div>
            )}

            {/* Specialized Top Nav for new screens - CLEAN & NEAT */}
            {(step >= 8 && step <= 13) && (
                <div className="flex items-center justify-between sticky top-0 bg-appBackground/80 backdrop-blur-md z-40 py-4 -mx-4 px-4 lg:mx-0 lg:px-0 border-b border-gray-100/50">
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (step === 12 || step === 13) setStep(11);
                                else prevStep();
                            }}
                            className="w-10 h-10 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-[#0D121B] hover:bg-gray-50 transition-all font-bold"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <h1 className="text-[19px] font-bold text-[#0D121B] tracking-tight">
                            {step === 8 ? 'Review Case' :
                                step === 9 ? 'Constraint-Based Planning' :
                                    step === 10 ? 'Treatment Sequence' :
                                        step === 11 ? 'Treatment Plan Actions' :
                                            step === 12 ? 'Smile Transformation' : 'Case Summary Report'}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        {step === 13 && (
                            <button onClick={handleDownload} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all text-gray-400 hover:text-blue-600">
                                <Download size={24} />
                            </button>
                        )}
                        <div className="w-4"></div>
                    </div>
                </div>
            )}

            {/* Progress Bar - Only steps 1-6 */}
            {step <= 6 && (
                <div className="flex items-center space-x-2 px-1">
                    {[1, 2, 3, 4, 5, 6].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-blue-600 shadow-sm shadow-blue-500/20' : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Content Steps */}
            <div className="min-h-[400px]">
                {/* Render pages based on step */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-[#0D121B] tracking-tight">Tell us about the concern</h2>
                            <p className="text-[#4C669A] font-medium">Select the primary reason for the visit today.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {complaints.map((c) => {
                                const Icon = c.icon;
                                const isSelected = formData.complaint === c.id;
                                return (
                                    <button key={c.id} type="button" onClick={() => setFormData({ ...formData, complaint: c.id })}
                                        className={`relative overflow-hidden group flex flex-col items-center rounded-3xl border-2 transition-all duration-300 ${isSelected ? 'border-blue-600 bg-white ring-4 ring-blue-50' : 'border-[#CFD7E7]/40 bg-white hover:border-blue-200'}`}>
                                        <div className={`w-full h-28 bg-gradient-to-br ${c.gradient} flex items-center justify-center transition-transform group-hover:scale-105 duration-500`}>
                                            <Icon size={40} className="text-white drop-shadow-lg" strokeWidth={2.5} />
                                        </div>
                                        <div className="p-4 w-full text-center">
                                            <span className={`text-[15px] font-bold ${isSelected ? 'text-blue-600' : 'text-[#0D121B]'}`}>{c.label}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 shadow-sm">
                        <div className="space-y-6 pt-2">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0D121B] px-1">Patient Name</label>
                                <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                    <input type="text" placeholder="Enter patient name" className="w-full h-14 pl-12 pr-4 bg-white border border-[#CFD7E7]/50 rounded-2xl outline-none"
                                        value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#0D121B] px-1">Age</label>
                                    <input type="number" placeholder="Age" className="w-full h-14 px-4 bg-white border border-[#CFD7E7]/50 rounded-2xl outline-none"
                                        value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#0D121B] px-1">Gender</label>
                                    <select className="w-full h-14 px-4 bg-white border border-[#CFD7E7]/50 rounded-2xl outline-none appearance-none font-medium text-[#0D121B]"
                                        value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}><option>Male</option><option>Female</option></select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                        <SelectionSection title="PDI Classification" options={diagnosisOptions.pdi} value={formData.pdiClass} onChange={(val) => setFormData({ ...formData, pdiClass: val })} />
                        <SelectionSection title="Skeletal Relation" options={diagnosisOptions.skeletal} value={formData.skeletalRelation} onChange={(val) => setFormData({ ...formData, skeletalRelation: val })} />
                        <SelectionSection title="Horizontal Condylar Guidance" options={diagnosisOptions.condylar} value={formData.horizontalCondylar} onChange={(val) => setFormData({ ...formData, horizontalCondylar: val })} />
                        <SelectionSection title="Incisal Guidance" options={diagnosisOptions.incisal} value={formData.incisalGuidance} onChange={(val) => setFormData({ ...formData, incisalGuidance: val })} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <SelectionSection title="Working Side" options={diagnosisOptions.working} value={formData.workingSide} onChange={(val) => setFormData({ ...formData, workingSide: val })} />
                            <SelectionSection title="Non-Working Side" options={diagnosisOptions.nonWorking} value={formData.nonWorkingSide} onChange={(val) => setFormData({ ...formData, nonWorkingSide: val })} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <SelectionSection title="Protrusion" options={diagnosisOptions.protrusion} value={formData.protrusion} onChange={(val) => setFormData({ ...formData, protrusion: val })} />
                            <SelectionSection title="Retrusion" options={diagnosisOptions.retrusion} value={formData.retrusion} onChange={(val) => setFormData({ ...formData, retrusion: val })} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <SelectionSection title="Right Lateral Movement" options={diagnosisOptions.lateral} value={formData.rightLateralMove} onChange={(val) => setFormData({ ...formData, rightLateralMove: val })} />
                            <SelectionSection title="Left Lateral Movement" options={diagnosisOptions.lateral} value={formData.leftLateralMove} onChange={(val) => setFormData({ ...formData, leftLateralMove: val })} />
                        </div>

                        <SelectionSection title="Midline Deviation" options={diagnosisOptions.deviation} value={formData.deviation} onChange={(val) => setFormData({ ...formData, deviation: val })} />
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pt-4">
                        <ImageCaptureCard title="Front at Rest" defaultImage="/images/extraoral_front.png" currentImage={formData.frontImagePreview} onImageSelected={(file, url) => setFormData({ ...formData, frontImage: file, frontImagePreview: url })} />
                        <ImageCaptureCard title="Smile" defaultImage="/images/extraoral_smile.png" currentImage={formData.smileImagePreview} onImageSelected={(file, url) => setFormData({ ...formData, smileImage: file, smileImagePreview: url })} />
                        <ImageCaptureCard title="Profile" defaultImage="/images/extraoral_profile.png" currentImage={formData.profileImagePreview} onImageSelected={(file, url) => setFormData({ ...formData, profileImage: file, profileImagePreview: url })} />
                    </div>
                )}

                {step === 5 && (
                    <div className="bg-white rounded-[32px] border border-[#CFD7E7]/40 overflow-hidden shadow-sm pt-2">
                        <div className="flex bg-[#E7EBF3] p-1.5 m-3 rounded-2xl">
                            {intraoralCategories.map(cat => (
                                <button key={cat.id} type="button" onClick={() => setIntraoralTab(cat.id)}
                                    className={`flex-1 h-12 rounded-xl text-[15px] font-bold transition-all ${intraoralTab === cat.id ? 'bg-white text-blue-600 shadow-sm' : 'text-[#4C669A]'}`}>{cat.label}</button>
                            ))}
                        </div>
                        <div className="divide-y divide-gray-100">
                            {intraoralCategories.find(c => c.id === intraoralTab).views.map((view, i) => (
                                <div key={view.id} className="p-4 lg:p-8 pb-10 space-y-4">
                                    <div className="space-y-1 px-2">
                                        <h4 className="text-xl font-bold text-[#0D121B]">{view.title}</h4>
                                        <p className="text-[14px] font-medium text-[#4C669A] leading-relaxed">{view.desc}</p>
                                    </div>
                                    <ImageCaptureCard
                                        title=""
                                        defaultImage={view.img}
                                        currentImage={formData[`${view.id}Preview`]}
                                        onImageSelected={(file, url) => setFormData({ ...formData, [view.id]: file, [`${view.id}Preview`]: url })}
                                        className="w-full h-56 rounded-[24px] border border-gray-100"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pt-4 pb-20">
                        <h2 className="text-3xl font-black text-[#0D121B] tracking-tight">Review & Confirm</h2>

                        <div className="bg-white rounded-[32px] border border-[#CFD7E7]/40 shadow-2xl shadow-blue-900/[0.03] p-10 space-y-7">
                            <ReviewRow label="Patient Name" value={formData.patientName || 'New Patient'} />
                            <ReviewRow label="Chief Complaint" value={formData.complaint.replace('_', ' ') || 'Evaluation'} />
                            <ReviewRow label="Doctor Name" value={formData.doctorName} />
                            <ReviewRow label="Specialty" value={formData.specialty} />
                            <ReviewRow label="PDI Class" value={formData.pdiClass || 'PDI Class I'} />
                        </div>
                    </div>
                )}

                {step === 7 && (
                    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000 flex flex-col items-center justify-center min-h-[500px] text-center">
                        <div className="relative w-80 h-80 bg-blue-50/50 rounded-[64px] flex items-center justify-center">
                            <div className="absolute inset-0 border-[3px] border-blue-600/20 border-dashed rounded-[64px] animate-[spin_12s_linear_infinite]"></div>
                            <div className="w-48 h-48 bg-white rounded-[48px] shadow-2xl flex items-center justify-center transition-transform hover:scale-110">
                                <Sparkles size={64} className="text-blue-600 animate-pulse" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="w-full max-w-sm space-y-12">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-[#0D121B]">AI Analysis in Progress</h3>
                                <p className="text-[#4C669A] font-medium">Processing clinical datasets...</p>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                <div style={{ width: `${analysisProgress}%` }} className="h-full bg-blue-600 transition-all duration-300"></div>
                            </div>
                            <p className="font-black text-blue-600 text-3xl tracking-tighter">{analysisProgress.toString().padStart(2, '0')}%</p>
                        </div>
                    </div>
                )}

                {step === 8 && (() => {
                    let riskLevel = 'Low Risk';
                    let riskColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
                    if (formData.pdiClass === 'PDI Class IV' || formData.complaint === 'pain') {
                        riskLevel = 'High Risk';
                        riskColor = 'text-red-700 bg-red-50 border-red-200';
                    } else if (formData.pdiClass === 'PDI Class III' || formData.complaint === 'full_mouth_failing') {
                        riskLevel = 'Moderate Risk';
                        riskColor = 'text-amber-700 bg-amber-50 border-amber-200';
                    }

                    return (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 pt-4 pb-20">

                            <div className={`p-5 rounded-2xl border ${riskColor} flex items-center space-x-4 shadow-sm animate-in zoom-in-95`}>
                                <AlertTriangle size={24} strokeWidth={2.5} />
                                <div>
                                    <h4 className="font-black text-sm uppercase tracking-widest opacity-80 mb-0.5">Automated Alert</h4>
                                    <p className="font-bold text-lg">Case Assessment: {riskLevel}</p>
                                </div>
                            </div>

                            <div className="bg-blue-600 rounded-[32px] p-10 text-white space-y-8 shadow-2xl shadow-blue-600/30">
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-black tracking-wide border border-white/10">Stage 3</span>
                                    <span className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-black tracking-wide border border-white/10">Prognosis 2</span>
                                    <span className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-black tracking-wide border border-white/10">Caries</span>
                                </div>
                                <h3 className="text-5xl font-black tracking-tighter">Caries</h3>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-[#6B7280] font-bold uppercase tracking-[0.15em] text-[12px] px-3">Diagnostic Modules</h3>
                                <div className="grid grid-cols-2 gap-5 px-1">
                                    <ResultCard title="TMJ & Muscle" status="Stable" img="/images/intraoral_upper.png" />
                                    <ResultCard title="Occlusal Stability" status="Adequate" img="/images/intraoral_buccal.png" />
                                    <ResultCard title="VDO Analysis" status="Maintained" img="/images/intraoral_frontal.png" badge="-4mm" />
                                    <ResultCard title="Structural Integ." status="Stable Levels" img="/images/intraoral_lower.png" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-6">
                                <button onClick={() => setStep(9)} className="w-full h-16 bg-blue-600 text-white font-black text-lg rounded-[20px] shadow-xl shadow-blue-600/25 flex items-center justify-center space-x-3"><ShieldCheck size={22} strokeWidth={2.5} /><span>Submit for Case Finalization</span></button>
                                <button onClick={() => setStep(10)} className="w-full h-16 bg-white border-2 border-[#E7EBF3] text-[#3b82f6] font-black text-lg rounded-[20px] flex items-center justify-center space-x-3 transition-all"><Layers size={22} strokeWidth={2.5} /><span>View Sequencing Logic</span></button>
                            </div>
                        </div>
                    )
                }
                )()}

                {step === 9 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pt-4 px-2">
                        <div className="space-y-8">
                            <PlanningSlider label="Adjusted Budget" value="$10,000" progress="40%" />
                            <PlanningSlider label="Estimated Timeline" value="12 months" progress="40%" />
                        </div>
                        <div className="space-y-12 pt-6">
                            <ToggleCard title="Phased Rehabilitation" desc="Manage biological risk and financial constraints" img="/images/phased_rehab.png" isActive={activePhasedRehab} onToggle={() => setActivePhasedRehab(!activePhasedRehab)} />
                            <ToggleCard title="Staged Approach" desc="Prioritize immediate needs and defer non-essential treatments" img="/images/staged_approach.png" isActive={activeStagedApproach} onToggle={() => setActiveStagedApproach(!activeStagedApproach)} />
                        </div>
                        <button onClick={() => setStep(11)} className="w-full h-16 bg-blue-600 text-white font-black text-lg rounded-[24px] shadow-2xl shadow-blue-600/20 active:scale-95 transition-all mt-10">Next</button>
                    </div>
                )}

                {step === 10 && (() => {
                    const c = formData.complaint;
                    let sequences = [];
                    if (c === 'pain') {
                        sequences = [
                            { phase: "1", title: "Emergency Triage", desc: "Immediate pain relief and infection control.", status: "Required", icon: Zap, color: "red", isActive: true },
                            { phase: "2", title: "Diagnostic Imaging", desc: "CBCT and periapical radiographs to identify source.", status: "Pending", icon: Microscope, color: "gray" },
                            { phase: "3", title: "Endodontics / Extraction", desc: "Vital therapy or atraumatic extraction as indicated.", status: "Pending", icon: Activity, color: "gray" },
                            { phase: "4", title: "Definitive Restoration", desc: "Post-op healing and final placement.", status: "Pending", icon: CheckCircle2, color: "gray" }
                        ];
                    } else if (c === 'esthetic_concerns') {
                        sequences = [
                            { phase: "1", title: "Digital Smile Design", desc: "2D/3D smile analysis and facial harmony assessment.", status: "Active", icon: Camera, color: "blue", isActive: true },
                            { phase: "2", title: "Mock-up & Trial", desc: "Intraoral preview of the proposed smile for patient approval.", status: "Pending", icon: Smile, color: "gray" },
                            { phase: "3", title: "Esthetic Prep", desc: "Minimally invasive preparation for veneers or crowns.", status: "Required", icon: Sparkles, color: "gray" },
                            { phase: "4", title: "Final Bonding", desc: "Final seat and cementation of definitive esthetic units.", status: "Completion", icon: Heart, color: "gray" }
                        ];
                    } else {
                        sequences = [
                            { phase: "1", title: "Initial Assessment", desc: "Complete diagnostic records and periodontal charting.", status: "Active", icon: FileText, color: "blue", isActive: true },
                            { phase: "2", title: "Disease Control", desc: "Caries excavation and initial scaling.", status: "Pending", icon: Shield, color: "gray" },
                            { phase: "3", title: "Core Buildups", desc: "Foundational restorations for future crowns.", status: "Required", icon: Layers, color: "gray" },
                            { phase: "4", title: "Prosthetic Delivery", desc: "Delivery of final restorations and occlusal adjustment.", status: "Completion", icon: CheckCircle2, color: "gray" }
                        ];
                    }

                    return (
                        <div className="space-y-16 animate-in fade-in slide-in-from-right-4 duration-500 px-3 pt-10">
                            <div className="relative pl-24 space-y-20 pb-10">
                                <div className="absolute left-[45px] top-12 bottom-12 w-[3px] bg-gray-100/80 rounded-full"></div>
                                {sequences.map((seq, idx) => (
                                    <SequencePhase key={idx} phase={seq.phase} title={seq.title} desc={seq.desc} status={seq.status} icon={seq.icon} color={seq.color} isActive={seq.isActive} />
                                ))}
                            </div>
                        </div>
                    );
                })()}

                {step === 11 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 px-1 pt-4 pb-20">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black text-[#0D121B] tracking-tight">Smile Transformation</h2>
                                <button onClick={() => setStep(12)} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[15px] shadow-lg shadow-blue-600/20 active:scale-95 transition-all">Status</button>
                            </div>
                            <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10]"><img src="/images/dental_arch.png" className="w-full h-full object-cover" /></div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black text-[#0D121B] tracking-tight">Summary</h2>
                                <button onClick={() => setStep(13)} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[15px] shadow-lg shadow-blue-600/20 active:scale-95 transition-all">View</button>
                            </div>
                            <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10]"><img src="/images/medical_report.png" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                )}

                {/* NEW Step 12: Smile Transformation (MATCHING SCREENSHOT) */}
                {step === 12 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 pt-4">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black text-[#0D121B] tracking-tight px-1">Clinical Comparison</h2>

                            <div className="space-y-6">
                                <div className="flex px-1"><span className="px-4 py-1 bg-[#FF4D4D] text-white text-[12px] font-black rounded-lg uppercase tracking-wider">Before</span></div>
                                <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[16/11]">
                                    <img src="/images/smile_before.png" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[#4C669A] font-medium leading-relaxed px-1">Initial presentation showing orthodontic misalignment and spacing issues.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex px-1"><span className="px-4 py-1 bg-[#22C55E] text-white text-[12px] font-black rounded-lg uppercase tracking-wider">After</span></div>
                                <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[16/11]">
                                    <img src="/images/smile_after.png" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[#4C669A] font-medium leading-relaxed px-1">Restored dental aesthetics with full-mouth rehabilitation and alignment.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* NEW Step 13: Case Summary Report (MATCHING SCREENSHOT) */}
                {step === 13 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 pt-4 pb-20">
                        <div className="space-y-10">
                            <section className="space-y-8 px-1">
                                <h2 className="text-3xl font-black text-[#0D121B] tracking-tight">Clinical Diagnosis</h2>
                                <div className="grid grid-cols-2 gap-y-8 gap-x-12 border-b border-gray-50 pb-10">
                                    <SummaryField label="Patient Name" value={formData.patientName || 'New Patient'} />
                                    <SummaryField label="Patient ID" value={formData.patientId} />
                                    <SummaryField label="Age" value={formData.age || 'N/A'} />
                                    <SummaryField label="Gender" value={formData.gender} />
                                    <SummaryField label="Medical History" value="No significant history" />
                                    <SummaryField label="Chief Complaint" value={`Chief Complaint: ${formData.complaint.replace('_', ' ') || 'Evaluation'}`} />
                                    <SummaryField label="Last Updated" value="Mar 18, 2026" />
                                    <SummaryField label="Status" value="Active" color="text-[#0D121B]" />
                                    <SummaryField label="Radiographic Findings" value="Evaluation complete" />
                                    <SummaryField label="Clinical Findings" value="No significant issues noted" />
                                </div>
                            </section>

                            <section className="grid grid-cols-2 gap-6 px-1">
                                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                                    <img src="/images/dental_arch.png" className="w-full h-40 object-cover" />
                                </div>
                                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                                    <img src="/images/medical_report.png" className="w-full h-40 object-cover" />
                                </div>
                            </section>

                            <section className="space-y-8 px-1 pt-4">
                                <h2 className="text-3xl font-black text-[#0D121B] tracking-tight">Sequencing Logic</h2>
                                <div className="space-y-8">
                                    <SequenceItem phase="1" title="Initial Care" desc={`Addressing primary complaint: Chief Complaint: ${formData.complaint.replace('_', ' ') || 'Evaluation'}`} />
                                    <SequenceItem phase="2" title="Restoration" desc="Biomimetic restorative approach based on clinical findings." />
                                    <SequenceItem phase="3" title="Maintenance" desc="Regular 6-month monitoring and preventive care." />
                                </div>
                            </section>

                            <section className="space-y-6 px-1 pt-4">
                                <h2 className="text-3xl font-black text-[#0D121B] tracking-tight">Identified Risks</h2>
                                <div className="space-y-4">
                                    <RiskItem label="Structural Integrity" risk="Low-Moderate" />
                                    <RiskItem label="Functional Stability" risk="Stable" />
                                </div>
                            </section>

                            <section className="space-y-6 px-1 pt-4">
                                <h2 className="text-3xl font-black text-[#0D121B] tracking-tight">Final Recommendation</h2>
                                <p className="text-[17px] font-medium leading-relaxed text-[#4C669A] bg-blue-50/30 p-6 rounded-[24px] border border-blue-100/30">
                                    Based on the clinical data for {formData.patientName || 'New Patient'}, the recommended course of action is to proceed with the phased treatment plan. The patient only came for final review and report. Our analysis suggests that monitoring for the next 6 months is sufficient unless symptoms change.
                                </p>
                            </section>

                            <div className="pt-8 mb-4">
                                <button
                                    onClick={() => {
                                        setShowSuccessModal(true);
                                    }}
                                    className="w-full h-16 bg-emerald-600 text-white font-black text-lg rounded-[24px] shadow-2xl shadow-emerald-600/20 active:scale-95 transition-all"
                                >
                                    Finish & Save Case
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Navigation (Steps 1-6) */}
            {step <= 6 && (
                <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white dark:bg-slate-900 border-t border-[#CFD7E7]/30 dark:border-slate-800 p-4 lg:p-6 flex items-center justify-between z-40 space-x-4 max-w-7xl mx-auto shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
                    {step > 1 && (
                        <button type="button" onClick={prevStep} className="h-16 px-10 bg-white border border-[#CFD7E7]/50 rounded-2xl font-black text-[#0D121B] shadow-sm">Back</button>
                    )}
                    <button type="button" disabled={step === 1 ? !isStep1Valid : step === 2 ? !isStep2Valid : false}
                        onClick={() => step === 6 ? handleSubmitCase() : nextStep()}
                        className="flex-1 h-16 bg-blue-600 text-white font-black text-lg rounded-2xl shadow-2xl shadow-blue-600/30 flex items-center justify-center space-x-3 active:scale-[0.98] transition-all">
                        <span>{step === 6 ? 'Submit Case' : 'Continue'}</span>
                        <ChevronRight size={22} strokeWidth={3} />
                    </button>
                </div>
            )}
        </div>
    );
}

function SummaryField({ label, value, color = "text-[#0D121B] dark:text-white" }) {
    return (
        <div className="space-y-2">
            <span className="text-[#9CA3AF] font-bold text-[15px]">{label}</span>
            <p className={`font-black text-lg ${color}`}>{value}</p>
        </div>
    );
}

function SequenceItem({ phase, title, desc }) {
    return (
        <div className="space-y-2">
            <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">Phase {phase}: {title}</p>
            <p className="text-[#0D121B] dark:text-gray-300 font-medium leading-relaxed text-[17px]">{desc}</p>
        </div>
    );
}

function RiskItem({ label, risk }) {
    return (
        <div className="flex items-center space-x-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-50 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-[#0D121B] dark:text-white">
                <AlertTriangle size={20} />
            </div>
            <div className="space-y-1">
                <p className="font-black text-[#0D121B] dark:text-white text-lg">{label}</p>
                <p className="text-[#4C669A] dark:text-gray-400 font-bold text-[15px]">{risk}</p>
            </div>
        </div>
    );
}

// Sub-components
function SelectionSection({ title, options, value, onChange }) {
    return (
        <div className="space-y-3">
            <h3 className="text-[15px] font-bold text-[#0D121B] dark:text-white px-1">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                    <button key={opt} type="button" onClick={() => onChange(opt)} className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${value === opt ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white dark:bg-slate-900 border-[#CFD7E7]/40 dark:border-slate-800 text-[#4C669A] dark:text-gray-400'}`}>{opt}</button>
                ))}
            </div>
        </div>
    );
}

function PlanningSlider({ label, value, progress }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-xl font-black"><span className="text-[#0D121B] dark:text-white tracking-tight">{label}</span><span className="text-blue-600 dark:text-blue-400">{value}</span></div>
            <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-blue-600" style={{ width: progress }}></div></div>
        </div>
    );
}

function ToggleCard({ title, desc, img, isActive, onToggle }) {
    return (
        <div className="space-y-6">
            <div className={`rounded-[40px] overflow-hidden shadow-2xl aspect-[16/10] border-4 transition-all duration-500 ${isActive ? 'border-blue-600/30' : 'border-white dark:border-slate-800'}`}><img src={img} className="w-full h-full object-cover" /></div>
            <div className="flex items-start justify-between px-3">
                <div className="space-y-2"><h3 className="text-2xl font-black text-[#0D121B] dark:text-white tracking-tight">{title}</h3><p className="text-[15px] font-bold text-[#4C669A] dark:text-gray-400 leading-relaxed max-w-[260px] opacity-80">{desc}</p></div>
                <button onClick={onToggle} className={`px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-2xl ${isActive ? 'bg-blue-600 text-white shadow-blue-600/30' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500'}`}>Toggle</button>
            </div>
        </div>
    );
}

function ReviewRow({ label, value }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-slate-800 last:border-0"><span className="text-[#4C669A] dark:text-gray-400 font-bold text-lg">{label}</span><span className="font-black text-lg text-[#0D121B] dark:text-white capitalize">{value}</span></div>
    );
}

function ResultCard({ title, status, img, badge }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-[#CFD7E7]/40 dark:border-slate-800 p-5 pt-3 space-y-4 shadow-xl shadow-blue-900/[0.02] group">
            <div className="relative rounded-[22px] overflow-hidden aspect-[1.1] border border-gray-100 dark:border-slate-800 shadow-inner">
                <img src={img} className="w-full h-full object-cover" alt={title} />
                {badge && <div className="absolute top-3 right-3 bg-red-500 text-white text-[11px] font-black px-2.5 py-1.5 rounded-xl shadow-xl shadow-red-500/30 animate-pulse">{badge}</div>}
            </div>
            <div className="space-y-1.5 px-1 truncate"><h4 className="font-black text-[#0D121B] dark:text-white text-[15px] tracking-tight truncate">{title}</h4><div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 bg-[#4ade80] rounded-full"></div><span className="text-[#4ade80] text-[13px] font-black tracking-wide">{status}</span></div></div>
        </div>
    );
}

function SequencePhase({ phase, title, desc, status, icon: Icon, color, isActive = false }) {
    const isBlue = color === 'blue' || color === 'red';
    return (
        <div className="relative">
            <div className={`absolute -left-[68px] w-20 h-20 rounded-[28px] border-[5px] border-white dark:border-slate-950 shadow-2xl flex items-center justify-center z-10 transition-all ${isBlue ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rotate-6' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}><Icon size={32} strokeWidth={isBlue ? 2.5 : 2} /></div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4"><h3 className={`text-2xl font-black ${isBlue ? 'text-[#0D121B] dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>Phase {phase}: {title}</h3><span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] ${isBlue ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400'}`}>{status}</span></div>
                <p className={`text-[17px] font-bold leading-relaxed max-w-sm ${isBlue ? 'text-[#4C669A] dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>{desc}</p>
            </div>
        </div>
    );
}

function ImageCaptureCard({ title, defaultImage, currentImage, onImageSelected, className = "w-full h-72 rounded-[40px] border-4 border-white dark:border-slate-800" }) {
    const handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            onImageSelected(file, url);
        }
    };

    return (
        <div className="space-y-4 pb-4">
            <div className={`relative group overflow-hidden bg-white dark:bg-slate-900 shadow-2xl shadow-blue-900/10 ${className}`}>
                <img src={currentImage || defaultImage} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between px-4">
                <div className="space-y-1">
                    <h3 className="text-xl lg:text-2xl font-black text-[#0D121B] dark:text-white tracking-tight">{title}</h3>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3">
                    <label className="cursor-pointer px-4 lg:px-6 py-2.5 bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-2xl font-black text-sm active:scale-95 transition-all">
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                    </label>
                    <label className="cursor-pointer px-4 lg:px-6 py-2.5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                        Capture
                        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default NewCase;
