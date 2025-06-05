import { db } from '$lib/server/db';
import { clientTrainer, user } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

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