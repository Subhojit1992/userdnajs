import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

declare global {
  interface Window {
    UserDNACommunity: {
      createUserDNA: (config: any) => any;
    };
  }
}

type UserDNAInstance = {
  getVisitorId: () => Promise<string>;
  getFingerprint: () => Promise<any>;
};

type UserDNAContextType = {
  userDNA: UserDNAInstance | null;
  isLoading: boolean;
  error: string | null;
};

const UserDNAContext = createContext<UserDNAContextType>({
  userDNA: null,
  isLoading: true,
  error: null
});

export const useUserDNA = () => useContext(UserDNAContext);

interface UserDNAProviderProps {
  children: ReactNode;
}

export const UserDNAProvider: React.FC<UserDNAProviderProps> = ({ children }) => {
  const [userDNA, setUserDNA] = useState<UserDNAInstance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load UserDNA script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/userdnajs@0.1.2/dist/index.umd.min.js';
    script.async = true;
    
    script.onload = () => {
      try {
        // Configure UserDNA instance
        const userDNAInstance = window.UserDNACommunity.createUserDNA({
          includeBrowserInfo: true,
          includeScreenInfo: true,
          includeTimezone: true,
          includeLanguage: true,
          includeStorage: true,
          storagePrefix: 'userdna-example',
          storageType: 'localStorage',
          customComponents: [
            {
              name: 'timestamp',
              getValue: () => new Date().toISOString()
            },
            {
              name: 'screenOrientation',
              getValue: () => window.screen.orientation ? 
                window.screen.orientation.type : 'unknown'
            }
          ]
        });
        
        setUserDNA(userDNAInstance);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to initialize UserDNA');
        }
        setIsLoading(false);
      }
    };
    
    script.onerror = () => {
      setError('Failed to load UserDNA script');
      setIsLoading(false);
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <UserDNAContext.Provider value={{ userDNA, isLoading, error }}>
      {children}
    </UserDNAContext.Provider>
  );
};