import React, { useEffect, useState } from 'react';
import { Building2, Shield, FileText, Bell, Palette, Plug, ChevronRight } from 'lucide-react';
import {
  getConfiguracion,
  updateGeneral,
  updatePrivacidad,
  updateSeguridad,
} from '@/services/configuracion.service';
import { Configuracion } from '@/types/configuracion';
import logo from '@/assets/images/logo_blanco.png';
import { toast } from 'sonner';
import '@/assets/styles/admin.css';

// ============================================
// Componentes de cada sección
// ============================================

const GeneralConfig: React.FC<{ config: Configuracion; onBack: () => void }> = ({ config, onBack }) => {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = {
      nombreEmpresa: formData.get('nombreEmpresa') as string,
      logoUrl: formData.get('logoUrl') as string,
      emailContacto: formData.get('emailContacto') as string,
      telefonoContacto: formData.get('telefonoContacto') as string,
      direccion: formData.get('direccion') as string,
    };
    setSaving(true);
    try {
      await updateGeneral(updated);
      toast.success('Configuración guardada');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button className="admin-btn-ghost admin-btn-back" onClick={onBack}>
        ← Volver
      </button>
      <form onSubmit={handleSubmit}>
        <div className="admin-config-form">
          <div className="admin-form-group">
            <label className="admin-label">Nombre de la empresa</label>
            <input
              name="nombreEmpresa"
              defaultValue={config.general.nombreEmpresa}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">URL del logo (opcional)</label>
            <input
              name="logoUrl"
              defaultValue={config.general.logoUrl}
              className="admin-input"
              placeholder="https://..."
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Email de contacto</label>
            <input
              name="emailContacto"
              type="email"
              defaultValue={config.general.emailContacto}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Teléfono de contacto</label>
            <input
              name="telefonoContacto"
              defaultValue={config.general.telefonoContacto}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Dirección</label>
            <input
              name="direccion"
              defaultValue={config.general.direccion}
              className="admin-input"
              required
            />
          </div>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

const PrivacidadConfig: React.FC<{ config: Configuracion; onBack: () => void }> = ({ config, onBack }) => {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = {
      retencionDatos: parseInt(formData.get('retencionDatos') as string, 10),
      compartirDatos: formData.get('compartirDatos') === 'true',
      politicaCookies: formData.get('politicaCookies') === 'true',
    };
    setSaving(true);
    try {
      await updatePrivacidad(updated);
      toast.success('Configuración de privacidad guardada');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button className="admin-btn-ghost admin-btn-back" onClick={onBack}>
        ← Volver
      </button>
      <form onSubmit={handleSubmit}>
        <div className="admin-config-form">
          <div className="admin-form-group">
            <label className="admin-label">Retención de datos (días)</label>
            <input
              name="retencionDatos"
              type="number"
              defaultValue={config.privacidad.retencionDatos}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Compartir datos con terceros</label>
            <select
              name="compartirDatos"
              defaultValue={String(config.privacidad.compartirDatos)}
              className="admin-select"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Aceptar política de cookies</label>
            <select
              name="politicaCookies"
              defaultValue={String(config.privacidad.politicaCookies)}
              className="admin-select"
            >
              <option value="true">Activada</option>
              <option value="false">Desactivada</option>
            </select>
          </div>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

const SeguridadConfig: React.FC<{ config: Configuracion; onBack: () => void }> = ({ config, onBack }) => {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = {
      intentosMaximos: parseInt(formData.get('intentosMaximos') as string, 10),
      tiempoSesionMin: parseInt(formData.get('tiempoSesionMin') as string, 10),
      mfaRequerido: formData.get('mfaRequerido') === 'true',
    };
    setSaving(true);
    try {
      await updateSeguridad(updated);
      toast.success('Configuración de seguridad guardada');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button className="admin-btn-ghost admin-btn-back" onClick={onBack}>
        ← Volver
      </button>
      <form onSubmit={handleSubmit}>
        <div className="admin-config-form">
          <div className="admin-form-group">
            <label className="admin-label">Intentos máximos de login</label>
            <input
              name="intentosMaximos"
              type="number"
              defaultValue={config.seguridad.intentosMaximos}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Tiempo de sesión (minutos)</label>
            <input
              name="tiempoSesionMin"
              type="number"
              defaultValue={config.seguridad.tiempoSesionMin}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Autenticación de dos factores (MFA)</label>
            <select
              name="mfaRequerido"
              defaultValue={String(config.seguridad.mfaRequerido)}
              className="admin-select"
            >
              <option value="true">Requerido</option>
              <option value="false">No requerido</option>
            </select>
          </div>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Secciones disponibles
const secciones = [
  {
    id: 'general',
    label: 'General',
    icon: Building2,
    description: 'Información de la empresa',
    component: GeneralConfig,
  },
  {
    id: 'privacidad',
    label: 'Privacidad',
    icon: Shield,
    description: 'Datos y cookies',
    component: PrivacidadConfig,
  },
  {
    id: 'seguridad',
    label: 'Seguridad',
    icon: FileText,
    description: 'Accesos y autenticación',
    component: SeguridadConfig,
  },
  {
    id: 'notificaciones',
    label: 'Notificaciones',
    icon: Bell,
    description: 'Alertas y correos',
    component: () => <div className="admin-config-placeholder">Próximamente</div>,
  },
  {
    id: 'apariencia',
    label: 'Apariencia',
    icon: Palette,
    description: 'Temas y estilos',
    component: () => <div className="admin-config-placeholder">Próximamente</div>,
  },
  {
    id: 'integraciones',
    label: 'Integraciones',
    icon: Plug,
    description: 'Conectar con otros sistemas',
    component: () => <div className="admin-config-placeholder">Próximamente</div>,
  },
];

// ============================================
// Página principal
// ============================================
const ConfiguracionPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<Configuracion | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await getConfiguracion();
      setConfig(data);
      setLoading(false);
    };
    fetchConfig();
  }, []);

  if (loading) return <div className="admin-page-loading">Cargando configuración...</div>;
  if (!config) return null;

  const SectionComponent = secciones.find((s) => s.id === activeSection)?.component;

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-config-header">
            <div className="admin-logo">
              <img src={logo} alt="Logo" className="admin-logo-img" />
            </div>
            <div className="admin-title-wrapper">
              <h2 className="admin-page-title">Configuración del Sistema</h2>
            </div>
            <div className="admin-spacer"></div>
          </div>
        </div>
        <div className="admin-card-content">
          {!activeSection ? (
            <div className="admin-config-grid">
              {secciones.map((sec) => {
                const Icon = sec.icon;
                return (
                  <div
                    key={sec.id}
                    className="admin-config-card"
                    onClick={() => setActiveSection(sec.id)}
                  >
                    <div className="admin-config-card-header">
                      <div className="admin-config-card-icon">
                        <Icon className="admin-icon" />
                      </div>
                      <h3 className="admin-config-card-title">{sec.label}</h3>
                    </div>
                    <p className="admin-config-card-description">{sec.description}</p>
                    <div className="admin-config-card-footer">
                      <ChevronRight className="admin-icon-sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <SectionComponent config={config} onBack={() => setActiveSection(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;