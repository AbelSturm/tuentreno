import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!validateName(name)) return fail(400, { message: 'Nombre inválido' });
    if (!validateEmail(email)) return fail(400, { message: 'Correo electrónico inválido' });
    if (!validateMessage(message)) return fail(400, { message: 'Mensaje demasiado corto' });

    console.log('Nuevo mensaje de contacto:', { name, email, message });
    return { message: 'Gracias por contactarnos. Responderemos pronto.' };
  }
};

function validateName(name: unknown): name is string {
  return typeof name === 'string' && name.trim().length >= 2 && name.length <= 64;
}

function validateEmail(email: unknown): email is string {
  return (
    typeof email === 'string' &&
    email.length >= 3 &&
    email.length <= 255 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function validateMessage(message: unknown): message is string {
  return typeof message === 'string' && message.trim().length >= 10 && message.length <= 1000;
}
