import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
// TODO: Instala 'argon2' si no está instalado: npm install argon2
import { hash, verify } from 'argon2';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login');
  // Obtener todos los campos del usuario
  const [userProfile] = await db.select().from(userTable).where(eq(userTable.id, locals.user.id));
  return { user: userProfile };
};

// Acciones para actualizar perfil, cambiar contraseña y eliminar cuenta
export const actions: Actions = {
  actualizarPerfil: async ({ request, locals }) => {
    // Verificar autenticación
    if (!locals.user) throw redirect(302, '/login');
    const formData = await request.formData();
    // Convertir todos los valores a string o undefined
    const firstName = formData.get('firstName')?.toString() || undefined;
    const lastName = formData.get('lastName')?.toString() || undefined;
    const email = formData.get('email')?.toString() || undefined;
    const phone = formData.get('phone')?.toString() || undefined;
    const birthDate = formData.get('birthDate')?.toString() || undefined;
    const experience = formData.get('experience')?.toString() || undefined;
    const maxGrade = formData.get('maxGrade')?.toString() || undefined;
    const profilePicture = formData.get('profilePicture')?.toString() || undefined;

    // Solo incluir campos definidos
    const updateData: Record<string, string | undefined> = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (birthDate !== undefined) updateData.birthDate = birthDate;
    if (experience !== undefined) updateData.experience = experience;
    if (maxGrade !== undefined) updateData.maxGrade = maxGrade;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    // Actualizar datos en la base de datos
    await db.update(userTable)
      .set(updateData)
      .where(eq(userTable.id, locals.user.id));

    return { success: true, message: 'Perfil actualizado correctamente.' };
  },
  cambiarPassword: async ({ request, locals }) => {
    if (!locals.user) throw redirect(302, '/login');
    const formData = await request.formData();
    const currentPassword = formData.get('currentPassword')?.toString() || '';
    const newPassword = formData.get('newPassword')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      return fail(400, { message: 'Todos los campos son obligatorios.' });
    }
    if (newPassword !== confirmPassword) {
      return fail(400, { message: 'Las contraseñas no coinciden.' });
    }
    // Obtener usuario actual
    const [dbUser] = await db.select().from(userTable).where(eq(userTable.id, locals.user.id));
    if (!dbUser) return fail(404, { message: 'Usuario no encontrado.' });
    // Verificar contraseña actual
    const valid = await verify(dbUser.passwordHash, currentPassword);
    if (!valid) return fail(400, { message: 'Contraseña actual incorrecta.' });
    // Actualizar contraseña
    const newHash = await hash(newPassword);
    await db.update(userTable).set({ passwordHash: newHash }).where(eq(userTable.id, locals.user.id));
    return { success: true, message: 'Contraseña actualizada correctamente.' };
  },
  eliminarCuenta: async ({ request, locals }) => {
    if (!locals.user) throw redirect(302, '/login');
    // Eliminar usuario de la base de datos
    await db.delete(userTable).where(eq(userTable.id, locals.user.id));
    // Cerrar sesión (opcional: limpiar cookies/sesión)
    throw redirect(302, '/');
  }
}; 