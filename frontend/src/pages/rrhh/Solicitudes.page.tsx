import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLeaveRequests, LeaveRequest } from '@/services/admin.service';
import RequestsTable from '@/components/admin/RequestsTable';
import { exportToCSV } from '@/utils/exportUtils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SolicitudesPage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getLeaveRequests();
      setRequests(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Aprobada' as const } : req
      )
    );
    toast.success('Solicitud aprobada');
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Rechazada' as const } : req
      )
    );
    toast.success('Solicitud rechazada');
  };

  const handleExport = () => {
    exportToCSV(requests, `solicitudes_${new Date().toISOString().slice(0, 19)}`);
  };

  if (loading) return <div className="p-8 text-center">Cargando solicitudes...</div>;

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Solicitudes</CardTitle>
          <Button onClick={handleExport} variant="outline">Exportar CSV</Button>
        </CardHeader>
        <CardContent>
          <RequestsTable
            requests={requests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SolicitudesPage;