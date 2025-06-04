<svelte:head>
  <title>Clientes - Tuentreno</title>
  <meta name="description" content="Gestiona tus clientes de escalada. Visualiza estadísticas, entrenamientos y progreso." />
</svelte:head>

<script lang="ts">
import DashboardLayout from '$lib/DashboardLayout.svelte';
import { enhance } from '$app/forms';

let { data } = $props();

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'inactive':
      return 'Inactivo';
    case 'paused':
      return 'Pausado';
    default:
      return 'Desconocido';
  }
}

function formatDate(date: string | Date) {
  if (!date) return 'Nunca';
  const d = new Date(date);
  return d.toLocaleDateString('es-ES');
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
</script>

<DashboardLayout userRole="entrenador" pageTitle="Clientes">
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Mis Clientes</h1>
        <p class="mt-2 text-gray-600">Gestiona y supervisa a tus escaladores</p>
      </div>
      <a
        href="/dashboard/clientes/nuevo"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Añadir Cliente
      </a>
    </div>

    <!-- Estadísticas rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Clientes</p>
            <p class="text-2xl font-semibold text-gray-900">{data.clients.length}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Clientes Activos</p>
            <p class="text-2xl font-semibold text-gray-900">
              {data.clients.filter(c => c.status === 'active').length}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Clientes Pausados</p>
            <p class="text-2xl font-semibold text-gray-900">
              {data.clients.filter(c => c.status === 'paused').length}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Ingresos Mensuales</p>
            <p class="text-2xl font-semibold text-gray-900">
              €{data.clients
                .filter(c => c.status === 'active' && c.monthlyFee)
                .reduce((sum, c) => sum + parseFloat(c.monthlyFee || '0'), 0)
                .toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de clientes -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Lista de Clientes</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Información detallada de todos tus clientes</p>
      </div>

      {#if data.clients.length === 0}
        <div class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No tienes clientes</h3>
          <p class="mt-1 text-sm text-gray-500">Comienza añadiendo tu primer cliente</p>
          <div class="mt-6">
            <a
              href="/dashboard/clientes/nuevo"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Añadir Cliente
            </a>
          </div>
        </div>
      {:else}
        <ul class="divide-y divide-gray-200">
          {#each data.clients as client}
            <li class="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    {#if client.profilePicture}
                      <img class="h-12 w-12 rounded-full" src={client.profilePicture} alt="" />
                    {:else}
                      <div class="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-purple-800">
                          {getInitials(client.firstName, client.lastName)}
                        </span>
                      </div>
                    {/if}
                  </div>
                  <div class="ml-4">
                    <div class="flex items-center">
                      <p class="text-sm font-medium text-gray-900">
                        {client.firstName} {client.lastName}
                      </p>
                      <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(client.status)}">
                        {getStatusText(client.status)}
                      </span>
                    </div>
                    <div class="flex items-center text-sm text-gray-500 space-x-4">
                      <p>{client.email}</p>
                      {#if client.phone}
                        <span>•</span>
                        <p>{client.phone}</p>
                      {/if}
                      {#if client.experience}
                        <span>•</span>
                        <p class="capitalize">{client.experience}</p>
                      {/if}
                      {#if client.maxGrade}
                        <span>•</span>
                        <p>Grado máximo: {client.maxGrade}</p>
                      {/if}
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">
                      {client.totalSessions} sesiones
                    </p>
                    <p class="text-sm text-gray-500">
                      Última: {client.lastSession ? formatDate(client.lastSession.date) : 'Nunca'}
                    </p>
                    {#if client.monthlyFee}
                      <p class="text-sm font-medium text-green-600">
                        €{client.monthlyFee}/mes
                      </p>
                    {/if}
                  </div>
                  <div class="flex-shrink-0">
                    <a
                      href="/dashboard/clientes/{client.clientId}"
                      class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Ver Detalles
                    </a>
                  </div>
                </div>
              </div>

              {#if client.notes}
                <div class="mt-3 ml-16">
                  <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>Notas:</strong> {client.notes}
                  </p>
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</DashboardLayout>
