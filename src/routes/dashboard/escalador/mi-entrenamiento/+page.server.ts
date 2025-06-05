import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Lógica de carga del servidor para Mi Entrenamiento
export const load: PageServerLoad = async (event) => {
  const { locals } = event;
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  if (locals.user.role !== 'escalador') {
    throw redirect(302, '/dashboard');
  }
  return {
    user: locals.user
  };
}; 