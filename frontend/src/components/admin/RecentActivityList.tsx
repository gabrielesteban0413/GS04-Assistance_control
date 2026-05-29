import React from 'react';
import { Activity } from '@/services/attendace.service';
import '@/assets/styles/admin.css';

interface RecentActivityListProps {
    activities: Activity[];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({
    activities,
}) => {
    return (
        <ul className="admin-activity-list">
            {activities.map((activity) => (
                <li key={activity.id} className="admin-activity-item">
                    <p className="admin-activity-description">
                        {activity.description}
                    </p>
                    <p className="admin-activity-timestamp">
                        {activity.timestamp}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default RecentActivityList;
