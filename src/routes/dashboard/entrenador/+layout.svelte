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
  <!-- Mobile header with hamburger menu -->
  <header class="mobile-header fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between h-14 px-4 border-b border-purple-100 lg:hidden">
    <span class="app-brand font-extrabold text-lg text-purple-800 tracking-tight select-none">Tuentreno</span>
    <button
      class="p-2 rounded-md text-purple-700 border border-purple-100 bg-white shadow"
      onclick={() => sidebarOpen = true}
      aria-label="Open sidebar menu"
      type="button"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </header>
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
  <div class="sidebar-drawer fixed inset-y-0 right-0 left-auto z-50 w-64 bg-white shadow-lg transform {sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col">
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
      <p class="text-sm font-medium text-purple-800">Panel de Entrenador</p>
    </div>
    <!-- Navigation -->
    <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto" aria-label="Navegación principal">
      <a href="/dashboard/entrenador" class={getNavItemClasses('/dashboard/entrenador')} aria-current={isActive('/dashboard/entrenador') ? 'page' : undefined} onclick={() => { if (window.innerWidth < 1024) sidebarOpen = false; }}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/entrenador') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z"></path>
        </svg>
        Dashboard
      </a>
      <a href="/dashboard/entrenador/clientes" class={getNavItemClasses('/dashboard/entrenador/clientes')} aria-current={isActive('/dashboard/entrenador/clientes') ? 'page' : undefined} onclick={() => { if (window.innerWidth < 1024) sidebarOpen = false; }}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/entrenador/clientes') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        Clientes
      </a>
      <a href="/dashboard/entrenador/entrenamientos" class={getNavItemClasses('/dashboard/entrenador/entrenamientos')} aria-current={isActive('/dashboard/entrenador/entrenamientos') ? 'page' : undefined} onclick={() => { if (window.innerWidth < 1024) sidebarOpen = false; }}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/entrenador/entrenamientos') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        Entrenamientos
      </a>
      <a href="/dashboard/entrenador/cuestionarios" class={getNavItemClasses('/dashboard/entrenador/cuestionarios')} aria-current={isActive('/dashboard/entrenador/cuestionarios') ? 'page' : undefined} onclick={() => { if (window.innerWidth < 1024) sidebarOpen = false; }}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/entrenador/cuestionarios') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Cuestionarios
      </a>
      <a href="/dashboard/entrenador/estadisticas" class={getNavItemClasses('/dashboard/entrenador/estadisticas')} aria-current={isActive('/dashboard/entrenador/estadisticas') ? 'page' : undefined} onclick={() => { if (window.innerWidth < 1024) sidebarOpen = false; }}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/entrenador/estadisticas') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        Estadísticas
      </a>
      <a href="/dashboard/entrenador/profile" class={getNavItemClasses('/dashboard/entrenador/profile')} aria-current={isActive('/dashboard/entrenador/profile') ? 'page' : undefined} onclick={() => { if (window.innerWidth < 1024) sidebarOpen = false; }}>
        <svg class="w-5 h-5 mr-3 {isActive('/dashboard/profile') ? 'text-purple-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" />
        </svg>
        Perfil
      </a>
    </nav>
  </div>
  <main class="flex-1 p-8 overflow-y-auto lg:mt-0 mt-14">
    <div class="h-6 lg:hidden"></div> <!-- Extra space below header for mobile -->
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
  .app-brand {
    letter-spacing: -0.01em;
    font-size: 1.2rem;
    line-height: 1.2;
  }
  @media (max-width: 1023px) {
    .mobile-header {
      height: 3.5rem;
      min-height: 3.5rem;
      max-height: 3.5rem;
    }
    main {
      padding-top: 0 !important;
      margin-top: 3.5rem !important;
    }
    .sidebar-drawer {
      width: 100vw !important;
      height: 100vh !important;
      right: 0;
      left: auto;
      top: 0;
      border-radius: 0 !important;
      box-shadow: none !important;
      transform: translateX(100%);
    }
    .sidebar-drawer.translate-x-0 {
      transform: translateX(0) !important;
    }
    .sidebar-drawer.translate-x-full {
      transform: translateX(100%) !important;
    }
    .h-6 {
      height: 1.5rem;
    }
  }
</style> 