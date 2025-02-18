'use client'

import React, { useState } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';

const WebinarItem = ({ version, isUpdated }: { version: string; isUpdated: boolean }) => (
  <div className="relative ml-6 mb-4">
    {/* Curved border */}
    <div className="absolute left-0 top-0 w-6 h-full">
      <div className="absolute left-0 top-0 w-[2px] h-full bg-gray-200" />
      <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-b-2 border-gray-200 rounded-bl-xl" />
    </div>
    
    {/* Green dot */}
    <div className="absolute left-[5px] top-5 h-3 w-3 rounded-full bg-green-500 z-10" />
    
    {/* Content */}
    <div className="pl-12 pr-6 py-4 flex items-center justify-between">
      <span className="text-gray-500 text-lg">
        {isUpdated ? `updated version "${version}"` : `version "${version}"`}
      </span>
      <button className="text-gray-400 hover:text-gray-600 transition-colors">
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

const CollapsibleWebinar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { version: "1", isUpdated: true },
    { version: "2", isUpdated: false },
    { version: "3", isUpdated: false },
    { version: "4", isUpdated: true },
    { version: "5", isUpdated: false },
    { version: "6", isUpdated: false }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="relative">
          {/* Main header */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl text-[#1a237e]">Webinar</span>
            <ChevronDown 
              className={`transform transition-transform text-[#1a237e] ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {/* Multiple items */}
          {isOpen && (
            <>
              {items.map((item, index) => (
                <WebinarItem 
                  key={item.version}
                  version={item.version}
                  isUpdated={item.isUpdated}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleWebinar;