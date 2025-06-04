import { db } from '$lib/server/db';
import { clientTrainer, user, trainingSession } from '$lib/server/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user || locals.user.role !== 'entrenador') {
		throw redirect(302, '/login');
	}

	const clientId = params.id;

	// Check trainer-client relationship
	const [relation] = await db.select().from(clientTrainer)
		.where(and(
			eq(clientTrainer.clientId, clientId),
			eq(clientTrainer.trainerId, locals.user.id)
		));

	if (!relation) {
		throw error(403, 'No tienes acceso a este cliente');
	}

	// Fetch client info
	const [client] = await db.select().from(user).where(eq(user.id, clientId));
	if (!client) {
		throw error(404, 'Cliente no encontrado');
	}

	// Fetch recent sessions
	const sessions = await db.select().from(trainingSession)
		.where(and(
			eq(trainingSession.userId, clientId),
			eq(trainingSession.trainerId, locals.user.id)
		))
		.orderBy(desc(trainingSession.date))
		.limit(10);

	return {
		relation,
		client,
		sessions
	};
}; 