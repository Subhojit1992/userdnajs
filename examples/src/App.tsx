import React, { useState } from 'react';
import Header from './components/Header';
import VisitorIdSection from './components/VisitorIdSection';
import FingerprintSection from './components/FingerprintSection';
import FeaturesSection from './components/FeaturesSection';
import InstallationPage from './components/InstallationPage';
import ApiReferencePage from './components/ApiReferencePage';
import { UserDNAProvider } from './context/UserDNAContext';
import { Book, Code, Home } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderContent = () => {
    switch(activePage) {
      case 'installation':
        return <InstallationPage />;
      case 'api':
        return <ApiReferencePage />;
      default:
        return (
          <>
            <VisitorIdSection />
            <FingerprintSection />
            <FeaturesSection />
          </>
        );
    }
  };

  return (
    <UserDNAProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Header />
          
          {/* Navigation - Responsive design */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-4">
            <button 
              onClick={() => setActivePage('home')}
              className={`px-3 py-2 sm:px-4 rounded-lg flex items-center space-x-2 ${
                activePage === 'home' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Demo</span>
            </button>
            <button 
              onClick={() => setActivePage('installation')}
              className={`px-3 py-2 sm:px-4 rounded-lg flex items-center space-x-2 ${
                activePage === 'installation' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Book className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Installation</span>
            </button>
            <button 
              onClick={() => setActivePage('api')}
              className={`px-3 py-2 sm:px-4 rounded-lg flex items-center space-x-2 ${
                activePage === 'api' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">API Reference</span>
            </button>
          </div>
          
          <main className="mt-8 space-y-12">
            {renderContent()}
          </main>
          
          <footer className="mt-16 py-8 text-center text-slate-500 text-sm">
            <p>UserDNA-Community © {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </UserDNAProvider>
  );
}

export default App;