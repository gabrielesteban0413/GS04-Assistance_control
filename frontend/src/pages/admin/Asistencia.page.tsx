import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AttendanceRecordDetail, getAttendanceRecords } from '@/services/admin.service';
import AttendanceTable from '@/components/admin/AttendanceTable';
import { exportToCSV } from '@/utils/exportUtils';

const AsistenciaPage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecordDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getAttendanceRecords();
      setRecords(data);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  const handleExportCSV = () => {
    exportToCSV(records, `asistencia_${new Date().toISOString().slice(0, 19)}`);
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando registros de asistencia...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Asistencia</CardTitle>
            <p className="text-sm text-muted-foreground">
              Registros de asistencia de todos los empleados
            </p>
          </div>
          <Button onClick={handleExportCSV} variant="outline">
            Exportar a CSV
          </Button>
        </CardHeader>
        <CardContent>
          <AttendanceTable records={records} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AsistenciaPage;