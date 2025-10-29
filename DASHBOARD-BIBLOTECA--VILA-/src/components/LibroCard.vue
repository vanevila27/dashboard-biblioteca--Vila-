<script setup lang="ts">
import { defineProps } from 'vue'
import { useBibliotecaStore, Libro } from '../stores/biblotecaStore'

const props = defineProps<{ libro: Libro }>()
const store = useBibliotecaStore()

function toggleDisponibilidad() {
  store.cambiarDisponibilidad(props.libro.id)
}
</script>

<template>
  <div :class="[
        props.libro.disponible ? 'bg-green-100' : 'bg-red-100 opacity-70',
        'mb-3 p-4 rounded-lg border shadow flex justify-between items-center transition-all duration-200'
      ]">
    <div>
      <p class="font-semibold text-lg text-gray-800">{{ props.libro.titulo }}</p>
      <p class="text-gray-700 text-sm">{{ props.libro.autor }} – {{ props.libro.paginas }} páginas</p>
    </div>
    <button @click="toggleDisponibilidad"
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded transition-colors duration-200">
      {{ props.libro.disponible ? 'Prestar' : 'Devolver' }}
    </button>
  </div>
</template>
