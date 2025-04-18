import React from 'react';
import { Dna, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <Dna className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" strokeWidth={1.5} />
      </div>
      <div className="relative">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2 tracking-tight">
          UserDNA<span className="text-blue-500">.js</span>
        </h1>
        <p className="text-xs sm:text-sm text-blue-500 -mt-2 mb-3 sm:mb-4">Community Edition</p>
      </div>
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
        A powerful browser fingerprinting library that generates unique visitor IDs 
        while respecting privacy and optimizing for performance.
      </p>
      <a 
        href="https://github.com/Subhojit1992/userdnajs"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 text-sm sm:text-base"
      >
        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>View on GitHub</span>
      </a>
    </header>
  );
};

export default Header;