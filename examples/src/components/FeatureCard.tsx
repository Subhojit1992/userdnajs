import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] border border-slate-100">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-medium text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;