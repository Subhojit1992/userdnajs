import React from 'react';
import CodeDisplay from './CodeDisplay';
import { Code, FileCode, CheckCircle, RefreshCw, Settings, Info, Command } from 'lucide-react';

const ApiReferencePage: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
        <h2 className="text-lg sm:text-xl font-bold flex items-center">
          <Code className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
          API Reference
        </h2>
      </div>
      
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b pb-2">Core Methods</h3>
        
        {/* createUserDNA */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start">
            <FileCode className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
            <div className="w-full">
              <h4 className="font-medium text-slate-800 text-sm sm:text-base">createUserDNA(options)</h4>
              <p className="text-slate-600 mt-1 text-sm">Creates a new instance of the UserDNA-Community fingerprint generator.</p>
            </div>
          </div>
        </div>
        
        {/* getFingerprint */}
        <div className="space-y-2">
          <div className="flex items-start">
            <FileCode className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
            <div className="w-full">
              <h4 className="font-medium text-slate-800 text-sm sm:text-base">getFingerprint()</h4>
              <p className="text-slate-600 mt-1 text-sm">Gets the full fingerprint result. Returns a Promise that resolves to a <code className="bg-slate-100 text-slate-800 px-1 rounded">FingerprintResult</code> object.</p>
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mt-3 w-full">
                <div className="flex items-center border-b border-slate-200 px-3 sm:px-4 py-2 bg-slate-50">
                  <Command className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-xs text-slate-600 font-medium">Example</span>
                </div>
                <div className="p-0 w-full overflow-hidden">
                  <CodeDisplay
                    code={`userDNA.getFingerprint().then(result => {
  console.log(result);
});`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* getVisitorId */}
        <div className="space-y-2">
          <div className="flex items-start">
            <FileCode className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
            <div className="w-full">
              <h4 className="font-medium text-slate-800 text-sm sm:text-base">getVisitorId()</h4>
              <p className="text-slate-600 mt-1 text-sm">Gets just the visitor ID (fingerprint hash). Returns a Promise that resolves to a string.</p>
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mt-3 w-full">
                <div className="flex items-center border-b border-slate-200 px-3 sm:px-4 py-2 bg-slate-50">
                  <Command className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-xs text-slate-600 font-medium">Example</span>
                </div>
                <div className="p-0 w-full overflow-hidden">
                  <CodeDisplay
                    code={`userDNA.getVisitorId().then(id => {
  console.log(id);
});`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* isSameVisitor */}
        <div className="space-y-2">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
            <div className="w-full">
              <h4 className="font-medium text-slate-800 text-sm sm:text-base">isSameVisitor(fingerprintId)</h4>
              <p className="text-slate-600 mt-1 text-sm">Checks if the current visitor matches a previous fingerprint ID. Returns a Promise that resolves to a boolean.</p>
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mt-3 w-full">
                <div className="flex items-center border-b border-slate-200 px-3 sm:px-4 py-2 bg-slate-50">
                  <Command className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-xs text-slate-600 font-medium">Example</span>
                </div>
                <div className="p-0 w-full overflow-hidden">
                  <CodeDisplay
                    code={`userDNA.isSameVisitor('previous-id').then(isSame => {
  if (isSame) {
    console.log('Same visitor detected');
  }
});`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* updateOptions */}
        <div className="space-y-2">
          <div className="flex items-start">
            <Settings className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
            <div className="w-full">
              <h4 className="font-medium text-slate-800 text-sm sm:text-base">updateOptions(options)</h4>
              <p className="text-slate-600 mt-1 text-sm">Updates the options for the fingerprint generator.</p>
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mt-3 w-full">
                <div className="flex items-center border-b border-slate-200 px-3 sm:px-4 py-2 bg-slate-50">
                  <Command className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-xs text-slate-600 font-medium">Example</span>
                </div>
                <div className="p-0 w-full overflow-hidden">
                  <CodeDisplay
                    code={`userDNA.updateOptions({
  includeScreenInfo: false,
  storageType: 'sessionStorage'
});`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* getOptions */}
        <div className="space-y-2">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
            <div className="w-full">
              <h4 className="font-medium text-slate-800 text-sm sm:text-base">getOptions()</h4>
              <p className="text-slate-600 mt-1 text-sm">Gets the current options for the fingerprint generator.</p>
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mt-3 w-full">
                <div className="flex items-center border-b border-slate-200 px-3 sm:px-4 py-2 bg-slate-50">
                  <Command className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-xs text-slate-600 font-medium">Example</span>
                </div>
                <div className="p-0 w-full overflow-hidden">
                  <CodeDisplay
                    code={`const options = userDNA.getOptions();`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Browser Support */}
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b pb-2">Browser Support</h3>
          <p className="text-slate-600 text-sm">UserDNA-Community works in all modern browsers:</p>
          <ul className="list-disc text-slate-600 pl-5 space-y-1 text-sm">
            <li>Chrome 49+</li>
            <li>Firefox 52+</li>
            <li>Safari 10+</li>
            <li>Edge 18+</li>
            <li>Opera 36+</li>
            <li>Mobile browsers (iOS Safari, Android Chrome)</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ApiReferencePage; 