import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export async function POST(event) {
  if (!event.locals.session) {
    return new Response(null, { status: 401 });
  }
  await auth.invalidateSession(event.locals.session.id);
  auth.deleteSessionTokenCookie(event);
  throw redirect(302, '/');
} 