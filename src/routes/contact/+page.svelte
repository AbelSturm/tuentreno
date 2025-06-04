<svelte:head>
  <title>Contacto - Tuentreno</title>
  <meta name="description" content="Ponte en contacto con el equipo de Tuentreno" />
</svelte:head>

<script lang="ts">
import '../app.css';
import Navbar from '$lib/Navbar.svelte';
import { enhance } from '$app/forms';
import type { ActionData } from './$types';

let { form }: { form: ActionData } = $props();
let isLoading = $state(false);
</script>

<Navbar />

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
  <div class="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
    <h1 class="text-2xl font-bold text-center mb-4 text-gray-900">Contáctanos</h1>
    <form method="post" class="w-full animate-fade-in" use:enhance={() => {
      isLoading = true;
      return async ({ update }) => {
        isLoading = false;
        await update();
      };
    }}>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1 font-medium" for="name">Nombre</label>
        <input id="name" name="name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1 font-medium" for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading} />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1 font-medium" for="message">Mensaje</label>
        <textarea id="message" name="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition" required disabled={isLoading}></textarea>
      </div>
      {#if form?.message}
        <div class="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm mb-4">
          {form.message}
        </div>
      {/if}
      <button class="w-full py-3 rounded-lg bg-purple-700 text-white font-bold text-lg shadow hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
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
