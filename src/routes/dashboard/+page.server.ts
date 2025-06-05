import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { clientTrainer, user } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const userData = requireLogin(event);

	// Fetch full user info for sidebar avatar
	const [fullUser] = await db.select().from(user).where(eq(user.id, userData.id));

	return { 
		user: {
			...userData,
			firstName: fullUser?.firstName,
			lastName: fullUser?.lastName,
			email: fullUser?.email,
			profilePicture: fullUser?.profilePicture
		}
	};
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	}
};

function requireLogin(event: Parameters<PageServerLoad>[0]) {
	const { locals } = event;

	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return locals.user;
} 