import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  subtitleColor?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  subtitleColor = 'text-muted-foreground',
  trend,
  trendValue,
  icon,
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <p className="text-sm text-muted-foreground">{title}</p>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {subtitle && <p className={`text-xs ${subtitleColor}`}>{subtitle}</p>}
        {trend && trendValue && (
          <div className="flex items-center gap-1 mt-1">
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};