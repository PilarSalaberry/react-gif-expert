import { useCallback, useEffect, useState } from 'react'
import { getGifs } from '../helpers/getGifs'

export const useFetchGifs = (category) => {
  const [requestId, setRequestId] = useState(0)
  const [state, setState] = useState({
    error: null,
    images: [],
    isLoading: true,
  })

  useEffect(() => {
    const controller = new AbortController()

    const loadImages = async () => {
      setState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: true,
      }))

      try {
        const images = await getGifs(category, { signal: controller.signal })
        setState({ error: null, images, isLoading: false })
      } catch (error) {
        if (error.name === 'AbortError') return

        setState({
          error: error.message,
          images: [],
          isLoading: false,
        })
      }
    }

    loadImages()

    return () => controller.abort()
  }, [category, requestId])

  const retry = useCallback(() => {
    setRequestId((currentId) => currentId + 1)
  }, [])

  return {
    ...state,
    retry,
  }
}
