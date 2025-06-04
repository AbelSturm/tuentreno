import { db } from '$lib/server/db';
import { clientInvite, clientTrainer } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { token } = params;

	// Find invite
	const [invite] = await db.select().from(clientInvite).where(and(
		eq(clientInvite.token, token),
		eq(clientInvite.used, false)
	));

	if (!invite) {
		return { invalid: true };
	}

	return {
		invite,
		user: locals.user
	};
};

export const actions: Actions = {
	default: async ({ params, locals }) => {
		const { token } = params;

		if (!locals.user) {
			return fail(401, { error: 'Debes iniciar sesión o registrarte.' });
		}

		// Find invite
		const [invite] = await db.select().from(clientInvite).where(and(
			eq(clientInvite.token, token),
			eq(clientInvite.used, false)
		));

		if (!invite) {
			return fail(400, { error: 'Invitación no válida o ya utilizada.' });
		}

		// Create client-trainer relationship
		await db.insert(clientTrainer).values({
			id: crypto.randomUUID(),
			clientId: locals.user.id,
			trainerId: invite.trainerId,
			status: 'active',
			startDate: new Date()
		});

		// Mark invite as used
		await db.update(clientInvite)
			.set({ used: true, acceptedAt: new Date() })
			.where(eq(clientInvite.id, invite.id));

		return { success: true };
	}
}; 