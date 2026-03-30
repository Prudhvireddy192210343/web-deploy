import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import NewCase from './pages/NewCase';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Landing from './pages/Landing';
import Layout from './components/Layout';
import { X, UserCircle } from 'lucide-react';
import { apiCall } from './services/api';
import './index.css';

// Placeholder for Treatment Plan Actions
const TreatmentPlan = () => (
  <div className="p-8 text-center space-y-4">
    <h1 className="text-2xl font-black text-[#0D121B] dark:text-white">Treatment Plan Actions</h1>
    <p className="text-[#4C669A] dark:text-gray-400 font-medium">This is where specific clinical protocols and sequences will be displayed.</p>
  </div>
);

// Auth Context/Mockup
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('fmr-user-id');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// App Context for Global State
export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function App() {
  // Current User State
  const [doctorName, setDoctorName] = useState(() => {
    return localStorage.getItem('fmr-doctor-name') || 'Prudhvi';
  });

  useEffect(() => {
    localStorage.setItem('fmr-doctor-name', doctorName);
  }, [doctorName]);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fmr-dark-mode');
    return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('fmr-dark-mode', isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Logout Function
  const logout = () => {
    localStorage.removeItem('fmr-user-id');
    localStorage.removeItem('fmr-doctor-name');
    window.location.href = '/login';
  };

  // Cases State
  const [cases, setCases] = useState([]);

  // Notifications State
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const caseData = await apiCall('/cases');
        setCases(caseData.map(c => ({
          ...c,
          id: c.id.toString(),
          name: c.patientName,
          complaint: c.chiefComplaint,
          age: c.patientAge,
          gender: c.patientGender,
          date: c.createdDate || c.lastUpdated || 'Just Now'
        })));

        const notifData = await apiCall('/notifications');
        setNotifications(notifData.map(n => ({
          id: n.id,
          title: n.title,
          message: n.message,
          time: n.timestamp,
          read: !n.isNew
        })));
      } catch (err) {
        console.error("Failed to fetch from backend", err);
      }
    };
    fetchInitialData();
  }, []);

  // Editing state for the global modal
  const [editingCase, setEditingCase] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', age: '', gender: '' });

  const openEditModal = (c) => {
    setEditingCase(c);
    setEditForm({ name: c.name, age: c.age || '', gender: c.gender || '' });
  };

  const handleEditSave = () => {
    updateCase(editingCase.id, editForm);
    setEditingCase(null);
  };

  const addCase = async (newCase) => {
    const id = Date.now().toString();
    const caseToAdd = { ...newCase, id, date: 'Just now' };

    // Optimistic UI Updates to ensure dashboard updates instantly!
    setCases(prev => [caseToAdd, ...prev]);

    const notifId = Date.now();
    const notification = {
      id: notifId,
      title: 'New Case Added',
      message: `${newCase.name || 'New Patient'} has been successfully registered.`,
      isNew: true
    };
    setNotifications(prev => [{ ...notification, read: false, time: 'Just now' }, ...prev]);

    try {
      await apiCall('/cases', {
        method: 'POST',
        body: JSON.stringify({
          id,
          patientName: newCase.name,
          patientId: `P-${id}`,
          chiefComplaint: newCase.complaint,
          patientAge: newCase.age,
          patientGender: newCase.gender,
          status: 'Active',
          doctorId: localStorage.getItem('fmr-user-id') || 'unassigned'
        })
      });

      await apiCall('/notifications', {
        method: 'POST',
        body: JSON.stringify(notification)
      });
    } catch (err) {
      console.error('Add case error', err);
    }
  };

  const deleteCase = async (id) => {
    try {
      await apiCall(`/cases/${id}`, { method: 'DELETE' });
      setCases(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Delete case error', err);
    }
  };

  const updateCaseStatus = async (id, status) => {
    try {
      await apiCall(`/cases/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      setCases(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    } catch (err) {
      console.error('Update status error', err);
    }
  };

  const updateCase = async (id, updatedData) => {
    try {
      await apiCall(`/cases/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ patientName: updatedData.name })
      });
      setCases(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    } catch (err) {
      console.error('Update case error', err);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode, toggleDarkMode,
        cases, addCase, deleteCase, updateCaseStatus, updateCase,
        notifications, clearNotifications, markAllAsRead,
        openEditModal,
        doctorName, setDoctorName,
        logout
      }}
    >
      <Router>
        {/* Global Edit Modal */}
        {editingCase && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setEditingCase(null)}></div>
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0D121B] dark:text-white">Edit Patient Details</h3>
                <button onClick={() => setEditingCase(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Patient Name</label>
                  <input
                    type="text"
                    className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-600/40 transition-all font-bold text-[#0D121B] dark:text-white"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Age</label>
                    <input
                      type="number"
                      className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-600/40 transition-all font-bold text-[#0D121B] dark:text-white"
                      value={editForm.age}
                      onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Gender</label>
                    <select
                      className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-600/40 transition-all font-bold text-[#0D121B] dark:text-white"
                      value={editForm.gender}
                      onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleEditSave}
                  className="w-full h-16 bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Main App Routes wrapped in Layout */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/cases" element={
            <ProtectedRoute>
              <Layout>
                <Cases />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/new-case" element={
            <ProtectedRoute>
              <Layout>
                <NewCase />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/insights" element={
            <ProtectedRoute>
              <Layout>
                <Insights />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/treatment-plan" element={
            <ProtectedRoute>
              <Layout>
                <TreatmentPlan />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;