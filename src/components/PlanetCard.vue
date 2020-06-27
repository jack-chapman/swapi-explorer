<template>
  <div>
    <h2>{{ planet.name }}</h2>
    <p>{{ planet.climate }}</p>
    <p>{{ planet.terrain }}</p>
    <p>Population: {{ formattedPopulation }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Planet } from '../lib/planets';
export default defineComponent({
  name: 'planet-card',
  props: {
    planet: Object as () => Planet
  },
  setup(props) {
    const formattedPopulation = computed(() => {
      if (props.planet) {
        if (props.planet.population !== 'unknown') {
          const numberVal = parseInt(props.planet.population);
          return numberVal.toLocaleString(undefined);
        } else {
          return props.planet.population;
        }
      }
      return '';
    });
    return { formattedPopulation };
  }
});
</script>