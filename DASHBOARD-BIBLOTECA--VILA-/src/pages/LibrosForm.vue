<template>
  <div class="bg-white p-6 rounded-2xl shadow-lg">
    <h2 class="text-xl font-semibold mb-4">Agregar Libro</h2>
    <form @submit.prevent="agregarLibro" class="space-y-4">
      <input v-model="titulo" placeholder="Título" class="input-form" />
      <input v-model="autor" placeholder="Autor" class="input-form" />
      <input v-model.number="paginas" type="number" placeholder="Cantidad de páginas" class="input-form" />
      <button type="submit" class="btn-submit w-full">Agregar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBibliotecaStore, Libro } from '../stores/biblotecaStore'

const store = useBibliotecaStore()
const titulo = ref('')
const autor = ref('')
const paginas = ref<number | null>(null)

function agregarLibro() {
  if (!titulo.value || !autor.value || !paginas.value) return

  const nuevoLibro: Libro = {
    id: Date.now(),
    titulo: titulo.value,
    autor: autor.value,
    paginas: paginas.value,
    disponible: true
  }

  store.agregarLibro(nuevoLibro)
  titulo.value = ''
  autor.value = ''
  paginas.value = null
}
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
.btn-submit {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200;
}
</style>

