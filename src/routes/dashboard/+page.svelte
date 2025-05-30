<svelte:head>
  <title>Dashboard - Tuentreno</title>
  <meta name="description" content="Tu dashboard personal en Tuentreno. Accede a tu panel de entrenamiento personalizado." />
</svelte:head>

<script lang="ts">
import { enhance } from '$app/forms';
let { data } = $props();
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
  <div class="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col items-center">
    <a href="/" class="mb-6 flex items-center gap-2 select-none">
      <img src="/logo.webp" alt="Tuentreno logo" class="w-8 h-8 rounded" />
      <span class="font-extrabold text-xl text-purple-800 tracking-tight">Tuentreno</span>
    </a>
    <h1 class="text-2xl font-bold text-center mb-2 text-gray-900">¡Bienvenido, {data.user.firstName} {data.user.lastName}!</h1>
    <p class="text-center text-gray-500 mb-8 text-base">Este es tu dashboard. Aquí pronto verás tu progreso, entrenamientos y más.</p>
    <form method="post" action="?/logout" use:enhance class="w-full">
      <button
        class="w-full py-3 rounded-lg bg-purple-700 text-white font-bold text-lg shadow hover:bg-purple-800 transition"
        type="submit"
      >
        Cerrar sesión
      </button>
    </form>
  </div>
</div> 