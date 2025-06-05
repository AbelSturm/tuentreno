import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (!locals.user) throw redirect(302, '/login');
  if (url.pathname === '/dashboard' || url.pathname === '/dashboard/') {
    if (locals.user.role === 'entrenador') {
      throw redirect(302, '/dashboard/entrenador');
    } else {
      throw redirect(302, '/dashboard/escalador');
    }
  }
  return { user: locals.user };
}; 