<script lang="ts">
let { data } = $props();
const clients = data.clients ?? [];

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
}
</script>

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
        <p class="text-2xl font-semibold text-gray-900">{clients.filter((c: any) => c.status === 'active').length}</p>
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

<!-- Clientes recientes -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Clientes Recientes</h3>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        {#each clients.slice(0, 3) as client}
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-gray-600">
                  {getInitials(client.firstName, client.lastName)}
                </span>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{client.firstName} {client.lastName}</p>
                <p class="text-sm text-gray-500">
                  Último entrenamiento: Próximamente
                </p>
              </div>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
              {client.status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        {/each}
      </div>
      <div class="mt-6">
        <a href="/dashboard/entrenador/clientes" class="text-sm font-medium text-purple-600 hover:text-purple-500">
          Ver todos los clientes →
        </a>
      </div>
    </div>
  </div>

  <!-- Acciones rápidas -->
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Acciones Rápidas</h3>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 gap-4">
        <a href="/dashboard/entrenador/entrenamientos/nuevo" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
        <a href="/dashboard/entrenador/clientes/nuevo" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
        <a href="/dashboard/entrenador/cuestionarios" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
        <a href="/dashboard/entrenador/estadisticas" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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