<script lang="ts">
import { enhance } from '$app/forms';

interface Props {
  userRole: 'entrenador' | 'escalador';
  pageTitle: string;
}

let { userRole, pageTitle, children }: Props & { children: any } = $props();

// State for mobile sidebar toggle
let sidebarOpen = $state(false);
</script>

<svelte:head>
  <title>{pageTitle} - Tuentreno</title>
</svelte:head>

<div class="h-screen flex bg-gray-50 overflow-hidden">
  <!-- Mobile sidebar overlay -->
  {#if sidebarOpen}
    <div class="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" onclick={() => sidebarOpen = false}></div>
    </div>
  {/if}

  <!-- Sidebar -->
  <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col">
    <!-- Logo -->
    <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
      <a href="/" class="flex items-center gap-2 select-none">
        <img src="/logo.webp" alt="Tuentreno logo" class="w-8 h-8 rounded" />
        <span class="font-extrabold text-lg text-purple-800 tracking-tight">Tuentreno</span>
      </a>
      <!-- Mobile close button -->
      <button
        class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        onclick={() => sidebarOpen = false}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- User role indicator -->
    <div class="px-6 py-4 border-b border-gray-200 bg-purple-50 flex-shrink-0">
      <p class="text-sm font-medium text-purple-800">
        {userRole === 'entrenador' ? 'Panel de Entrenador' : 'Panel de Escalador'}
      </p>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
      <a 
        href="/dashboard" 
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600"
      >
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z"></path>
        </svg>
        Dashboard
      </a>

      {#if userRole === 'entrenador'}
        <a 
          href="/dashboard/clientes" 
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Clientes
        </a>
        <a 
          href="/dashboard/entrenamientos" 
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Entrenamientos
        </a>
        <a 
          href="/dashboard/estadisticas" 
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Estadísticas
        </a>
      {:else}
        <a 
          href="/dashboard/mi-entrenamiento" 
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Mi Entrenamiento
        </a>
        <a 
          href="/dashboard/progreso" 
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Progreso
        </a>
        <a 
          href="/dashboard/rutas" 
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-purple-600"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Rutas
        </a>
      {/if}
    </nav>

    <!-- Logout button at bottom -->
    <div class="p-4 border-t border-gray-200 flex-shrink-0">
      <form method="post" action="?/logout" use:enhance class="w-full">
        <button
          class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          type="submit"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Cerrar sesión
        </button>
      </form>
    </div>
  </div>

  <!-- Main content area -->
  <div class="flex-1 flex flex-col lg:ml-0">
    <!-- Top header for mobile -->
    <div class="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 lg:hidden flex-shrink-0">
      <div class="flex items-center justify-between h-16 px-4">
        <button
          class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          onclick={() => sidebarOpen = true}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <img src="/logo.webp" alt="Tuentreno logo" class="w-6 h-6 rounded" />
          <span class="font-extrabold text-lg text-purple-800 tracking-tight">Tuentreno</span>
        </div>
        <div class="w-10"></div> <!-- Spacer for center alignment -->
      </div>
    </div>

    <!-- Main content -->
    <main class="flex-1 py-6 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      {@render children()}
    </main>
  </div>
</div> 