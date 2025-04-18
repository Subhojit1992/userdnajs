import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  isLoading = false,
  variant = 'primary'
}) => {
  const baseClasses = "relative inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    secondary: "bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${isLoading ? 'cursor-not-allowed opacity-80' : ''}`}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;