/**
 * Convierte un array de objetos a formato CSV y descarga el archivo.
 * @param data Array de objetos (cada objeto representa una fila)
 * @param filename Nombre del archivo (sin extensión)
 */
export const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  filename: string
) => {
  if (!data.length) {
    console.warn('No hay datos para exportar');
    return;
  }

  // Obtener las cabeceras (nombres de las columnas) del primer objeto
  const headers = Object.keys(data[0]) as (keyof T)[];

  // Mapear las cabeceras a nombres más amigables (opcional)
  const headerNames: Record<string, string> = {
    employeeName: 'Empleado',
    date: 'Fecha',
    entryTime: 'Entrada',
    exitTime: 'Salida',
    hoursWorked: 'Horas Trabajadas',
    status: 'Estado',
    // Si hay más campos, añadir aquí
  };

  // Crear fila de encabezados en CSV
  const csvRows = [];
  const displayHeaders = headers.map(h => headerNames[h as string] || h);
  csvRows.push(displayHeaders.join(','));

  // Crear filas de datos
  for (const row of data) {
    const values = headers.map(header => {
      let value = row[header];
      // Limpiar y formatear valores
      if (value === undefined || value === null) value = '';
      // Reemplazar comas internas y saltos de línea
      const stringValue = String(value).replace(/,/g, ';').replace(/\n/g, ' ');
      return `"${stringValue}"`; // Envolver entre comillas
    });
    csvRows.push(values.join(','));
  }

  // Crear blob y descargar
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};