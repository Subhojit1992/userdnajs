import React from 'react';
import CodeDisplay from './CodeDisplay';
import { DownloadCloud, Settings, Terminal, Command, Globe } from 'lucide-react';

const InstallationPage: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <h2 className="text-xl font-bold flex items-center">
          <DownloadCloud className="mr-2 h-6 w-6" />
          Installation & Configuration
        </h2>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Installation Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
            <Terminal className="mr-2 h-5 w-5 text-blue-500" />
            Installation
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50">
                <Command className="h-4 w-4 text-slate-500 mr-2" />
                <h4 className="font-medium text-slate-700">NPM</h4>
              </div>
              <div className="p-2">
                <CodeDisplay code="npm install userdnajs" language="bash" />
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50">
                <Command className="h-4 w-4 text-slate-500 mr-2" />
                <h4 className="font-medium text-slate-700">Yarn</h4>
              </div>
              <div className="p-2">
                <CodeDisplay code="yarn add userdnajs" language="bash" />
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50">
                <Command className="h-4 w-4 text-slate-500 mr-2" />
                <h4 className="font-medium text-slate-700">CDN</h4>
              </div>
              <div className="p-2">
                <CodeDisplay 
                  code='<script src="https://unpkg.com/userdnajs@0.1.2/dist/index.umd.min.js"></script>' 
                  language="html"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Start Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Quick Start</h3>
          
          {/* ES Module Usage */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50">
              <h4 className="font-medium text-slate-700">ES Module Usage (NPM/Yarn)</h4>
            </div>
            <div className="p-2">
              <CodeDisplay
                code={`import { createUserDNA } from 'userdnajs';

// Create a new instance with default options
const userDNA = createUserDNA();

// Get a visitor ID
userDNA.getVisitorId().then(id => {
  console.log('Visitor ID:', id);
});

// Get the full fingerprint
userDNA.getFingerprint().then(result => {
  console.log('Fingerprint result:', result);
});`}
                language="javascript"
              />
            </div>
          </div>
          
          {/* CDN Usage */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50">
              <Globe className="h-4 w-4 text-slate-500 mr-2" />
              <h4 className="font-medium text-slate-700">CDN Usage</h4>
            </div>
            <div className="p-2">
              <CodeDisplay
                code={`<!-- Include the library via CDN -->
<script src="https://unpkg.com/userdnajs@0.1.2/dist/index.umd.min.js"></script>

<script>
  // When using the CDN version, access via the global namespace
  const userDNA = UserDNACommunity.createUserDNA();
  
  // Use the same API as the module version
  userDNA.getVisitorId().then(id => {
    console.log('Visitor ID:', id);
  });
  
  userDNA.getFingerprint().then(result => {
    console.log('Fingerprint result:', result);
  });
</script>`}
                language="html"
              />
            </div>
          </div>
          
          {/* Complete HTML Example */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50">
              <h4 className="font-medium text-slate-700">Complete HTML Example</h4>
            </div>
            <div className="p-2">
              <CodeDisplay
                code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UserDNA Demo</title>
  <script src="https://unpkg.com/userdnajs@0.1.2/dist/index.umd.min.js"></script>
</head>
<body>
  <h1>UserDNA Demo</h1>
  <button id="getIdBtn">Get Visitor ID</button>
  <pre id="result">Results will appear here...</pre>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const resultElement = document.getElementById('result');
      const button = document.getElementById('getIdBtn');
      
      // Create UserDNA instance
      const userDNA = UserDNACommunity.createUserDNA({
        includeBrowserInfo: true,
        includeScreenInfo: true,
        includeTimezone: true,
        includeLanguage: true,
        includeStorage: true
      });
      
      // Add button event listener
      button.addEventListener('click', async function() {
        try {
          resultElement.textContent = 'Loading...';
          const visitorId = await userDNA.getVisitorId();
          resultElement.textContent = visitorId;
        } catch (error) {
          resultElement.textContent = \`Error: \${error.message}\`;
        }
      });
    });
  </script>
</body>
</html>`}
                language="html"
              />
            </div>
          </div>
        </div>
        
        {/* Configuration Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
            <Settings className="mr-2 h-5 w-5 text-blue-500" />
            Configuration
          </h3>
          <p className="text-slate-600">
            UserDNA-Community is configurable with basic options:
          </p>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50">
              <h4 className="font-medium text-slate-700">Configuration Options</h4>
            </div>
            <div className="p-2">
              <CodeDisplay
                code={`import { createUserDNA } from 'userdnajs';

const userDNA = createUserDNA({
  // What components to include in the fingerprint
  includeBrowserInfo: true,
  includeScreenInfo: true,
  includeTimezone: true,
  includeLanguage: true,
  includeStorage: true,
  
  // Storage configuration
  storagePrefix: 'myapp',
  storageType: 'localStorage', // 'localStorage', 'sessionStorage', or 'none'
  
  // Add custom fingerprinting components (max 2)
  customComponents: [
    {
      name: 'customData',
      getValue: () => 'some-custom-value'
    },
    {
      name: 'timestamp',
      getValue: () => new Date().toISOString()
    }
  ]
});`}
                language="javascript"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationPage; 