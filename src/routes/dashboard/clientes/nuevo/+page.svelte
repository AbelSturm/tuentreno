<script lang="ts">
import DashboardLayout from '$lib/DashboardLayout.svelte';
import { enhance } from '$app/forms';

let { data, form } = $props();
</script>

<DashboardLayout userRole="entrenador" pageTitle="Añadir Cliente">
  <div class="max-w-lg mx-auto bg-white rounded-xl shadow p-8 mt-8">
    <h1 class="text-2xl font-bold mb-4">Invitar a un nuevo cliente</h1>
    <form method="POST" use:enhance>
      <label class="block mb-2 font-medium text-gray-700" for="email">Email del cliente</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        class="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="cliente@email.com"
      />
      <button
        type="submit"
        name="invite"
        class="w-full bg-purple-700 text-white font-bold py-2 rounded-lg hover:bg-purple-800 transition"
      >
        Generar invitación
      </button>
    </form>

    {#if form?.success}
      <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded">
        <p class="font-medium text-green-800 mb-2">¡Invitación generada para <span class="underline">{form.email}</span>!</p>
        <div class="flex items-center space-x-2">
          <input
            class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            readonly
            value={form.inviteUrl}
            on:focus={(e) => (e.target as HTMLInputElement)?.select()}
          />
          <button
            type="button"
            class="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
            on:click={() => { navigator.clipboard.writeText(form.inviteUrl); }}
          >
            Copiar
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-2">Comparte este enlace con tu cliente para que se registre y quede vinculado a tu cuenta.</p>
      </div>
    {/if}

    {#if form?.error}
      <div class="mt-4 p-3 bg-red-100 text-red-800 rounded">{form.error}</div>
    {/if}
  </div>
</DashboardLayout>
