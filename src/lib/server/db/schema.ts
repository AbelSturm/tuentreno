import { pgTable, serial, integer, text, timestamp, boolean, decimal, date } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull(), // 'entrenador' | 'escalador'
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	profilePicture: text('profile_picture'),
	phone: text('phone'),
	birthDate: date('birth_date'),
	experience: text('experience'), // 'principiante' | 'intermedio' | 'avanzado' | 'experto'
	maxGrade: text('max_grade') // Grado máximo alcanzado (ej: '6a+', '7b', etc.)
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// Relación cliente-entrenador
export const clientTrainer = pgTable('client_trainer', {
	id: text('id').primaryKey(),
	clientId: text('client_id')
		.notNull()
		.references(() => user.id),
	trainerId: text('trainer_id')
		.notNull()
		.references(() => user.id),
	status: text('status').notNull().default('active'), // 'active' | 'inactive' | 'paused'
	startDate: timestamp('start_date', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	endDate: timestamp('end_date', { withTimezone: true, mode: 'date' }),
	monthlyFee: decimal('monthly_fee', { precision: 10, scale: 2 }),
	notes: text('notes')
});

// Sesiones de entrenamiento
export const trainingSession = pgTable('training_session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	trainerId: text('trainer_id')
		.references(() => user.id),
	title: text('title').notNull(),
	description: text('description'),
	type: text('type').notNull(), // 'fuerza' | 'resistencia' | 'tecnica' | 'boulder' | 'via' | 'flexibilidad'
	date: timestamp('date', { withTimezone: true, mode: 'date' }).notNull(),
	duration: integer('duration'), // duración en minutos
	status: text('status').notNull().default('programada'), // 'programada' | 'completada' | 'cancelada'
	difficulty: text('difficulty'), // 'facil' | 'moderado' | 'dificil' | 'muy_dificil'
	location: text('location'),
	notes: text('notes'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

// Ejercicios específicos dentro de una sesión
export const exercise = pgTable('exercise', {
	id: text('id').primaryKey(),
	sessionId: text('session_id')
		.notNull()
		.references(() => trainingSession.id),
	name: text('name').notNull(),
	type: text('type').notNull(), // 'campus' | 'fingerboard' | 'boulder' | 'via' | 'cardio' | 'fuerza' | 'flexibilidad'
	sets: integer('sets'),
	reps: integer('reps'),
	weight: decimal('weight', { precision: 5, scale: 2 }), // peso en kg
	duration: integer('duration'), // duración en segundos
	restTime: integer('rest_time'), // descanso en segundos
	grade: text('grade'), // grado de la ruta/boulder
	holds: text('holds'), // tipo de presas
	description: text('description'),
	completed: boolean('completed').notNull().default(false),
	order: integer('order').notNull() // orden del ejercicio en la sesión
});

// Rutas de escalada
export const route = pgTable('route', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	grade: text('grade').notNull(),
	type: text('type').notNull(), // 'boulder' | 'via' | 'multipitch'
	location: text('location').notNull(),
	sector: text('sector'),
	description: text('description'),
	height: integer('height'), // altura en metros
	bolts: integer('bolts'), // número de seguros
	style: text('style'), // 'deportiva' | 'tradicional' | 'mixta'
	rockType: text('rock_type'), // 'caliza' | 'granito' | 'arenisca' | 'conglomerado'
	orientation: text('orientation'), // 'norte' | 'sur' | 'este' | 'oeste'
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	isPublic: boolean('is_public').notNull().default(true)
});

// Ascensos de rutas por usuarios
export const routeAscent = pgTable('route_ascent', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	routeId: text('route_id')
		.notNull()
		.references(() => route.id),
	date: timestamp('date', { withTimezone: true, mode: 'date' }).notNull(),
	style: text('style').notNull(), // 'flash' | 'onsight' | 'redpoint' | 'toprope' | 'aid'
	attempts: integer('attempts'),
	rating: integer('rating'), // valoración de 1-5 estrellas
	notes: text('notes'),
	isPersonalRecord: boolean('is_personal_record').notNull().default(false)
});

// Progreso del usuario
export const userProgress = pgTable('user_progress', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	date: date('date').notNull(),
	maxGrade: text('max_grade'),
	weight: decimal('weight', { precision: 5, scale: 2 }),
	bodyFatPercentage: decimal('body_fat_percentage', { precision: 5, scale: 2 }),
	fingerStrength: integer('finger_strength'), // en kg
	pullUps: integer('pull_ups'),
	campusLevel: text('campus_level'),
	flexibility: integer('flexibility'), // puntuación de flexibilidad
	notes: text('notes')
});

// Planes de entrenamiento
export const trainingPlan = pgTable('training_plan', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	trainerId: text('trainer_id')
		.notNull()
		.references(() => user.id),
	duration: integer('duration'), // duración en semanas
	level: text('level').notNull(), // 'principiante' | 'intermedio' | 'avanzado'
	focus: text('focus').notNull(), // 'fuerza' | 'resistencia' | 'tecnica' | 'mixto'
	isTemplate: boolean('is_template').notNull().default(false),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

// Asignación de planes a usuarios
export const userTrainingPlan = pgTable('user_training_plan', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	planId: text('plan_id')
		.notNull()
		.references(() => trainingPlan.id),
	startDate: date('start_date').notNull(),
	endDate: date('end_date'),
	status: text('status').notNull().default('active'), // 'active' | 'completed' | 'paused'
	progress: integer('progress').notNull().default(0), // progreso en porcentaje
	assignedBy: text('assigned_by')
		.references(() => user.id)
});

// Estadísticas mensuales del entrenador
export const trainerStats = pgTable('trainer_stats', {
	id: text('id').primaryKey(),
	trainerId: text('trainer_id')
		.notNull()
		.references(() => user.id),
	month: integer('month').notNull(),
	year: integer('year').notNull(),
	activeClients: integer('active_clients').notNull().default(0),
	totalSessions: integer('total_sessions').notNull().default(0),
	revenue: decimal('revenue', { precision: 10, scale: 2 }).notNull().default('0'),
	newClients: integer('new_clients').notNull().default(0),
	retainedClients: integer('retained_clients').notNull().default(0)
});

// Invitación de cliente
export const clientInvite = pgTable('client_invite', {
	id: text('id').primaryKey(),
	trainerId: text('trainer_id').notNull().references(() => user.id),
	email: text('email').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	acceptedAt: timestamp('accepted_at', { withTimezone: true, mode: 'date' }),
	used: boolean('used').notNull().default(false)
});

// Tipos TypeScript para todas las tablas
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type ClientTrainer = typeof clientTrainer.$inferSelect;
export type TrainingSession = typeof trainingSession.$inferSelect;
export type Exercise = typeof exercise.$inferSelect;
export type Route = typeof route.$inferSelect;
export type RouteAscent = typeof routeAscent.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type TrainingPlan = typeof trainingPlan.$inferSelect;
export type UserTrainingPlan = typeof userTrainingPlan.$inferSelect;
export type TrainerStats = typeof trainerStats.$inferSelect;
export type ClientInvite = typeof clientInvite.$inferSelect;
