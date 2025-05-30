<svelte:head>
  <title>Página no encontrada - Tuentreno</title>
  <meta name="description" content="La página que buscas no existe. Vuelve a la página principal de Tuentreno." />
</svelte:head>

<script lang="ts">
import { goto } from '$app/navigation';
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
  <div class="mb-8">
    <img 
      src="/climbing-hero.webp" 
      alt="Escalador en acción" 
      class="rounded-lg shadow-lg object-cover mx-auto opacity-75" 
      style="width: 600px; height: 400px;"
    />
  </div>
  
  <h1 class="text-4xl md:text-5xl font-bold text-purple-700 mb-4">404</h1>
  <h2 class="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
  <p class="text-lg text-gray-600 mb-8 max-w-md">
    Lo sentimos, no hemos encontrado la página que buscas. 
    <br class="hidden sm:block" />
    ¿Te gustaría volver a escalar hacia la página principal?
  </p>
  
  <div class="flex flex-col sm:flex-row gap-4">
    <button
      class="px-8 py-3 rounded-lg bg-purple-700 text-white font-semibold shadow hover:bg-purple-800 transition duration-150 ease-in-out"
      on:click={() => goto('/')}
    >
      Volver al inicio
    </button>
    
    <button
      class="px-8 py-3 rounded-lg border-2 border-purple-700 bg-white text-purple-700 font-semibold shadow hover:bg-purple-50 transition duration-150 ease-in-out"
      on:click={() => window.history.back()}
    >
      Página anterior
    </button>
  </div>
  
  <div class="mt-12 text-sm text-gray-500">
    <p>Si crees que esto es un error, puedes contactarnos</p>
  </div>
</div> 