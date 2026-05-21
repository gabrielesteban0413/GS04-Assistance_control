import React from 'react';
import '../../assets/styles/rrhh.css';

interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

interface RecentActivityListProps {
  activities: Activity[];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities }) => {
  return (
    <ul className="rrhh-activity-list">
      {activities.map(activity => (
        <li key={activity.id} className="rrhh-activity-item">
          <div className="rrhh-activity-description">{activity.description}</div>
          <div className="rrhh-activity-time">{activity.timestamp}</div>
        </li>
      ))}
    </ul>
  );
};

export default RecentActivityList;