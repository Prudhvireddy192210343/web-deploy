import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-12 rounded-[32px] shadow-2xl border border-red-50/50 space-y-8 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto shadow-inner">
              <AlertCircle size={40} />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-2xl font-black text-[#0D121B] tracking-tight">Something went wrong</h1>
              <p className="text-[#4C669A] font-medium leading-relaxed">
                We encountered an unexpected clinical error. Please refresh the diagnostic engine.
              </p>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full h-16 bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <RefreshCcw size={20} />
              <span>Restart Application</span>
            </button>

            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-8 p-4 bg-gray-50 rounded-xl text-[10px] text-left text-red-700 overflow-auto max-h-32 border border-gray-100 font-mono">
                {this.state.error && this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
