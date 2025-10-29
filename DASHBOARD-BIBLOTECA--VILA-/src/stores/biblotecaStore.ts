import { defineStore } from 'pinia'

// Definimos la interfaz Libro
export interface Libro {
  id: number          // Identificador único
  titulo: string      // Título del libro
  autor: string       // Autor
  paginas: number     // Cantidad de páginas
  disponible: boolean // true si está disponible, false si está prestado
}

// Definimos el store de la biblioteca
export const useBibliotecaStore = defineStore('bibliotecaStore', {
  // ======================
  // Estado (state)
  // ======================
  state: () => ({
    libros: [] as Libro[], // Lista de libros
  }),

  // ======================
  // Getters
  // ======================
  getters: {
    // Libros ordenados alfabéticamente por título
    ordenarPorTitulo: (state) => {
      return [...state.libros].sort((a, b) => a.titulo.localeCompare(b.titulo))
    },
    // Libros ordenados alfabéticamente por autor
    ordenarPorAutor: (state) => {
      return [...state.libros].sort((a, b) => a.autor.localeCompare(b.autor))
    },
    // Libros ordenados por cantidad de páginas (de menor a mayor)
    ordenarPorPaginas: (state) => {
      return [...state.libros].sort((a, b) => a.paginas - b.paginas)
    },
  },

  // ======================
  // Acciones (actions)
  // ======================
  actions: {
    // Agrega un libro nuevo
    agregarLibro(libro: Libro) {
      this.libros.push(libro)
    },

    // Cambia el estado de disponibilidad (prestar o devolver)
    cambiarDisponibilidad(id: number) {
      const libro = this.libros.find((l) => l.id === id)
      if (libro) {
        libro.disponible = !libro.disponible
      }
    },
  },
})
