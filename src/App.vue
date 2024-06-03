<template>
  <header class="d-flex justify-content-center">
    <h1 class="position-relative my-5">
      The Rick and Morty characters
    </h1>

  </header>

  <main class="bg-dark w-100 py-5 px-3">
    <CharacterCard />
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
    console.log(response);

    return response;
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
