import { db } from '$lib/server/db';
import { clientTrainer, user, trainingSession } from '$lib/server/db/schema';
import { eq, and, desc, count } from 'drizzle-orm';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;

	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// Solo los entrenadores pueden ver esta página
	if (locals.user.role !== 'entrenador') {
		throw error(403, 'Acceso denegado');
	}

	try {
		// Obtener todos los clientes del entrenador
		const clients = await db
			.select({
				id: clientTrainer.id,
				clientId: clientTrainer.clientId,
				status: clientTrainer.status,
				startDate: clientTrainer.startDate,
				endDate: clientTrainer.endDate,
				monthlyFee: clientTrainer.monthlyFee,
				notes: clientTrainer.notes,
				// Datos del cliente
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

		// Obtener estadísticas de cada cliente
		const clientStats = await Promise.all(
			clients.map(async (client) => {
				const [sessionCount] = await db
					.select({
						count: count()
					})
					.from(trainingSession)
					.where(
						and(
							eq(trainingSession.userId, client.clientId),
							eq(trainingSession.trainerId, locals.user!.id)
						)
					);

				const [lastSession] = await db
					.select({
						date: trainingSession.date,
						title: trainingSession.title,
						status: trainingSession.status
					})
					.from(trainingSession)
					.where(
						and(
							eq(trainingSession.userId, client.clientId),
							eq(trainingSession.trainerId, locals.user!.id)
						)
					)
					.orderBy(desc(trainingSession.date))
					.limit(1);

				return {
					clientId: client.clientId,
					totalSessions: sessionCount.count || 0,
					lastSession: lastSession || null
				};
			})
		);

		// Combinar datos de clientes con estadísticas
		const clientsWithStats = clients.map(client => {
			const stats = clientStats.find(s => s.clientId === client.clientId);
			return {
				...client,
				totalSessions: stats?.totalSessions || 0,
				lastSession: stats?.lastSession || null
			};
		});

		return {
			clients: clientsWithStats
		};
	} catch (err) {
		console.error('Error fetching clients:', err);
		return {
			clients: []
		};
	}
};

export const actions: Actions = {
	updateStatus: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'entrenador') {
			throw error(403, 'Acceso denegado');
		}

		const data = await request.formData();
		const clientTrainerId = data.get('clientTrainerId') as string;
		const newStatus = data.get('status') as string;

		if (!clientTrainerId || !newStatus) {
			throw error(400, 'Datos faltantes');
		}

		try {
			await db
				.update(clientTrainer)
				.set({
					status: newStatus,
					...(newStatus === 'inactive' && { endDate: new Date() })
				})
				.where(
					and(
						eq(clientTrainer.id, clientTrainerId),
						eq(clientTrainer.trainerId, locals.user.id)
					)
				);

			return { success: true };
		} catch (err) {
			console.error('Error updating client status:', err);
			throw error(500, 'Error al actualizar el estado del cliente');
		}
	},

	updateFee: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'entrenador') {
			throw error(403, 'Acceso denegado');
		}

		const data = await request.formData();
		const clientTrainerId = data.get('clientTrainerId') as string;
		const monthlyFee = data.get('monthlyFee') as string;

		if (!clientTrainerId) {
			throw error(400, 'ID del cliente faltante');
		}

		try {
			await db
				.update(clientTrainer)
				.set({
					monthlyFee: monthlyFee ? monthlyFee : null
				})
				.where(
					and(
						eq(clientTrainer.id, clientTrainerId),
						eq(clientTrainer.trainerId, locals.user.id)
					)
				);

			return { success: true };
		} catch (err) {
			console.error('Error updating monthly fee:', err);
			throw error(500, 'Error al actualizar la tarifa mensual');
		}
	}
}; 