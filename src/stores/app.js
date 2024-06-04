import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { character } from '@/services/character'

const base = 'https://rickandmortyapi.com/api/character/?page=1'

export const useAppStore = defineStore('app-store', () => {
  const currentPage = ref(base)
  const characters = ref()
  const prev = ref('')
  const next = ref('')
  const name = ref('')
  const status = ref('none')

  const filter = computed(() => {
    let result = ''

    if (name.value.length) result += '&name=' + name.value
    if (status.value !== 'none' && status.value.length) result += '&status=' + status.value

    return result
  })

  async function getCharactersPage() {
    const { info, results } = await character.getCharactersPage(currentPage.value)

    console.log(results)
    next.value = info.next
    prev.value = info.prev
    characters.value = results
  }

  async function applyFilter() {
    const res = await character.getCharactersPage(currentPage.value + filter.value)

    if (!res) return

    const { info, results } = res

    console.log(results)
    next.value = info.next
    prev.value = info.prev
    characters.value = results
  }

  async function cleanFilter() {
    name.value = ''
    status.value = 'none'

    const { info, results } = await character.getCharactersPage(base)

    console.log(results)
    next.value = info.next
    prev.value = info.prev
    characters.value = results
  }

  async function goPrev() {
    if (!prev.value) return
    const { info, results } = await character.getCharactersPage(prev.value)
    currentPage.value = prev.value

    next.value = info?.next
    prev.value = info.prev
    characters.value = results
  }

  async function goNext() {
    if (!next.value) return
    const { info, results } = await character.getCharactersPage(next.value)
    currentPage.value = next.value

    next.value = info?.next
    prev.value = info.prev
    characters.value = results
  }

  return {
    prev,
    next,
    characters,
    name,
    status,
    goNext,
    goPrev,
    getCharactersPage,
    applyFilter,
    cleanFilter
  }
})
