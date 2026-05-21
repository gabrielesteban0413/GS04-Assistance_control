import React from 'react';
import '../../assets/styles/rrhh.css';

interface Stat {
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="rrhh-stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="rrhh-stat-card">
          <div className="rrhh-stat-title">{stat.title}</div>
          <div className="rrhh-stat-value">{stat.value}</div>
          {stat.subtitle && <div className="rrhh-stat-subtitle">{stat.subtitle}</div>}
          {stat.trend && stat.trendValue && (
            <div className={`rrhh-stat-trend rrhh-stat-trend--${stat.trend}`}>
              {stat.trend === 'up' ? '↑' : '↓'} {stat.trendValue}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;