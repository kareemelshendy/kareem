"use client";

import { useState } from "react";

interface Version {
  id: string;
  name: string;
  isActive: boolean;
}

export default function VersionTimeline() {
  const [versions] = useState<Version[]>([
    { id: "1", name: "Original Version", isActive: true },
    { id: "2", name: 'Updated Version "1"', isActive: true },
    { id: "3", name: 'Updated Version "2"', isActive: false },
  ]);

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="relative">
        {/* SVG for Rounded Line */}
        <svg
          className="absolute left-[18px] top-[20px]"
          width="20"
          height="100%"
        >
          <path
            d="M10 0 Q10 20, 30 20"
            stroke="#E2E8F0"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="10"
            y1="20"
            x2="10"
            y2="100%"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
        </svg>

        {/* Version Items */}
        <div className="space-y-12">
          {versions.map((version, index) => (
            <div key={version.id} className="flex items-center gap-6">
              {/* Status Dot */}
              <div className="relative z-10">
                <div
                  className={`w-[10px] h-[10px] rounded-full ${
                    version.isActive ? "bg-[#4ADE80]" : "bg-gray-200"
                  }`}
                />
              </div>

              {/* Version Name */}
              <div className="flex-1">
                <h3 className="text-[#475569] text-lg font-medium">
                  {version.name}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button className="text-[#475569] hover:text-gray-700 p-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="text-[#475569] hover:text-gray-700 p-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 