import React, { useRef, useEffect } from 'react';

interface CodeDisplayProps {
  data: string;
  isLoading: boolean;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ data, isLoading }) => {
  const preRef = useRef<HTMLPreElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when new data appears
    if (preRef.current && data !== 'Results will appear here...') {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className="relative mt-4 rounded-lg overflow-hidden">
      <pre 
        ref={preRef}
        className={`bg-slate-800 text-slate-200 p-5 rounded-lg overflow-auto max-h-[320px] transition-all duration-300 text-sm font-mono ${
          isLoading ? 'opacity-70' : 'opacity-100'
        }`}
      >
        {isLoading ? 'Loading...' : data}
      </pre>
      
      {/* Gradient overlay at the bottom to indicate scrollable content */}
      {data.length > 500 && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default CodeDisplay;