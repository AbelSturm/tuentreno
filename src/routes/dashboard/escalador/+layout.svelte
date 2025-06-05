<script lang="ts">
import { page } from '$app/stores';

let sidebarOpen = false;

function isActive(href: string): boolean {
  return $page.url.pathname === href;
}

function getNavItemClasses(href: string): string {
  const baseClasses = "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors";
  const activeClasses = "bg-purple-100 text-purple-700 border-r-4 border-purple-600";
  const inactiveClasses = "text-gray-700 hover:bg-gray-100 hover:text-purple-600";
  return isActive(href) ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
}

function handleOverlayKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    sidebarOpen = false;
  }
}

let { user } = $page.data;
</script>

<div class="h-screen flex bg-gray-50 overflow-hidden">
  {#if sidebarOpen}
    <div class="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
      <div 
        class="fixed inset-0 bg-gray-600 bg-opacity-75" 
        onclick={() => sidebarOpen = false}
        onkeydown={handleOverlayKeydown}
        role="button"
        tabindex="-1"
        aria-label="Cerrar menú lateral"
      ></div>
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
      <button
        class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        onclick={() => sidebarOpen = false}
        aria-label="Cerrar menú lateral"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <!-- User avatar/info -->
    <div class="flex flex-col items-center gap-2 px-6 py-6 border-b border-gray-200 bg-purple-50 flex-shrink-0">
      {#if user?.profilePicture}
        <img src={user.profilePicture} alt="Avatar" class="w-14 h-14 rounded-full object-cover border-2 border-purple-200" />
      {:else}
        <div class="w-14 h-14 rounded-full bg-purple-200 flex items-center justify-center text-2xl font-bold text-purple-800">
          {getInitials(user?.firstName, user?.lastName)}
        </div>
      {/if}
      <div class="text-center">
        <div class="font-semibold text-gray-900 text-base">{user?.firstName} {user?.lastName}</div>
        <div class="text-xs text-gray-500 truncate max-w-[180px]">{user?.email}</div>
      </div>
    </div>
    <!-- User role indicator -->
    <div class="px-6 py-4 border-b border-gray-200 bg-purple-50 flex-shrink-0">
      <p class="text-sm font-medium text-purple-800">Panel de Escalador</p>
    </div>
    <!-- Navigation -->
    <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto" aria-label="Navegación principal">
      <a href="/dashboard/escalador" class={getNavItemClasses('/dashboard/escalador')} aria-current={isActive('/dashboard/escalador') ? 'page' : undefined}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/escalador') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z"></path>
        </svg>
        Dashboard
      </a>
      <a href="/dashboard/escalador/mi-entrenamiento" class={getNavItemClasses('/dashboard/escalador/mi-entrenamiento')} aria-current={isActive('/dashboard/escalador/mi-entrenamiento') ? 'page' : undefined}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/escalador/mi-entrenamiento') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Mi Entrenamiento
      </a>
      <a href="/dashboard/escalador/progreso" class={getNavItemClasses('/dashboard/escalador/progreso')} aria-current={isActive('/dashboard/escalador/progreso') ? 'page' : undefined}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/escalador/progreso') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        Progreso
      </a>
      <a href="/dashboard/escalador/cuestionarios" class={getNavItemClasses('/dashboard/escalador/cuestionarios')} aria-current={isActive('/dashboard/escalador/cuestionarios') ? 'page' : undefined}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/escalador/cuestionarios') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Cuestionarios
      </a>
      <a href="/dashboard/escalador/rutas" class={getNavItemClasses('/dashboard/escalador/rutas')} aria-current={isActive('/dashboard/escalador/rutas') ? 'page' : undefined}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/escalador/rutas') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        Rutas
      </a>
      <a href="/dashboard/profile" class={getNavItemClasses('/dashboard/profile')} aria-current={isActive('/dashboard/profile') ? 'page' : undefined}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/profile') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" />
        </svg>
        Perfil
      </a>
    </nav>
  </div>
  <main class="flex-1 p-8 overflow-y-auto">
    <slot />
  </main>
</div>

<style>
  .nav-link {
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: #7c3aed;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s;
  }
  .nav-link:hover, .nav-link.active {
    background: #f3e8ff;
    color: #4c1d95;
  }
</style> 