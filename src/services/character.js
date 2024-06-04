class Character {
  async getCharactersPage(page) {
    try {
      const response = await fetch(page)
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.status)
      }
      const data = await response.json()

      console.log(data)
      return data
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error)
      return false
    }
  }
}

export const character = new Character()
