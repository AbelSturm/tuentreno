import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
