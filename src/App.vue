<template>
  <header class="d-flex justify-content-center">
    <h1 class="my-5 text-center">
      The Rick and Morty characters
    </h1>
  </header>

  <main class="bg-dark d-flex align-items-center flex-column w-100 py-5 px-3">
    <MyPagination />
    <div class="mb-3 fs-5 text-white d-flex">
      <label for="name"
        class="form-label">Character name:</label>
      <div class="ms-3 me-5">
        <input type="text"
          class="form-control "
          id="name"
          placeholder="Rick">
      </div>

      Status:
      <select v-model="status"
        class="form-select ms-3"
        multiple
        aria-label="status">
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>

    <div class=" d-flex flex-wrap justify-content-center w-100 mb-4"
      style="max-width: 2080px;">
      <CharacterCard class="m-3"
        v-for="character of appStore.characters"
        :key="character.id"
        :character="character" />
    </div>
    <MyPagination />

  </main>
</template>

<script setup>
import CharacterCard from "@/components/CharacterCard.vue";
import { onBeforeMount, ref } from "vue";
import { useAppStore } from "@/stores/app";
import MyPagination from "./components/MyPagination.vue";

const currentPage = ref('https://rickandmortyapi.com/api/character?page=2')
const appStore = useAppStore()
const name = ref('')
const status = ref([''])


onBeforeMount(async () => {
  const { info, results } = await appStore.getCharactersPage(currentPage.value)

  console.log(results)
  appStore.next = info.next
  appStore.prev = info.prev
  appStore.characters = results
})

</script>

<style scoped></style>
