<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">
      Biblioteca
    </h1>

    <!-- Grid principal: Formulario y Listado -->
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

      <!-- Formulario -->
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Agregar Libro</h2>
        <form @submit.prevent="agregarLibro" class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-1">Título</label>
            <input v-model="titulo" type="text" class="input-form" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Autor</label>
            <input v-model="autor" type="text" class="input-form" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Páginas</label>
            <input v-model.number="paginas" type="number" class="input-form" />
          </div>
          <button type="submit" class="btn-submit w-full">Agregar</button>
        </form>
      </div>

      <!-- Listado -->
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Listado de Libros</h2>
        <div class="grid gap-4">
          <LibroCard
            v-for="libro in librosOrdenados"
            :key="libro.id"
            :libro="libro"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBibliotecaStore, Libro } from '../stores/biblotecaStore'
import LibroCard from '../components/LibroCard.vue'

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

const librosOrdenados = computed(() => store.ordenarPorTitulo)
</script>

<style scoped>
.input-form {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
.btn-submit {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200;
}
</style>
