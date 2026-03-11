import React from 'react';
import { FiZap } from 'react-icons/fi';

const Loading = ({ text = 'Generating your idea...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-dark-600 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FiZap className="w-6 h-6 text-primary-400 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-gray-400 font-medium animate-pulse">{text}</p>
    </div>
  );
};

export default Loading;

