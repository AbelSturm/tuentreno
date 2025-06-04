<svelte:head>
  <title>Dashboard - Tuentreno</title>
  <meta name="description" content="Tu dashboard personal en Tuentreno. Accede a tu panel de entrenamiento personalizado." />
</svelte:head>

<script lang="ts">
import DashboardLayout from '$lib/DashboardLayout.svelte';
let { data } = $props();

// Determinar el rol del usuario (por defecto 'escalador' si no está definido)
const userRole = (data.user.role === 'entrenador') ? 'entrenador' as const : 'escalador' as const;
</script>

<DashboardLayout {userRole} pageTitle="Dashboard">
  {#if userRole === 'entrenador'}
    <!-- Dashboard para Entrenadores -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">¡Bienvenido, {data.user.firstName}!</h1>
      <p class="mt-2 text-gray-600">Gestiona tus clientes y entrenamientos desde tu panel de control.</p>
    </div>

    <!-- Stats cards para entrenadores -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Clientes Activos</p>
            <p class="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Entrenamientos Esta Semana</p>
            <p class="text-2xl font-semibold text-gray-900">28</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Ingresos Este Mes</p>
            <p class="text-2xl font-semibold text-gray-900">€2,450</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent activity and quick actions para entrenadores -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent clients -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Clientes Recientes</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-600">JD</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">Juan Díaz</p>
                  <p class="text-sm text-gray-500">Último entrenamiento: Ayer</p>
                </div>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Activo
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-600">MG</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">María García</p>
                  <p class="text-sm text-gray-500">Último entrenamiento: Hace 2 días</p>
                </div>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Activo
              </span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-600">AL</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">Ana López</p>
                  <p class="text-sm text-gray-500">Último entrenamiento: Hace 1 semana</p>
                </div>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Inactivo
              </span>
            </div>
          </div>
          
          <div class="mt-6">
            <a href="/dashboard/clientes" class="text-sm font-medium text-purple-600 hover:text-purple-500">
              Ver todos los clientes →
            </a>
          </div>
        </div>
      </div>

      <!-- Quick actions para entrenadores -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Acciones Rápidas</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-4">
            <a href="/dashboard/entrenamientos/nuevo" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Crear Nuevo Entrenamiento</p>
                <p class="text-sm text-gray-500">Diseña un plan personalizado</p>
              </div>
            </a>

            <a href="/dashboard/clientes/nuevo" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Añadir Nuevo Cliente</p>
                <p class="text-sm text-gray-500">Invita a un escalador</p>
              </div>
            </a>

            <a href="/dashboard/cuestionarios" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-orange-100 rounded-lg">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Gestionar Cuestionarios</p>
                <p class="text-sm text-gray-500">Evalúa a tus clientes</p>
              </div>
            </a>

            <a href="/dashboard/estadisticas" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Ver Estadísticas</p>
                <p class="text-sm text-gray-500">Analiza el progreso</p>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>

  {:else}
    <!-- Dashboard para Escaladores -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">¡Hola, {data.user.firstName}!</h1>
      <p class="mt-2 text-gray-600">Bienvenido a tu panel de escalada. Aquí puedes seguir tu progreso y entrenamientos.</p>
    </div>

    <!-- Stats cards para escaladores -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Entrenamientos Esta Semana</p>
            <p class="text-2xl font-semibold text-gray-900">5</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Rutas Completadas</p>
            <p class="text-2xl font-semibold text-gray-900">23</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Grado Máximo</p>
            <p class="text-2xl font-semibold text-gray-900">6b+</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent activity and quick actions para escaladores -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Entrenamientos recientes -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Entrenamientos Recientes</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">Entrenamiento de Fuerza</p>
                  <p class="text-sm text-gray-500">Ayer - 1h 30min</p>
                </div>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completado
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">Técnica en Roca</p>
                  <p class="text-sm text-gray-500">Hace 3 días - 2h</p>
                </div>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completado
              </span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">Resistencia</p>
                  <p class="text-sm text-gray-500">Programado para hoy - 1h</p>
                </div>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pendiente
              </span>
            </div>
          </div>
          
          <div class="mt-6">
            <a href="/dashboard/mi-entrenamiento" class="text-sm font-medium text-purple-600 hover:text-purple-500">
              Ver todos los entrenamientos →
            </a>
          </div>
        </div>
      </div>

      <!-- Quick actions para escaladores -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Acciones Rápidas</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-4">
            <a href="/dashboard/sesion/nueva" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Registrar Sesión</p>
                <p class="text-sm text-gray-500">Anota tu último entrenamiento</p>
              </div>
            </a>

            <a href="/dashboard/progreso" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Ver Progreso</p>
                <p class="text-sm text-gray-500">Analiza tu evolución</p>
              </div>
            </a>

            <a href="/dashboard/rutas" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Explorar Rutas</p>
                <p class="text-sm text-gray-500">Descubre nuevas vías</p>
              </div>
            </a>

            <a href="/dashboard/cuestionarios" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="p-2 bg-orange-100 rounded-lg">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <p class="text-sm font-medium text-gray-900">Ver Cuestionarios</p>
                <p class="text-sm text-gray-500">Completa evaluaciones</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}
</DashboardLayout> 