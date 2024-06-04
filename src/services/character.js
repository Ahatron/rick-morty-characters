const base = 'https://rickandmortyapi.com/api/character'

class Character {
  async getCharactersPage({ page, name, status }) {
    let addReq = '/?page=' + page

    if (name && name.length) addReq += '&name=' + name
    if (status && status !== 'none' && status.length) addReq += '&status=' + status

    try {
      const response = await fetch(base + addReq)
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
