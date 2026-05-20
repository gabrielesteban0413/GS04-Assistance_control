import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { LeaveRequest, getLeaveRequests } from '@/services/admin.service';
import RequestsTable from '@/components/admin/RequestsTable';
import { exportToCSV } from '@/utils/exportUtils';
import logo from '@/assets/images/logo_blanco.png';

const SolicitudesPage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getLeaveRequests();
      setRequests(data);
      setFilteredRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRequests(requests);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = requests.filter(req =>
      req.employeeName.toLowerCase().includes(lowerSearch) ||
      req.type.toLowerCase().includes(lowerSearch) ||
      req.status.toLowerCase().includes(lowerSearch) ||
      req.reason.toLowerCase().includes(lowerSearch)
    );
    setFilteredRequests(filtered);
  }, [searchTerm, requests]);

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'Aprobada' as const } : req
      )
    );
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
    exportToCSV(filteredRequests, `solicitudes_${new Date().toISOString().slice(0, 19)}`);
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando solicitudes...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </div>
            <div className="flex-1 text-center">
              <CardTitle className="text-xl md:text-2xl">Gestión de Solicitudes</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar empleado, tipo, estado, motivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button onClick={handleExportCSV} variant="outline">
                Exportar a CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RequestsTable
            requests={filteredRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SolicitudesPage;