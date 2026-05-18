import { Configuracion, ConfiguracionGeneral, PoliticasPrivacidad, ConfiguracionSeguridad } from '@/types/configuracion';

// Valores por defecto
const defaultConfig: Configuracion = {
  general: {
    nombreEmpresa: 'Mi Empresa S.A.',
    logoUrl: '',
    emailContacto: 'contacto@miempresa.com',
    telefonoContacto: '+51 1 234 5678',
    direccion: 'Av. Principal 123, Lima, Perú',
  },
  privacidad: {
    texto: `Política de Privacidad

En cumplimiento con la legislación vigente, informamos que los datos personales recopilados serán tratados con absoluta confidencialidad y utilizados únicamente para los fines del sistema de asistencia.

No compartiremos sus datos con terceros sin su consentimiento explícito, salvo obligación legal.

Para cualquier consulta, puede contactarnos a través de correo electrónico.`,
    fechaActualizacion: new Date().toISOString().split('T')[0],
  },
  seguridad: {
    sesionTimeoutMinutos: 30,
    requiere2FA: false,
    intentosMaximos: 5,
  },
};

let configMock: Configuracion = { ...defaultConfig };

// Cargar desde localStorage si existe
const loadFromStorage = () => {
  const stored = localStorage.getItem('app_config');
  if (stored) {
    try {
      configMock = JSON.parse(stored);
    } catch (e) {}
  }
};
loadFromStorage();

const saveToStorage = () => {
  localStorage.setItem('app_config', JSON.stringify(configMock));
};

export const getConfiguracion = async (): Promise<Configuracion> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return { ...configMock };
};

export const updateGeneral = async (data: ConfiguracionGeneral): Promise<ConfiguracionGeneral> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  configMock.general = { ...data };
  saveToStorage();
  return { ...configMock.general };
};

export const updatePrivacidad = async (data: PoliticasPrivacidad): Promise<PoliticasPrivacidad> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  configMock.privacidad = { ...data, fechaActualizacion: new Date().toISOString().split('T')[0] };
  saveToStorage();
  return { ...configMock.privacidad };
};

export const updateSeguridad = async (data: ConfiguracionSeguridad): Promise<ConfiguracionSeguridad> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  configMock.seguridad = { ...data };
  saveToStorage();
  return { ...configMock.seguridad };
};