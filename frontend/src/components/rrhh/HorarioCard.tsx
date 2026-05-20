import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface HorarioCardProps {
  title: string;
  schedule: string;
  count: number;
  onEdit?: () => void;
}

export const HorarioCard: React.FC<HorarioCardProps> = ({ title, schedule, count, onEdit }) => {
  return (
    <Card className="mb-3">
      <CardContent className="p-3 flex justify-between items-center">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{schedule}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{count} emp.</span>
          <Button size="sm" variant="ghost" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};