import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { AttendanceRecordDetail, getAttendanceRecords } from '@/services/admin.service';
import AttendanceTable from '@/components/admin/AttendanceTable';
import { exportToCSV } from '@/utils/exportUtils';
import logo from '@/assets/images/logo_blanco.png';

const AsistenciaPage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecordDetail[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecordDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getAttendanceRecords();
      setRecords(data);
      setFilteredRecords(data);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecords(records);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = records.filter(record =>
      record.employeeName.toLowerCase().includes(lowerSearch) ||
      record.date.includes(searchTerm) ||
      record.status.toLowerCase().includes(lowerSearch)
    );
    setFilteredRecords(filtered);
  }, [searchTerm, records]);

  const handleExportCSV = () => {
    exportToCSV(filteredRecords, `asistencia_${new Date().toISOString().slice(0, 19)}`);
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando registros de asistencia...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo izquierda */}
            <div className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </div>

            {/* Título centrado (en móvil se centra, en escritorio ocupa espacio) */}
            <div className="flex-1 text-center">
              <CardTitle className="text-xl md:text-2xl">Gestión de Asistencia</CardTitle>
            </div>

            {/* Buscador + exportar a la derecha */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar empleado, fecha o estado..."
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
          <AttendanceTable records={filteredRecords} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AsistenciaPage;