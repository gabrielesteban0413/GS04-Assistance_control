import React from 'react';
import { Stat } from '@/services/attendace.service';
import '@/assets/styles/admin.css';

interface StatsGridProps {
    stats: Stat[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
    return (
        <div className="admin-stats-grid">
            {stats.map((stat, idx) => (
                <div key={idx} className="admin-stat-card">
                    <div className="admin-stat-card-header">
                        <div className="admin-stat-title">{stat.title}</div>
                    </div>
                    <div className="admin-stat-card-content">
                        <div className="admin-stat-value">{stat.value}</div>
                        {stat.subtitle && (
                            <p className="admin-stat-subtitle">
                                {stat.subtitle}
                            </p>
                        )}
                        {stat.trend && (
                            <div
                                className={`admin-stat-trend admin-stat-trend--${stat.trend}`}
                            >
                                {stat.trend === 'up' ? '↑' : '↓'}{' '}
                                {stat.trendValue}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
