<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBibliotecaStore, Libro } from '../stores/biblotecaStore'
import LibroCard from '../components/LibroCard.vue'

const store = useBibliotecaStore()

// Campos del formulario
const titulo = ref('')
const autor = ref('')
const paginas = ref<number | null>(null)

// Computed para libros ordenados por título (podés cambiar por autor o páginas)
const librosOrdenados = computed(() => store.ordenarPorTitulo)

// Función para agregar libro
function agregarLibro() {
  if (!titulo.value || !autor.value || !paginas.value) return

  const nuevoLibro: Libro = {
    id: Date.now(),  // ID único
    titulo: titulo.value,
    autor: autor.value,
    paginas: paginas.value,
    disponible: true
  }

  store.agregarLibro(nuevoLibro)

  // Limpiar formulario
  titulo.value = ''
  autor.value = ''
  paginas.value = null
}
</script>

<template>
  <div class="p-4 md:p-8 max-w-3xl mx-auto">

    <!-- Título del Dashboard -->
    <h1 class="text-3xl font-bold mb-6">Dashboard Biblioteca</h1>

    <!-- Formulario para agregar libro -->
    <div class="mb-8 p-4 border rounded shadow-md">
      <h2 class="text-xl font-semibold mb-2">Agregar Libro</h2>
      <input v-model="titulo" placeholder="Título" class="border p-2 mb-2 w-full rounded"/>
      <input v-model="autor" placeholder="Autor" class="border p-2 mb-2 w-full rounded"/>
      <input v-model.number="paginas" type="number" placeholder="Cantidad de páginas" class="border p-2 mb-2 w-full rounded"/>
      <button @click="agregarLibro" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Agregar
      </button>
    </div>

    <!-- Listado de libros -->
    <div class="p-4 border rounded shadow-md">
      <h2 class="text-xl font-semibold mb-4">Listado de Libros</h2>
      <LibroCard v-for="libro in librosOrdenados" :key="libro.id" :libro="libro"/>
    </div>

  </div>
</template>
