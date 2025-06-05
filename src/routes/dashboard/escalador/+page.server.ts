import { redirect, fail } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types';

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

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);
    return redirect(302, '/');
  }
}; 