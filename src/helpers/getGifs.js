const GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/search'

export const getGifs = async (category, { signal } = {}) => {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY

  if (!apiKey) {
    throw new Error('Falta configurar VITE_GIPHY_API_KEY.')
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    limit: '12',
    q: category,
    rating: 'g',
  })

  const response = await fetch(`${GIPHY_SEARCH_URL}?${params}`, { signal })

  if (!response.ok) {
    throw new Error(`GIPHY respondió con el estado ${response.status}.`)
  }

  const { data } = await response.json()
  if (!Array.isArray(data)) {
    throw new Error('GIPHY devolvió una respuesta inesperada.')
  }

  return data
    .map((image) => ({
      id: image.id,
      title: image.title,
      url: image.images?.downsized_medium?.url,
    }))
    .filter((image) => image.id && image.url)
}
