<script lang="ts">
  // Import necessary Svelte and form utilities
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { invalidate } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';

  // Obtener datos reales del usuario desde el backend
  let { user } = $page.data;

  // Estado para los formularios, inicializado con los datos reales
  let firstName = user?.firstName || '';
  let lastName = user?.lastName || '';
  let email = user?.email || '';
  let phone = user?.phone || '';
  let birthDate = user?.birthDate || '';
  let experience = user?.experience || '';
  let maxGrade = user?.maxGrade || '';
  let profilePicture = user?.profilePicture || '';

  // Estado para cambio de contraseña
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';

  // Estado para eliminar cuenta
  let confirmDelete = false;

  // Acceso a los resultados de las acciones del servidor
  let { form } = $page.data;
</script>

<!-- Main container for consistent spacing with clients page -->
<div class="space-y-6 px-4 py-8 sm:px-6 lg:px-8">
  <!-- Perfil de usuario -->
  <section class="profile-card">
    <h2>Perfil de usuario</h2>
    <form method="post" action="?/actualizarPerfil">
      <div class="form-group">
        <label>Nombre:
          <input type="text" name="firstName" bind:value={firstName} required />
        </label>
        <label>Apellido:
          <input type="text" name="lastName" bind:value={lastName} required />
        </label>
      </div>
      <div class="form-group">
        <label>Email:
          <input type="email" name="email" bind:value={email} required />
        </label>
        <label>Teléfono:
          <input type="tel" name="phone" bind:value={phone} />
        </label>
      </div>
      <div class="form-group">
        <label>Fecha de nacimiento:
          <input type="date" name="birthDate" bind:value={birthDate} />
        </label>
        <label>Experiencia:
          <select name="experience" bind:value={experience}>
            <option value="">Selecciona</option>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="experto">Experto</option>
          </select>
        </label>
      </div>
      <div class="form-group">
        <label>Grado máximo:
          <input type="text" name="maxGrade" bind:value={maxGrade} />
        </label>
        <label>Foto de perfil:
          <input type="text" name="profilePicture" bind:value={profilePicture} placeholder="URL de la imagen" />
        </label>
      </div>
      <button type="submit" class="btn-primary">Actualizar perfil</button>
      {#if form?.message && form?.success}
        <p class="success-message">{form.message}</p>
      {:else if form?.message}
        <p class="error-message">{form.message}</p>
      {/if}
    </form>
  </section>

  <hr />

  <!-- Cambio de contraseña -->
  <section class="profile-card">
    <h2>Cambiar contraseña</h2>
    <form method="post" action="?/cambiarPassword">
      <div class="form-group">
        <label>Contraseña actual:
          <input type="password" name="currentPassword" bind:value={currentPassword} required />
        </label>
      </div>
      <div class="form-group">
        <label>Nueva contraseña:
          <input type="password" name="newPassword" bind:value={newPassword} required />
        </label>
        <label>Confirmar nueva contraseña:
          <input type="password" name="confirmPassword" bind:value={confirmPassword} required />
        </label>
      </div>
      <button type="submit" class="btn-primary">Actualizar contraseña</button>
      {#if form?.message && form?.success}
        <p class="success-message">{form.message}</p>
      {:else if form?.message}
        <p class="error-message">{form.message}</p>
      {/if}
    </form>
  </section>

  <hr />

  <!-- Eliminar cuenta -->
  <section class="profile-card danger-card">
    <h2>Eliminar cuenta</h2>
    <form method="post" action="?/eliminarCuenta">
      <label class="checkbox-label">
        <input type="checkbox" name="confirmDelete" bind:checked={confirmDelete} />
        Confirmo que deseo eliminar mi cuenta permanentemente
      </label>
      <button type="submit" class="btn-danger">Eliminar cuenta</button>
      {#if form?.message && form?.success}
        <p class="success-message">{form.message}</p>
      {:else if form?.message}
        <p class="error-message">{form.message}</p>
      {/if}
    </form>
  </section>
</div>

<style>
  section.profile-card {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(80, 0, 120, 0.07);
    padding: 2rem 2rem 1.5rem 2rem;
    margin-bottom: 2.5rem;
    /* max-width: 500px; */
    /* margin-left: auto; */
    /* margin-right: auto; */
    border: 1px solid #f3e8ff;
  }
  section.profile-card h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #7c3aed;
    margin-bottom: 1.2rem;
    text-align: left;
  }
  .form-group {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.2rem;
    flex-wrap: wrap;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    color: #4b5563;
    flex: 1 1 180px;
    gap: 0.3rem;
  }
  input, select {
    margin-top: 0.1rem;
    padding: 0.6rem 0.8rem;
    font-size: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background: #fafaff;
    transition: border 0.2s;
  }
  input:focus, select:focus {
    outline: none;
    border-color: #a78bfa;
    background: #f3e8ff;
  }
  .btn-primary {
    background: linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s;
    box-shadow: 0 1px 4px 0 rgba(124, 58, 237, 0.08);
  }
  .btn-primary:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
  }
  .btn-danger {
    background: #c026d3;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s;
    box-shadow: 0 1px 4px 0 rgba(192, 38, 211, 0.08);
  }
  .btn-danger:hover {
    background: #a21caf;
  }
  .danger-card {
    border: 1.5px solid #f3e8ff;
    background: #fdf4ff;
  }
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-weight: 500;
    color: #a21caf;
    margin-bottom: 1rem;
  }
  .success-message {
    color: #059669;
    font-weight: 500;
    margin-top: 0.7rem;
    text-align: center;
  }
  .error-message {
    color: #dc2626;
    font-weight: 500;
    margin-top: 0.7rem;
    text-align: center;
  }
  hr {
    border: none;
    border-top: 1.5px solid #f3e8ff;
    margin: 2.5rem 0;
  }
</style> 