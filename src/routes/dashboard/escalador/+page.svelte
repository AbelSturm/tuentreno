<script lang="ts">
let { data } = $props();
const userRole = 'escalador';
</script>

<!-- Dashboard para Escaladores -->
<div class="mb-8">
  <h1 class="text-3xl font-bold text-gray-900">¡Hola, {data.user.firstName}!</h1>
  <p class="mt-2 text-gray-600">Bienvenido a tu panel de escalada. Aquí puedes seguir tu progreso y entrenamientos.</p>
</div>

<!-- Stats cards para escaladores -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  <!-- ... (el resto del contenido de stats y tarjetas) ... -->
</div>

<!-- Recent activity and quick actions para escaladores -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- ... (entrenamientos recientes y acciones rápidas) ... -->
</div> 