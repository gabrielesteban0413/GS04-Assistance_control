import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';
import { listHorarios, Horario } from '@/services/horario.service';

const HorariosPage: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorarios = async () => {
      const data = await listHorarios();
      setHorarios(data);
      setLoading(false);
    };
    fetchHorarios();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Cargando horarios...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Horarios y Turnos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configuración de horarios por departamento
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {horarios.map((horario) => (
              <Card key={horario.id} variant="outlined" className="rounded-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{horario.nombre}</h3>
                    <Badge variant="secondary">{horario.empleados} emp.</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Horario:</strong> {horario.horario}</p>
                    <p><strong>Días:</strong> {horario.dias}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3">
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorariosPage;