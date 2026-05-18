import { Horario } from '@/types/horario';

// Datos mock iniciales
let horariosMock: Horario[] = [
  { id: '1', nombre: 'Jornada Estándar', horario: '08:00 - 17:00', dias: 'Lun - Vie', empleados: 98 },
  { id: '2', nombre: 'Turno Tarde', horario: '14:00 - 22:00', dias: 'Lun - Vie', empleados: 24 },
  { id: '3', nombre: 'Turno Noche', horario: '22:00 - 06:00', dias: 'Lun - Dom', empleados: 12 },
];

export const listHorarios = async (): Promise<Horario[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...horariosMock];
};

// Opcional: función para editar (la usaremos más adelante)
export const updateHorario = async (id: string, data: Partial<Horario>): Promise<Horario> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const index = horariosMock.findIndex(h => h.id === id);
  if (index === -1) throw new Error('Horario no encontrado');
  horariosMock[index] = { ...horariosMock[index], ...data };
  return horariosMock[index];
};