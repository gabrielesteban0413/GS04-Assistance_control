export interface ConfiguracionGeneral {
  nombreEmpresa: string;
  logoUrl?: string;
  emailContacto: string;
  telefonoContacto: string;
  direccion: string;
}

export interface PoliticasPrivacidad {
  texto: string;
  fechaActualizacion: string;
}

export interface ConfiguracionSeguridad {
  sesionTimeoutMinutos: number;
  requiere2FA: boolean;
  intentosMaximos: number;
}

export interface Configuracion {
  general: ConfiguracionGeneral;
  privacidad: PoliticasPrivacidad;
  seguridad: ConfiguracionSeguridad;
}