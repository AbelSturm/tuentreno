<svelte:head>
  <title>Tuentreno - Plataforma de Entrenamiento de Escalada</title>
  <meta name="description" content="Conecta con entrenadores expertos de escalada y recibe un plan de entrenamiento personalizado. Alcanza nuevas alturas en tu escalada con Tuentreno." />
</svelte:head>

<script lang="ts">
import Navbar from '$lib/Navbar.svelte';
import { goto } from '$app/navigation';
// Script vacío para tipado TypeScript

function irARegistro(rol: 'escalador' | 'entrenador') {
  goto(`/register?rol=${rol}`);
}
</script>

<Navbar />

<main class="min-h-screen flex flex-col justify-between text-gray-800">
  <!-- HERO SECTION -->
  <section class="relative flex flex-1 flex-col items-center justify-center text-center px-4 py-12 animate-fade-in">
    <img src="/climbing-hero.webp" alt="Escalador en una montaña" class="absolute inset-0 w-full h-full object-cover opacity-50 z-0"/>
    <div class="relative z-10 pt-20 md:pt-24">
      <h1 class="text-3xl md:text-5xl font-extrabold text-purple-700 mb-4 transition-opacity duration-700 opacity-0 animate-fade-in">Alcanza nuevas alturas en tu escalada</h1>
      <p class="text-base md:text-xl text-gray-800 mb-8 max-w-xl mx-auto transition-opacity duration-700 delay-100 opacity-0 animate-fade-in">Conecta con entrenadores expertos y recibe un plan de entrenamiento personalizado para lograr tus metas.</p>
      <div class="w-full flex flex-col gap-3 max-w-xs mx-auto">
        <button on:click={() => irARegistro('escalador')} class="w-full min-h-[44px] rounded-lg bg-purple-700 text-white font-semibold text-lg shadow hover:bg-purple-800 transition transition-opacity duration-700 delay-200 opacity-0 animate-fade-in">Soy escalador</button>
        <span class="text-xs text-gray-500 mt-[-8px] mb-2 transition-opacity duration-700 delay-300 opacity-0 animate-fade-in">¡Es gratis!</span>
        <button on:click={() => irARegistro('entrenador')} class="w-full min-h-[44px] rounded-lg border-2 border-purple-700 bg-white text-purple-700 font-semibold text-lg shadow hover:bg-purple-50 transition transition-opacity duration-700 delay-400 opacity-0 animate-fade-in">Soy entrenador</button>
      </div>
    </div>
  </section>

  <!-- BENEFITS SECTION -->
  <section class="w-full max-w-4xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
    <!-- Item 1: Image Left, Text Right -->
    <div class="flex items-center gap-4 p-4 animate-fade-in-stagger">
      <img src="/training.webp" alt="Entrenamiento personalizado" class="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover text-purple-700 flex-shrink-0" />
      <div class="text-left">
        <h3 class="font-bold text-base mb-1">Plan personalizado a tu medida</h3>
        <p class="text-gray-600 text-sm">Entrena según tus objetivos y nivel.</p>
      </div>
    </div>
    <!-- Item 2: Text Left, Image Right -->
    <div class="flex items-center gap-4 p-4 animate-fade-in-stagger" style="animation-delay:0.1s">
      <div class="text-right md:order-2">
        <h3 class="font-bold text-base mb-1">Seguimiento de tu progreso</h3>
        <p class="text-gray-600 text-sm">Visualiza avances y mejora cada día.</p>
      </div>
      <img src="/seguimiento.webp" alt="Seguimiento de progreso" class="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover text-purple-700 flex-shrink-0 md:order-1" />
    </div>
    <!-- Item 3: Image Left, Text Right -->
    <div class="flex items-center gap-4 p-4 animate-fade-in-stagger" style="animation-delay:0.2s">
      <img src="/entrena-lugar.webp" alt="Entrena desde cualquier lugar" class="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover text-purple-700 flex-shrink-0" />
      <div class="text-left">
        <h3 class="font-bold text-base mb-1">Entrena desde cualquier lugar</h3>
        <p class="text-gray-600 text-sm">Accede online y mantente conectado.</p>
      </div>
    </div>
    <!-- Item 4: Text Left, Image Right -->
    <div class="flex items-center gap-4 p-4 animate-fade-in-stagger" style="animation-delay:0.3s">
      <div class="text-right md:order-2">
        <h3 class="font-bold text-base mb-1">Apoyo de entrenadores expertos</h3>
        <p class="text-gray-600 text-sm">Recibe feedback y motivación constante.</p>
      </div>
      <img src="/trainer.webp" alt="Apoyo de entrenadores expertos" class="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover text-purple-700 flex-shrink-0 md:order-1" />
    </div>
  </section>

  <!-- FINAL CTA SECTION -->
  <section class="w-full flex flex-col items-center justify-center py-10 px-4 bg-purple-700 text-white text-center animate-fade-in">
    <h2 class="text-xl md:text-2xl font-bold mb-6">¿Listo para llevar tu escalada al próximo nivel? Únete a Tuentreno hoy mismo.</h2>
    <button on:click={() => goto('/register')} class="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-purple-700 font-bold text-lg shadow hover:bg-purple-50 transition">
      Crear mi cuenta <span class="text-xl">➡️</span>
    </button>
  </section>

  <!-- CONTACT SECTION -->
  <section class="w-full py-12 px-4 bg-gray-50 animate-fade-in">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-purple-700 mb-4">¿Tienes preguntas o necesitas ayuda?</h2>
      <p class="text-gray-700 mb-6">Nos encantaría saber de ti. Contáctanos si tienes alguna duda sobre la plataforma, cómo unirte o cualquier otra consulta.</p>
      <button on:click={() => goto('/contact')} class="px-8 py-3 rounded-lg bg-purple-700 text-white font-semibold shadow hover:bg-purple-800 transition">
        Contactar ahora
      </button>
    </div>
  </section>

</main>

<footer class="w-full bg-gray-800 text-gray-300 py-6 px-4 mt-8">
  <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <nav class="flex gap-4 text-sm mb-2 md:mb-0">
      <a href="#" class="hover:underline">Privacidad</a>
      <span class="text-gray-500">|</span>
      <a href="#" class="hover:underline">Términos</a>
      <span class="text-gray-500">|</span>
      <a href="/contact" class="hover:underline">Contacto</a>
    </nav>
    <div class="text-xs text-gray-400 text-center">© 2025 Tuentreno. Todos los derechos reservados.</div>
  </div>
</footer>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
}
@keyframes fade-in-stagger {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in-stagger {
  animation: fade-in-stagger 1s cubic-bezier(.4,0,.2,1) both;
}
</style>
