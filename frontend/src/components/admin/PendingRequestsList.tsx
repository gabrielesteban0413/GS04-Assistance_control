import React from 'react';
import { PendingRequest } from '@/services/attendace.service';
import '@/assets/styles/admin.css';

interface PendingRequestsListProps {
    requests: PendingRequest[];
}

const PendingRequestsList: React.FC<PendingRequestsListProps> = ({
    requests,
}) => {
    return (
        <div className="admin-requests-list">
            {requests.map((req) => (
                <div key={req.id} className="admin-request-item">
                    <div className="admin-request-info">
                        <p className="admin-request-employee">
                            {req.employeeName}
                        </p>
                        <p className="admin-request-details">
                            {req.reason} • {req.date}
                        </p>
                    </div>
                    <button className="admin-approve-btn">Aprobar</button>
                </div>
            ))}
        </div>
    );
};

export default PendingRequestsList;
