<template>
  <div class="bg-white p-6 rounded-2xl shadow-lg">
    <h2 class="text-xl font-semibold mb-4">Listado de Libros</h2>
    <div class="grid gap-4 max-h-[70vh] overflow-y-auto">
      <LibroCard 
        v-for="libro in librosOrdenados" 
        :key="libro.id" 
        :libro="libro" 
      />
      <p v-if="librosOrdenados.length === 0" class="text-gray-500 text-center">
        No hay libros agregados aún.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBibliotecaStore } from '../stores/biblotecaStore'
import LibroCard from './LibroCard.vue'

const store = useBibliotecaStore()
const librosOrdenados = computed(() => store.ordenarPorTitulo)
</script>

<style scoped>
/* Aquí no hace falta mucho, Tailwind controla todo */
</style>
