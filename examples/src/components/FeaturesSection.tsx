import React from 'react';
import { CheckCircle, Zap, Shield, Globe, Layout, Code } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    title: 'Fast DJB2 Hash Algorithm',
    description: 'Optimized for browser performance with minimal overhead'
  },
  {
    icon: <Globe className="w-5 h-5 text-emerald-500" />,
    title: 'Browser & Environment Data',
    description: 'Collects user agent, screen resolution, and device information'
  },
  {
    icon: <Layout className="w-5 h-5 text-blue-500" />,
    title: 'Storage & Preferences',
    description: 'Tracks localStorage/sessionStorage capabilities and user preferences'
  },
  {
    icon: <Shield className="w-5 h-5 text-purple-500" />,
    title: 'Privacy-Focused',
    description: 'Respects user privacy while providing reliable identification'
  },
  {
    icon: <Code className="w-5 h-5 text-rose-500" />,
    title: 'Custom Components',
    description: 'Add up to 2 custom data points to enhance identification accuracy'
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: 'Simple Integration',
    description: 'Easy to implement with minimal configuration required'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-800">Key Features</h2>
        <p className="text-slate-600 mt-2">
          Discover what makes UserDNA-Community the ideal choice for visitor identification
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;