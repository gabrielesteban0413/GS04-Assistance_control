import React from 'react';
import { Stat } from '../../services/admin.service';

const StatCard: React.FC<Stat> = ({ title, value, subtitle, subtitleColor, trend, trendValue }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        {subtitle && <div className="stat-subtitle" style={{ color: subtitleColor || '#6b7280' }}>{subtitle}</div>}
        {trend && trendValue && (
          <div className="stat-trend">
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;