<template>
  <header class="d-flex justify-content-center">
    <h1 class="my-5 text-center">
      The Rick and Morty characters
    </h1>
  </header>

  <main class="bg-dark d-flex align-items-center flex-column w-100 py-5">
    <MyPagination />
    <div class="mb-3 mx-3 fs-5 text-white d-flex ">
      <div class="d-flex flex-wrap align-items-start me-3">
        <label for="name"
          class="form-label me-4">Character name:
          <input v-model="appStore.name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Rick">
        </label>


        <label for="status"
          class="form-label">Status:
          <select id="status"
            v-model="appStore.status"
            class="form-select"
            aria-label="status">
            <option value="none">None</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>

      </div>
      <div class="d-flex align-items-end mb-2">
        <button @click="appStore.cleanFilter"
          type="button"
          class="btn btn-secondary me-1">Clean</button>
        <button @click="appStore.applyFilter"
          type="button"
          class="btn btn-primary">Apply</button>
      </div>
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
import { onBeforeMount } from "vue";
import { useAppStore } from "@/stores/app";
import MyPagination from "@/components/MyPagination.vue";

const appStore = useAppStore()



onBeforeMount(() => {
  appStore.getCharactersPage()
})

</script>

<style scoped></style>
