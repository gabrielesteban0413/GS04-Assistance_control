import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

// Componente para cada sección (se mostrará al hacer clic)
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
      const result = await updateGeneral(updated);
      // Actualizar config local si es necesario
      toast.success('Configuración guardada');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        ← Volver
      </Button>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Nombre de la empresa</label>
            <input name="nombreEmpresa" defaultValue={config.general.nombreEmpresa} className="w-full p-2 border rounded" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">URL del logo (opcional)</label>
            <input name="logoUrl" defaultValue={config.general.logoUrl} className="w-full p-2 border rounded" placeholder="https://..." />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Email de contacto</label>
            <input name="emailContacto" type="email" defaultValue={config.general.emailContacto} className="w-full p-2 border rounded" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Teléfono de contacto</label>
            <input name="telefonoContacto" defaultValue={config.general.telefonoContacto} className="w-full p-2 border rounded" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Dirección</label>
            <input name="direccion" defaultValue={config.general.direccion} className="w-full p-2 border rounded" required />
          </div>
          <Button type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</Button>
        </div>
      </form>
    </div>
  );
};

// Similar para PrivacidadConfig y SeguridadConfig (puedes reutilizar el código anterior)
// ... (lo mismo para privacidad y seguridad)

const secciones = [
  { id: 'general', label: 'General', icon: Building2, description: 'Información de la empresa', component: GeneralConfig },
  { id: 'notificaciones', label: 'Notificaciones', icon: Bell, description: 'Alertas y correos', component: () => <div>Próximamente</div> },
  { id: 'apariencia', label: 'Apariencia', icon: Palette, description: 'Temas y estilos', component: () => <div>Próximamente</div> },
  { id: 'integraciones', label: 'Integraciones', icon: Plug, description: 'Conectar con otros sistemas', component: () => <div>Próximamente</div> },
];

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

  if (loading) return <div className="p-8 text-center">Cargando configuración...</div>;
  if (!config) return null;

  const SectionComponent = secciones.find(s => s.id === activeSection)?.component;
  const sectionData = secciones.find(s => s.id === activeSection);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </div>
            <div className="flex-1 text-center">
              <CardTitle className="text-xl md:text-2xl">Configuración del Sistema</CardTitle>
            </div>
            <div className="w-12" />
          </div>
        </CardHeader>
        <CardContent>
          {!activeSection ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {secciones.map(sec => {
                const Icon = sec.icon;
                return (
                  <Card key={sec.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveSection(sec.id)}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{sec.label}</CardTitle>
                      </div>
                      <CardDescription>{sec.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-end">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div>
              <SectionComponent config={config} onBack={() => setActiveSection(null)} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracionPage;