import { db } from '$lib/server/db';
import { clientInvite } from '$lib/server/db/schema';
import { randomUUID } from 'crypto';
import { redirect, fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'entrenador') {
		throw redirect(302, '/login');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		if (!locals.user || locals.user.role !== 'entrenador') {
			return fail(403, { error: 'Acceso denegado' });
		}

		const data = await request.formData();
		const email = data.get('email') as string;

		if (!email) {
			return fail(400, { error: 'Email requerido' });
		}

		// Generate unique token
		const token = randomUUID();

		// Store invite in DB
		await db.insert(clientInvite).values({
			id: randomUUID(),
			email,
			token,
			trainerId: locals.user.id,
			createdAt: new Date()
		});

		// Build invite URL
		const inviteUrl = `${url.origin}/invitar/${token}`;

		return {
			success: true,
			email,
			inviteUrl
		};
	}
}; 