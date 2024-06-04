import { ref } from 'vue'
import { defineStore } from 'pinia'
import { character } from '@/services/character'

let page = 1
let totalPages = 1
const params = { page }

export const useAppStore = defineStore('app-store', () => {
  const characters = ref()
  const name = ref('')
  const status = ref('none')
  const isFiltered = ref(false)

  function setValues(value) {
    if (!value) return

    const { info, results } = value
    totalPages = info.pages
    characters.value = results
  }

  async function getCharactersPage(step) {
    if (isFiltered.value) {
      params.name = name.value
      params.status = status.value
    }

    if (page + step <= 0) page = 1
    else if (page + step <= totalPages) page += step
    else page = totalPages

    params.page = page

    const res = await character.getCharactersPage(params)

    console.log(res)
    setValues(res)
  }

  async function applyFilter() {
    page = 1
    isFiltered.value = true
    getCharactersPage(0)
  }

  async function cleanFilter() {
    isFiltered.value = false

    name.value = ''
    status.value = 'none'
    params.name = ''
    params.status = ''
    const res = await character.getCharactersPage({ page: 1 })
    console.log(res)

    setValues(res)
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
