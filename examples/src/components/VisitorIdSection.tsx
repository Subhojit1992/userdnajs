import React, { useState } from 'react';
import { Key } from 'lucide-react';
import Button from './Button';
import CodeDisplay from './CodeDisplay';
import { useUserDNA } from '../context/UserDNAContext';

const VisitorIdSection: React.FC = () => {
  const [visitorId, setVisitorId] = useState<string>('Results will appear here...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userDNA } = useUserDNA();

  const handleGetVisitorId = async () => {
    setIsLoading(true);
    try {
      if (userDNA) {
        const id = await userDNA.getVisitorId();
        setVisitorId(id);
      }
    } catch (error) {
      if (error instanceof Error) {
        setVisitorId(`Error: ${error.message}`);
      } else {
        setVisitorId('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <Key className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-semibold text-slate-800">Get Visitor ID</h2>
      </div>
      
      <p className="text-slate-600 mb-6">
        Generate a unique visitor ID using browser fingerprinting technology that's both
        reliable and privacy-conscious.
      </p>
      
      <Button onClick={handleGetVisitorId} isLoading={isLoading}>
        Generate Visitor ID
      </Button>
      
      <CodeDisplay data={visitorId} isLoading={isLoading} />
    </section>
  );
};

export default VisitorIdSection;