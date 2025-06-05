import { db } from '$lib/server/db';
import { clientTrainer, user } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;

	if (!locals.user) {
		throw redirect(302, '/login');
	}

	if (locals.user.role !== 'entrenador') {
		throw redirect(302, '/dashboard');
	}

	const clients = await db
		.select({
			id: clientTrainer.id,
			clientId: clientTrainer.clientId,
			status: clientTrainer.status,
			startDate: clientTrainer.startDate,
			endDate: clientTrainer.endDate,
			monthlyFee: clientTrainer.monthlyFee,
			notes: clientTrainer.notes,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			experience: user.experience,
			maxGrade: user.maxGrade,
			profilePicture: user.profilePicture
		})
		.from(clientTrainer)
		.innerJoin(user, eq(clientTrainer.clientId, user.id))
		.where(eq(clientTrainer.trainerId, locals.user.id))
		.orderBy(desc(clientTrainer.startDate));

	return {
		user: locals.user,
		clients
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