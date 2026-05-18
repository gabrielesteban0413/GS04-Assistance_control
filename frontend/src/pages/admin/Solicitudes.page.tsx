import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LeaveRequest, getLeaveRequests } from '@/services/admin.service';
import RequestsTable from '@/components/admin/RequestsTable';
import { exportToCSV } from '@/utils/exportUtils';

const SolicitudesPage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getLeaveRequests();
      setRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  const handleApprove = (id: string) => {
    // Simular aprobación (actualizar estado)
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Aprobada' as const } : req
      )
    );
    // Aquí llamarías a una API real
    console.log(`Aprobada solicitud ${id}`);
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Rechazada' as const } : req
      )
    );
    console.log(`Rechazada solicitud ${id}`);
  };

  const handleExportCSV = () => {
    exportToCSV(requests, `solicitudes_${new Date().toISOString().slice(0, 19)}`);
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando solicitudes...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Solicitudes</CardTitle>
            <p className="text-sm text-muted-foreground">
              Permisos, vacaciones y cambios de turno de los empleados
            </p>
          </div>
          <Button onClick={handleExportCSV} variant="outline">
            Exportar a CSV
          </Button>
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