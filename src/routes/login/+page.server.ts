import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq, or } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const emailOrUsername = formData.get('email');
		const password = formData.get('password');

		if (!validateEmailOrUsername(emailOrUsername)) {
			return fail(400, {
				message: 'Correo electrónico o nombre de usuario inválido'
			});
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Contraseña inválida (mín 6, máx 255 caracteres)' });
		}

		const results = await db
			.select()
			.from(table.user)
			.where(
				or(
					eq(table.user.email, String(emailOrUsername)),
					eq(table.user.username, String(emailOrUsername))
				)
			);

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Correo electrónico o contraseña incorrectos' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Correo electrónico o contraseña incorrectos' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/dashboard');
	}
};

function validateEmailOrUsername(input: unknown): input is string {
	if (typeof input !== 'string' || input.length < 3 || input.length > 255) {
		return false;
	}
	return true;
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}