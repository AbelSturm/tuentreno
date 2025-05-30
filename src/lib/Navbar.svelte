<script lang="ts">
import { onMount, onDestroy } from 'svelte';

let isMobileMenuOpen = false;
let isMobileView = false; 

function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
}

const checkMobileView = () => {
  if (typeof window !== 'undefined') {
    isMobileView = window.innerWidth < 768; // Tailwind's md breakpoint
  }
};

onMount(() => {
  checkMobileView();
  window.addEventListener('resize', checkMobileView, { passive: true });
  return () => {
    window.removeEventListener('resize', checkMobileView);
  };
});
</script>

<header
  class="w-full absolute top-0 left-0 right-0 z-50 py-3 px-4 md:px-6 flex justify-between items-center transition-colors duration-300 ease-in-out"
  class:bg-white={isMobileView || isMobileMenuOpen} 
  class:shadow-md={isMobileView || isMobileMenuOpen} 
  class:md:bg-transparent={!isMobileView && !isMobileMenuOpen}
  class:md:shadow-none={!isMobileView && !isMobileMenuOpen}  
>
  <a href="/" class="font-bold text-xl text-purple-800 transition-colors duration-300 ease-in-out">tuentreno</a>

  <!-- Desktop Button -->
  <button
    class="hidden md:block border rounded-lg px-5 py-2 font-semibold text-purple-800 border-purple-800 transition-colors duration-300 ease-in-out hover:bg-purple-800 hover:text-white"
    type="button"
    on:click={() => window.location.href = '/login'}
  >
    Entrar
  </button>

  <!-- Mobile Hamburger Icon -->
  <button class="md:hidden p-2" on:click={toggleMobileMenu} aria-label="Abrir menú">
    {#if isMobileMenuOpen}
      <svg class="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {:else}
      <svg class="w-6 h-6 text-purple-800 transition-colors duration-300 ease-in-out" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    {/if}
  </button>
</header>

<!-- Mobile Menu Panel -->
{#if isMobileMenuOpen}
  <div class="md:hidden fixed inset-0 top-[60px] bg-white z-40 flex flex-col items-center justify-center animate-fade-in-down shadow-lg pt-4">
    <nav class="flex flex-col items-center gap-6 w-full px-4">
      <a
        href="/login"
        class="text-purple-700 font-semibold text-lg py-3 px-6 rounded-lg hover:bg-purple-50 transition w-full text-center border border-purple-700"
        on:click={() => isMobileMenuOpen = false}
      >
        Entrar
      </a>
    </nav>
  </div>
{/if}

<style>
  @keyframes fade-in-down {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down {
    animation: fade-in-down 0.3s ease-out both;
  }
  header {
    min-height: 60px; 
  }
</style> 