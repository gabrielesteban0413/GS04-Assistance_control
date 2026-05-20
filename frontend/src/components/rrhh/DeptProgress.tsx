import React from 'react';

interface DeptProgressProps {
  name: string;
  percentage: number;
}

export const DeptProgress: React.FC<DeptProgressProps> = ({ name, percentage }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#008eb0] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};