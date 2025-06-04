<script lang="ts">
  export let data: { invite?: any; user?: any; invalid?: boolean; form?: any };
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  $: invite = data?.invite;
  $: user = data?.user;
  $: invalid = data?.invalid;
  $: form = data?.form;
</script>

{#if invalid}
  <div class="max-w-lg mx-auto mt-12 p-6 bg-red-100 text-red-800 rounded">
    Invitación no válida o ya utilizada.
  </div>
{:else}
  <div class="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Invitación para conectar con tu entrenador</h1>
    <p class="mb-4">Has sido invitado por el entrenador <b>{invite?.trainerId}</b> ({invite?.email}).</p>

    {#if !user}
      <div class="mb-4">
        <a href="/login?redirectTo={encodeURIComponent(get(page).url.pathname)}" class="btn">Iniciar sesión</a>
        <a href="/register?redirectTo={encodeURIComponent(get(page).url.pathname)}" class="btn ml-2">Registrarse</a>
      </div>
    {:else if form?.success}
      <div class="p-4 bg-green-100 text-green-800 rounded">¡Conexión realizada! Ya puedes acceder a tu panel.</div>
    {:else}
      <form method="POST" use:enhance>
        <button type="submit" class="btn btn-primary">Aceptar invitación</button>
      </form>
    {/if}

    {#if form?.error}
      <div class="mt-4 p-3 bg-red-100 text-red-800 rounded">{form.error}</div>
    {/if}
  </div>
{/if}

<style>
  /* Tailwind utility classes used, but fallback for btn if not available */
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: #7c3aed;
    color: white;
    font-weight: bold;
    transition: background 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn:hover, .btn.btn-primary:hover {
    background: #6d28d9;
  }
  .btn-primary {
    background: #7c3aed;
  }
  .ml-2 {
    margin-left: 0.5rem;
  }
</style> 