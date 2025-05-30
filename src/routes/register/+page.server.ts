import { hash } from '@node-rs/argon2';
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
	default: async (event) => {
		const formData = await event.request.formData();
		const firstName = formData.get('first_name');
		const lastName = formData.get('last_name');
		const email = formData.get('email');
		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm_password');
		const role = formData.get('role');

		// Validate fields
		if (!validateName(firstName)) return fail(400, { message: 'Nombre inválido' });
		if (!validateName(lastName)) return fail(400, { message: 'Apellidos inválidos' });
		if (!validateEmail(email)) return fail(400, { message: 'Correo electrónico inválido' });
		if (!validateUsername(username)) return fail(400, { message: 'Usuario inválido (mín 3, máx 31 caracteres, solo letras, números, _ y -)' });
		if (!validatePassword(password)) return fail(400, { message: 'Contraseña inválida (mín 6, máx 255 caracteres)' });
		if (password !== confirmPassword) return fail(400, { message: 'Las contraseñas no coinciden' });
		if (role !== 'escalador' && role !== 'entrenador') return fail(400, { message: 'Rol inválido' });

		// Check for unique email/username
		const existing = await db.select().from(table.user).where(
			or(eq(table.user.email, email), eq(table.user.username, username))
		);
		if (existing.length > 0) {
			if (existing[0].email === email) return fail(400, { message: 'El correo ya está registrado' });
			if (existing[0].username === username) return fail(400, { message: 'El usuario ya está registrado' });
		}

		// Hash password
		const passwordHash = await hash(password as string, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// Generate user ID
		const userId = generateUserId();

		// Insert user
		await db.insert(table.user).values({
			id: userId,
			firstName,
			lastName,
			email,
			username,
			passwordHash,
			role
		});

		// Create session
		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, userId);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/dashboard');
	}
};

function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}
function validateName(name: unknown): name is string {
	return typeof name === 'string' && name.length >= 2 && name.length <= 64;
}
function validateEmail(email: unknown): email is string {
	return (
		typeof email === 'string' &&
		email.length >= 3 &&
		email.length <= 255 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	);
}
function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}
function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
} 