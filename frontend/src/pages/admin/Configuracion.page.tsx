import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Building2, Mail, Phone, MapPin, Lock, Shield, Clock, LogIn, Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';
import {
  getConfiguracion,
  updateGeneral,
  updatePrivacidad,
  updateSeguridad,
} from '@/services/configuracion.service';
import { Configuracion } from '@/types/configuracion';

const ConfiguracionPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<Configuracion | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await getConfiguracion();
      setConfig(data);
      setLoading(false);
    };
    fetchConfig();
  }, []);

  const handleGeneralSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!config) return;
    const formData = new FormData(e.currentTarget);
    const updatedGeneral = {
      nombreEmpresa: formData.get('nombreEmpresa') as string,
      logoUrl: formData.get('logoUrl') as string,
      emailContacto: formData.get('emailContacto') as string,
      telefonoContacto: formData.get('telefonoContacto') as string,
      direccion: formData.get('direccion') as string,
    };
    setSaving(true);
    try {
      const result = await updateGeneral(updatedGeneral);
      setConfig({ ...config, general: result });
      toast.success('Configuración guardada', {
        description: 'Los datos generales se han actualizado correctamente.',
      });
    } catch (error) {
      toast.error('Error al guardar', {
        description: (error as Error).message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePrivacidadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!config) return;
    const texto = (e.currentTarget.elements.namedItem('texto') as HTMLTextAreaElement).value;
    setSaving(true);
    try {
      const result = await updatePrivacidad({ texto, fechaActualizacion: config.privacidad.fechaActualizacion });
      setConfig({ ...config, privacidad: result });
      toast.success('Política guardada', {
        description: 'La política de privacidad se ha actualizado.',
      });
    } catch (error) {
      toast.error('Error al guardar', {
        description: (error as Error).message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSeguridadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!config) return;
    const formData = new FormData(e.currentTarget);
    const updatedSeguridad = {
      sesionTimeoutMinutos: Number(formData.get('sesionTimeoutMinutos')),
      requiere2FA: formData.get('requiere2FA') === 'on',
      intentosMaximos: Number(formData.get('intentosMaximos')),
    };
    setSaving(true);
    try {
      const result = await updateSeguridad(updatedSeguridad);
      setConfig({ ...config, seguridad: result });
      toast.success('Configuración de seguridad guardada', {
        description: 'Los cambios en seguridad se han aplicado.',
      });
    } catch (error) {
      toast.error('Error al guardar', {
        description: (error as Error).message,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Cargando configuración...</div>;
  if (!config) return null;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground mt-1">Administra los parámetros del sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        {/* Pestañas arriba, alineadas a la izquierda */}
        <TabsList className="inline-flex h-auto p-1 bg-white border rounded-lg shadow-sm">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 rounded-md transition-all"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="privacidad"
            className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 rounded-md transition-all"
          >
            Privacidad
          </TabsTrigger>
          <TabsTrigger
            value="seguridad"
            className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 rounded-md transition-all"
          >
            Seguridad
          </TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Información de la Empresa
              </CardTitle>
              <CardDescription>Configura los datos generales de la organización.</CardDescription>
            </CardHeader>
            <form onSubmit={handleGeneralSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombreEmpresa">Nombre de la empresa</Label>
                    <Input id="nombreEmpresa" name="nombreEmpresa" defaultValue={config.general.nombreEmpresa} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">URL del logo (opcional)</Label>
                    <Input id="logoUrl" name="logoUrl" defaultValue={config.general.logoUrl} placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailContacto" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email de contacto
                    </Label>
                    <Input id="emailContacto" name="emailContacto" type="email" defaultValue={config.general.emailContacto} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefonoContacto" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Teléfono de contacto
                    </Label>
                    <Input id="telefonoContacto" name="telefonoContacto" defaultValue={config.general.telefonoContacto} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="direccion" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Dirección
                    </Label>
                    <Input id="direccion" name="direccion" defaultValue={config.general.direccion} required />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4 rounded-b-lg">
                <Button type="submit" disabled={saving} className="ml-auto">
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Privacidad */}
        <TabsContent value="privacidad">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Política de Privacidad
              </CardTitle>
              <CardDescription>Texto que se mostrará en la página de privacidad y términos legales.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePrivacidadSubmit}>
              <CardContent>
                <Textarea
                  name="texto"
                  defaultValue={config.privacidad.texto}
                  rows={15}
                  className="font-mono text-sm resize-y"
                />
                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                  <span>Última actualización: {config.privacidad.fechaActualizacion}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> Esta política es pública</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4 rounded-b-lg">
                <Button type="submit" disabled={saving} className="ml-auto">
                  {saving ? 'Guardando...' : 'Guardar política'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Seguridad */}
        <TabsContent value="seguridad">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Seguridad y Autenticación
              </CardTitle>
              <CardDescription>Configuración de sesiones, intentos de login y autenticación 2FA.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSeguridadSubmit}>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg bg-muted/10">
                  <div className="space-y-0.5">
                    <Label htmlFor="sesionTimeoutMinutos" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Tiempo de sesión (minutos)
                    </Label>
                    <p className="text-sm text-muted-foreground">Tiempo de inactividad antes de cerrar sesión</p>
                  </div>
                  <Input
                    id="sesionTimeoutMinutos"
                    name="sesionTimeoutMinutos"
                    type="number"
                    className="w-24 mt-2 sm:mt-0"
                    defaultValue={config.seguridad.sesionTimeoutMinutos}
                    min={5}
                    max={480}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg bg-muted/10">
                  <div className="space-y-0.5">
                    <Label htmlFor="requiere2FA" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Autenticación de dos factores (2FA)
                    </Label>
                    <p className="text-sm text-muted-foreground">Requerir código de verificación en cada inicio de sesión</p>
                  </div>
                  <Switch
                    name="requiere2FA"
                    defaultChecked={config.seguridad.requiere2FA}
                    className="mt-2 sm:mt-0"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg bg-muted/10">
                  <div className="space-y-0.5">
                    <Label htmlFor="intentosMaximos" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Intentos máximos de login
                    </Label>
                    <p className="text-sm text-muted-foreground">Número de intentos fallidos antes de bloquear cuenta</p>
                  </div>
                  <Input
                    id="intentosMaximos"
                    name="intentosMaximos"
                    type="number"
                    className="w-24 mt-2 sm:mt-0"
                    defaultValue={config.seguridad.intentosMaximos}
                    min={3}
                    max={10}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4 rounded-b-lg">
                <Button type="submit" disabled={saving} className="ml-auto">
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracionPage;