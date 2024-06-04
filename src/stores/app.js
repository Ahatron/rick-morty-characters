import { ref } from 'vue'
import { defineStore } from 'pinia'
import { character } from '@/services/character'

let currentPage = 1

export const useAppStore = defineStore('app-store', () => {
  const totalPages = ref(0)
  const characters = ref()
  const name = ref('')
  const status = ref('none')

  async function getCharactersPage() {
    const { info, results } = await character.getCharactersPage(currentPage)

    console.log(results)
    totalPages.value = info.pages
    characters.value = results
  }

  async function applyFilter() {
    const res = await character.getCharactersPage(currentPage, name.value, status.value)

    if (!res) return

    const { info, results } = res
    totalPages.value = info.pages
    console.log(results)
    characters.value = results
  }

  async function cleanFilter() {
    name.value = ''
    status.value = 'none'

    const { info, results } = await character.getCharactersPage(1)
    totalPages.value = info.pages
    console.log(results)
    characters.value = results
  }

  return {
    characters,
    name,
    status,
    getCharactersPage,
    applyFilter,
    cleanFilter
  }
})
