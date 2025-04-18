import React, { useRef, useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeDisplayProps {
  data?: string;
  isLoading?: boolean;
  code?: string;
  language?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
  data = '', 
  isLoading = false, 
  code, 
  language = 'javascript' 
}) => {
  const preRef = useRef<HTMLPreElement>(null);
  const displayContent = code || data;
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Scroll to bottom when new data appears
    if (preRef.current && data && data !== 'Results will appear here...') {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [data]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative mt-3 sm:mt-4 rounded-lg overflow-hidden w-full">
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={copyToClipboard}
          className="p-1 sm:p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="sm:w-4 sm:h-4" /> : <Copy size={14} className="sm:w-4 sm:h-4" />}
        </button>
      </div>
      
      {isLoading ? (
        <pre className="bg-slate-800 text-slate-200 p-3 sm:p-5 rounded-lg overflow-x-auto max-h-[280px] sm:max-h-[320px] text-xs sm:text-sm font-mono opacity-70 w-full whitespace-pre-wrap break-all sm:break-normal">
          Loading...
        </pre>
      ) : (
        <Highlight
          theme={themes.nightOwl}
          code={displayContent}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              ref={preRef}
              className="bg-slate-800 text-slate-200 p-3 sm:p-5 rounded-lg overflow-x-auto max-h-[280px] sm:max-h-[320px] text-xs sm:text-sm font-mono w-full"
              style={{...style, width: '100%'}}
            >
              <code className="inline-block min-w-full">
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="w-full">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      )}
      
      {/* Gradient overlay at the bottom to indicate scrollable content */}
      {displayContent.length > 500 && (
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default CodeDisplay;