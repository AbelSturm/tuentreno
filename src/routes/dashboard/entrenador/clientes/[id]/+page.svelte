<script lang="ts">
    import { goto } from '$app/navigation';
    export let data: { relation?: any; client?: any; sessions?: any[] };
  
    $: client = data?.client;
    $: relation = data?.relation;
    $: sessions = data?.sessions ?? [];
  </script>
  
    <div class="py-8 px-2 sm:px-6 lg:px-8">
      <button
        class="mb-6 text-purple-700 hover:underline flex items-center gap-1"
        on:click={() => goto('/dashboard/clientes')}
        type="button"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        Volver a clientes
      </button>
  
      {#if !client}
        <div class="p-6 bg-red-100 text-red-800 rounded">No se encontró el cliente.</div>
      {:else}
        <div class="mb-8">
          <div class="flex items-center gap-6">
            {#if client.profilePicture}
              <img src={client.profilePicture} alt="Foto de perfil" class="w-16 h-16 rounded-full object-cover border" />
            {:else}
              <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500 border">
                {client.firstName?.[0]}{client.lastName?.[0]}
              </div>
            {/if}
            <div>
              <h1 class="text-2xl font-bold">{client.firstName} {client.lastName}</h1>
              <p class="text-gray-600">{client.email}</p>
            </div>
          </div>
        </div>
  
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-2">Relación</h2>
          <div class="flex flex-wrap gap-6 items-center">
            <span class="text-sm text-gray-700">Estado: <span class="font-medium capitalize">{relation.status}</span></span>
            <span class="text-sm text-gray-700">Inicio: {relation.startDate && (new Date(relation.startDate)).toLocaleDateString()}</span>
            {#if relation.endDate}
              <span class="text-sm text-gray-700">Fin: {(new Date(relation.endDate)).toLocaleDateString()}</span>
            {/if}
            {#if relation.monthlyFee}
              <span class="text-sm text-gray-700">Tarifa mensual: {relation.monthlyFee} €</span>
            {/if}
          </div>
          {#if relation.notes}
            <div class="text-sm text-gray-700 mt-2">Notas: {relation.notes}</div>
          {/if}
        </div>
  
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-2">Teléfono</h2>
          <span class="text-sm text-gray-700">{client.phone || 'No especificado'}</span>
        </div>
  
        <div>
          <h2 class="text-xl font-semibold mb-4">Sesiones recientes</h2>
          {#if sessions.length === 0}
            <p class="text-gray-500 text-sm">No hay sesiones registradas.</p>
          {:else}
            <ul class="divide-y divide-gray-200">
              {#each sessions as session}
                <li class="py-3">
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">{session.title}</div>
                      <div class="text-xs text-gray-500">{session.date && (new Date(session.date)).toLocaleDateString()}</div>
                    </div>
                    <span class="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">{session.status}</span>
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/if}
    </div>
