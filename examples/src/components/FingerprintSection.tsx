import React, { useState } from 'react';
import { Scan } from 'lucide-react';
import Button from './Button';
import CodeDisplay from './CodeDisplay';
import { useUserDNA } from '../context/UserDNAContext';

const FingerprintSection: React.FC = () => {
  const [fingerprintData, setFingerprintData] = useState<string>('Results will appear here...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userDNA } = useUserDNA();

  const handleGetFingerprint = async () => {
    setIsLoading(true);
    try {
      if (userDNA) {
        const fingerprint = await userDNA.getFingerprint();
        setFingerprintData(JSON.stringify(fingerprint, null, 2));
      }
    } catch (error) {
      if (error instanceof Error) {
        setFingerprintData(`Error: ${error.message}`);
      } else {
        setFingerprintData('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <Scan className="w-6 h-6 text-purple-500" />
        <h2 className="text-2xl font-semibold text-slate-800">Full Fingerprint Data</h2>
      </div>
      
      <p className="text-slate-600 mb-6">
        Get the complete fingerprint data with all components for detailed analysis of the visitor's digital signature.
      </p>
      
      <Button onClick={handleGetFingerprint} isLoading={isLoading} variant="secondary">
        Generate Full Fingerprint
      </Button>
      
      <CodeDisplay data={fingerprintData} isLoading={isLoading} />
    </section>
  );
};

export default FingerprintSection;