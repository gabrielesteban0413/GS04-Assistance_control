import React from 'react';
import { Activity } from '@/services/admin.service';

interface RecentActivityListProps {
  activities: Activity[];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities }) => {
  return (
    <ul className="space-y-2">
      {activities.map((activity) => (
        <li key={activity.id} className="border-b pb-2 last:border-0">
          <p className="font-medium">{activity.description}</p>
          <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
        </li>
      ))}
    </ul>
  );
};

export default RecentActivityList;