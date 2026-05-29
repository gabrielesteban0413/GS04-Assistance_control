import React from 'react';
import { Stat } from '../../services/attendace.service';
import '@/assets/styles/admin.css';

const StatCard: React.FC<Stat> = ({
    title,
    value,
    subtitle,
    subtitleColor,
    trend,
    trendValue,
}) => {
    return (
        <div className="admin-stat-card">
            <div className="admin-stat-card-content">
                <div className="admin-stat-title">{title}</div>
                <div className="admin-stat-value">{value}</div>
                {subtitle && (
                    <div
                        className="admin-stat-subtitle"
                        style={{
                            color: subtitleColor || 'var(--admin-text-muted)',
                        }}
                    >
                        {subtitle}
                    </div>
                )}
                {trend && trendValue && (
                    <div
                        className={`admin-stat-trend admin-stat-trend--${trend}`}
                    >
                        {trend === 'up' ? '↑' : '↓'} {trendValue}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
