import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app-store', () => {
  const characters = ref([''])
  const prev = ref('')
  const next = ref('')

  async function getCharactersPage(page) {
    try {
      const response = await fetch(page)
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
      const data = await response.json()

      console.log(data)
      return data
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error)
    }

    return null
  }

  async function goPrev() {
    if (!prev.value) return
    const { info, results } = await getCharactersPage(prev.value)

    next.value = info.next
    prev.value = info.prev
    characters.value = results
  }

  async function goNext() {
    if (!next.value) return

    const { info, results } = await getCharactersPage(next.value)

    next.value = info.next
    prev.value = info.prev
    characters.value = results
  }
  return { prev, next, characters, goNext, goPrev, getCharactersPage }
})
