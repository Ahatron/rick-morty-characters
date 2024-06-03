<template>
  <header class="d-flex justify-content-center">
    <h1 class="position-relative my-5">
      The Rick and Morty characters
    </h1>

  </header>

  <main class="bg-dark d-flex justify-content-center w-100 py-5 px-3">
    <div class=" d-flex flex-wrap justify-content-center  w-100"
      style="max-width: 2080px;">
      <CharacterCard class="m-3"
        v-for="character of characters"
        :key="character.id"
        :character="character" />
    </div>
  </main>
</template>

<script setup>
import CharacterCard from "@/components/CharacterCard.vue";
import { onMounted, ref } from "vue";

const characters = ref()

async function getCharactersPage() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json()
    console.log(data);

    return data.results;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }

  return null
}

onMounted(async () => {
  characters.value = await getCharactersPage()
})

</script>

<style scoped></style>
