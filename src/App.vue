<template>
  <div>
    <h1>SWAPI Explorer</h1>
    <p v-if="planets">
      <planet-card v-for="planet in planets" :key="planet.name" :planet="planet" />
    </p>
    <div>
      <button @click="prevPage">Previous</button>
      <span>{{ currentPage }}/{{ totalPages }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Client from './lib/client'
import { Planet, PlanetResponse } from './lib/planets'
import PlanetCard from './components/PlanetCard.vue'

export default defineComponent({
  name: 'App',
  components: { PlanetCard },
  setup() {
    const planets = ref<Planet[]>([])
    const currentPage = ref<number>(0)
    const totalPages = ref<number>(0)

    const planetClient = Client.planets()

    const handleResponse = (response: PlanetResponse) => {
      planets.value = response.results
      currentPage.value = response.page
      totalPages.value = response.count
    }

    const getPlanets = async () => {
      handleResponse(await planetClient.get())
    }

    const nextPage = async () => {
      handleResponse(await planetClient.nextPage())
    }

    const prevPage = async () => {
      handleResponse(await planetClient.prevPage())
    }

    onMounted(() => {
      getPlanets()
    })

    return {
      planets,
      nextPage,
      prevPage,
      currentPage,
      totalPages
    }
  }
})
</script>
