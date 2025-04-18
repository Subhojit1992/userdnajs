import React from 'react';
import Header from './components/Header';
import VisitorIdSection from './components/VisitorIdSection';
import FingerprintSection from './components/FingerprintSection';
import FeaturesSection from './components/FeaturesSection';
import { UserDNAProvider } from './context/UserDNAContext';

function App() {
  return (
    <UserDNAProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <Header />
          <main className="mt-8 space-y-12">
            <VisitorIdSection />
            <FingerprintSection />
            <FeaturesSection />
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