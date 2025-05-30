<svelte:head>
  <title>Registro - Tuentreno</title>
  <meta name="description" content="Crea tu cuenta en Tuentreno y accede a tu panel de entrenamiento personalizado." />
</svelte:head>

<script lang="ts">
import '../../app.css';
import { enhance } from '$app/forms';
import type { ActionData } from './$types';
let { form }: { form: ActionData } = $props();
let isLoading = $state(false);
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
  <div class="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col items-center">
    <a href="/" class="mb-6 flex items-center gap-2 select-none">
      <img src="/logo.webp" alt="Tuentreno logo" class="w-8 h-8 rounded" />
      <span class="font-extrabold text-xl text-purple-800 tracking-tight">Tuentreno</span>
    </a>
    <h1 class="text-2xl font-bold text-center mb-2 text-gray-900">Crear cuenta</h1>
    <p class="text-center text-gray-500 mb-8 text-base">Regístrate para acceder a tu panel de entrenamiento personalizado</p>
    <form class="w-full animate-fade-in" method="post" use:enhance={() => {
      isLoading = true;
      return async ({ result, update }) => {
        isLoading = false;
        await update();
      };
    }}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-gray-700 mb-1 font-medium" for="first_name">Nombre</label>
          <input id="first_name" name="first_name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
        </div>
        <div>
          <label class="block text-gray-700 mb-1 font-medium" for="last_name">Apellidos</label>
          <input id="last_name" name="last_name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1 font-medium" for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" autocomplete="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1 font-medium" for="username">Usuario</label>
        <input id="username" name="username" type="text" autocomplete="username" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-gray-700 mb-1 font-medium" for="password">Contraseña</label>
          <input id="password" name="password" type="password" autocomplete="new-password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
        </div>
        <div>
          <label class="block text-gray-700 mb-1 font-medium" for="confirm_password">Confirmar contraseña</label>
          <input id="confirm_password" name="confirm_password" type="password" autocomplete="new-password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1 font-medium" for="role">Rol</label>
        <select id="role" name="role" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading}>
          <option value="">Selecciona un rol</option>
          <option value="escalador">Escalador</option>
          <option value="entrenador">Entrenador</option>
        </select>
      </div>
      {#if form?.message}
        <div class="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm mb-4">
          {form.message}
        </div>
      {/if}
      <button
        class="w-full py-3 rounded-lg bg-purple-700 text-white font-bold text-lg shadow hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Registrando...' : 'Crear cuenta'}
      </button>
    </form>
    <div class="w-full flex items-center my-8">
      <div class="flex-grow border-t border-gray-200"></div>
      <span class="mx-4 text-gray-400 text-sm">o</span>
      <div class="flex-grow border-t border-gray-200"></div>
    </div>
    <div class="text-center text-sm text-gray-600 w-full">
      ¿Ya tienes cuenta?
      <a href="/login" class="text-purple-700 hover:underline font-semibold ml-1">Inicia sesión</a>
    </div>
  </div>
</div>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fade-in 0.5s cubic-bezier(.4,0,.2,1) both;
}
</style> 