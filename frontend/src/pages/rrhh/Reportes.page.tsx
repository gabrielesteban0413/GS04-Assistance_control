import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReportesPage: React.FC = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Reportes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Próximamente: reportes estadísticos de asistencia, solicitudes, etc.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportesPage;