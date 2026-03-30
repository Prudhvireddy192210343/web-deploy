import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Shield, Moon, LogOut, ChevronRight, Check, Smile, X, Upload } from 'lucide-react';
import { useApp } from '../App';
import { apiCall } from '../services/api';

function Settings() {
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode, doctorName, notifications, clearNotifications } = useApp();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [editForm, setEditForm] = useState({ fullName: '', selectedSpecialty: '', clinicName: '', yearsOfExperience: '', profileImageUrl: '' });

    useEffect(() => {
        apiCall('/profile').then(data => {
            setProfile(data);
            setEditForm({
                fullName: data.fullName || '',
                selectedSpecialty: data.selectedSpecialty || '',
                clinicName: data.clinicName || '',
                yearsOfExperience: data.yearsOfExperience || '',
                profileImageUrl: data.profileImageUrl || ''
            });
        }).catch(err => console.error("Profile fetch error", err));
    }, []);

    const handleSaveProfile = async () => {
        try {
            const updated = await apiCall('/profile', {
                method: 'PUT',
                body: JSON.stringify(editForm)
            });
            setProfile(updated);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleImageUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setEditForm(prev => ({ ...prev, profileImageUrl: url }));

            try {
                const updated = await apiCall('/profile', {
                    method: 'PUT',
                    body: JSON.stringify({ ...editForm, profileImageUrl: url })
                });
                setProfile(updated);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    const sections = [
        {
            title: '',
            items: [
                { icon: User, label: 'Personal Information', color: 'bg-blue-50 text-blue-600', onClick: () => setIsEditing(true) },
                { icon: Bell, label: 'Notifications', color: 'bg-amber-50 text-amber-600', onClick: () => setShowNotifications(true) },
                { icon: Shield, label: 'Security & Password', color: 'bg-emerald-50 text-emerald-600', onClick: () => navigate('/update-password') },
            ],
        },
        {
            title: '',
            items: [
                { icon: Moon, label: 'Dark Mode', color: 'bg-indigo-50 text-indigo-600', isToggle: true, onClick: () => toggleDarkMode() },
            ],
        },
    ];

    if (isLoggingOut) {
        return (
            <div className="fixed inset-0 z-[100] bg-[#0D121B] flex flex-col items-center justify-center animate-in fade-in duration-500">
                <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 border-t-[6px] border-b-[6px] border-[#38bdf8] rounded-full animate-[spin_1.5s_linear_infinite]"></div>
                    <div className="absolute inset-2 border-l-[6px] border-r-[6px] border-[#a855f7] rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                    <Smile size={80} className="text-white animate-pulse z-10 drop-shadow-2xl" strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
                </div>
                <h2 className="mt-10 text-white font-black text-2xl tracking-[0.2em] animate-pulse drop-shadow-md">SECURELY LOGGING OUT</h2>
                <p className="mt-3 text-gray-400 font-medium tracking-wide">Protecting Patient Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-top-2 duration-500 relative">

            {/* Notifications Modal */}
            {showNotifications && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNotifications(false)}></div>
                    <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
                            <h3 className="text-xl font-black text-[#0D121B] dark:text-white">Recent Notifications</h3>
                            <div className="flex items-center space-x-3">
                                {notifications?.length > 0 && (
                                    <button onClick={clearNotifications} className="text-[12px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-full transition-colors uppercase tracking-wider">Clear All</button>
                                )}
                                <button onClick={() => setShowNotifications(false)} className="p-2 text-gray-400 hover:text-gray-600"><X size={20} /></button>
                            </div>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
                            {notifications?.length > 0 ? notifications.map(n => (
                                <div key={n.id} className="p-5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-bold text-[#0D121B] dark:text-white leading-tight pr-4">{n.title}</h4>
                                        <span className="text-[10px] text-gray-400 flex-shrink-0 font-bold bg-gray-50 dark:bg-slate-900 px-2 py-1 rounded-md">{n.time}</span>
                                    </div>
                                    <p className="text-sm text-[#4C669A] dark:text-gray-400 mt-2 font-medium leading-relaxed">{n.message}</p>
                                </div>
                            )) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
                                    <Bell size={48} className="text-gray-300 mb-4" />
                                    <p className="text-[#0D121B] dark:text-gray-300 font-bold">No new notifications.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
                    <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                            <h3 className="text-xl font-black text-[#0D121B] dark:text-white">Personal Information</h3>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[11px] font-black uppercase text-gray-400 pl-1 block mb-1">Full Name</label>
                                <input type="text" value={editForm.fullName} onChange={e => setEditForm({ ...editForm, fullName: e.target.value })} className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl outline-none font-bold text-[#0D121B] dark:text-white focus:border-blue-500 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase text-gray-400 pl-1 block mb-1">Specialty</label>
                                <select value={editForm.selectedSpecialty} onChange={e => setEditForm({ ...editForm, selectedSpecialty: e.target.value })} className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl outline-none font-bold text-[#0D121B] dark:text-white focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer">
                                    <option value="" disabled>Select Specialty</option>
                                    <option value="General Dentist">General Dentist</option>
                                    <option value="Prosthodontist">Prosthodontist</option>
                                    <option value="Orthodontist">Orthodontist</option>
                                    <option value="Periodontist">Periodontist</option>
                                    <option value="Endodontist">Endodontist</option>
                                    <option value="Oral Surgeon">Oral Surgeon</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase text-gray-400 pl-1 block mb-1">Clinic Name</label>
                                <input type="text" value={editForm.clinicName} onChange={e => setEditForm({ ...editForm, clinicName: e.target.value })} className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl outline-none font-bold text-[#0D121B] dark:text-white focus:border-blue-500 focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase text-gray-400 pl-1 block mb-1">Years of Experience</label>
                                <input type="text" value={editForm.yearsOfExperience} onChange={e => setEditForm({ ...editForm, yearsOfExperience: e.target.value })} className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl outline-none font-bold text-[#0D121B] dark:text-white focus:border-blue-500 focus:bg-white transition-all" />
                            </div>
                        </div>
                        <button onClick={handleSaveProfile} className="w-full h-14 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-600/20">Save Information</button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="px-1 text-center font-bold text-[#0D121B] dark:text-white text-2xl tracking-tight">Settings</div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 border border-[#CFD7E7]/40 dark:border-slate-800 shadow-2xl shadow-blue-900/[0.04] text-center space-y-5 mx-2">
                <div className="relative w-32 h-32 mx-auto">
                    <div className="w-full h-full bg-blue-50 dark:bg-blue-900/20 rounded-[36px] overflow-hidden flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner group">
                        {editForm.profileImageUrl ? (
                            <img src={editForm.profileImageUrl} className="w-full h-full object-cover" />
                        ) : (
                            <User size={48} strokeWidth={2.5} className="relative z-10 transition-transform group-hover:scale-110" />
                        )}
                        <div className="absolute inset-0 bg-blue-600/5 blur-xl group-hover:bg-blue-600/10 transition-colors"></div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-black text-[#0D121B] dark:text-white tracking-tight">Dr. {profile?.fullName || doctorName}</h2>
                    <p className="text-[#4C669A] dark:text-gray-400 font-medium text-[15px] mt-1">{profile?.selectedSpecialty || 'Senior Prosthodontist'}</p>
                </div>

                <label className="cursor-pointer px-6 py-2.5 mt-2 bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold rounded-full text-sm hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center space-x-2">
                    <Upload size={16} />
                    <span>Upload New Photo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {sections.map((section, sIndex) => (
                    <div key={sIndex} className="space-y-4">
                        {section.title && <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#4C669A]/50 px-6">{section.title}</h3>}
                        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-[#CFD7E7]/30 dark:border-slate-800 shadow-xl shadow-blue-950/[0.02] overflow-hidden">
                            {section.items.map((item, iIndex) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.label}
                                        onClick={item.onClick}
                                        className={`w-full flex items-center justify-between p-5 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-all cursor-[pointer] group ${iIndex !== section.items.length - 1 ? 'border-b border-gray-100/40 dark:border-slate-800' : ''}`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-11 h-11 ${item.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon size={20} />
                                            </div>
                                            <span className="font-bold text-[#0D121B] dark:text-white text-[15px]">{item.label}</span>
                                        </div>
                                        {item.isToggle ? (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}
                                                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </button>
                                        ) : (
                                            <ChevronRight size={18} className="text-[#CFD7E7] dark:text-gray-600 group-hover:translate-x-1 transition-all" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-3 p-5 rounded-[28px] bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold text-[15px] hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-red-100/50 dark:border-red-900/10 shadow-lg shadow-red-900/[0.02] transform active:scale-95 group mt-6"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Logout Account</span>
                </button>
            </div>

            <div className="text-center pb-8 opacity-20 hover:opacity-100 transition-opacity">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#4C669A]">FMR DentaAI v1.0.4</p>
            </div>
        </div>
    );
}

export default Settings;
