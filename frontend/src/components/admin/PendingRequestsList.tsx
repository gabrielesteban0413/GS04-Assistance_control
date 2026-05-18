import React from 'react';
import { PendingRequest } from '@/services/admin.service';

interface PendingRequestsListProps {
  requests: PendingRequest[];
}

const PendingRequestsList: React.FC<PendingRequestsListProps> = ({ requests }) => {
  return (
    <div className="space-y-3">
      {requests.map((req) => (
        <div key={req.id} className="flex justify-between items-center">
          <div>
            <p className="font-medium">{req.employeeName}</p>
            <p className="text-sm text-muted-foreground">{req.reason} • {req.date}</p>
          </div>
          <button className="bg-[#008eb0] text-white px-3 py-1 rounded-full text-sm hover:bg-[#006c8a]">
            Aprobar
          </button>
        </div>
      ))}
    </div>
  );
};

export default PendingRequestsList;