export const inferRoleFromEmail = (email?: string): string => {
  if (!email) return 'employee';
  if (email.includes('admin')) return 'admin';
  if (email.includes('rrhh')) return 'rrhh';
  return 'employee';
};

export const normalizeRole = (role: string): string => {
  const r = role?.toLowerCase();
  if (r === 'admin') return 'admin';
  if (r === 'rrhh') return 'rrhh';
  return 'employee';
};

export const resolveUserRole = (dbRole: string | null, email?: string): string => {
  if (dbRole) return normalizeRole(dbRole);
  return inferRoleFromEmail(email);
};