import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getEmployees } from '@/services/attendace.service';
import { Employee } from '@/types/employee';
import EmployeesTable from '@/components/admin/EmployeesTable';
import { exportToCSV } from '@/utils/exportUtils';
import { Button } from '@/components/ui/button';

const EmpleadosPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getEmployees();
            setEmployees(data);
            setLoading(false);
        };
        fetch();
    }, []);

    const handleExport = () => {
        const data = employees.map((e) => ({
            nombre: e.nombre,
            documento: e.documento,
            email: e.email,
            departamento: e.departamento,
            estado: e.estado === 'activo' ? 'Activo' : 'Inactivo',
        }));
        exportToCSV(data, `empleados_${new Date().toISOString().slice(0, 19)}`);
    };

    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Empleados</CardTitle>
                    <Button onClick={handleExport} variant="outline">
                        Exportar CSV
                    </Button>
                </CardHeader>
                <CardContent>
                    <EmployeesTable
                        employees={employees}
                        loading={loading}
                        onEdit={() => {}}
                        onDelete={() => {}}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default EmpleadosPage;
