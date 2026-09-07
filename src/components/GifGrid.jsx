import { useId } from 'react'
import { useFetchGifs } from '../hooks/useFetchGifs'
import { GifItem } from './GifItem'

export const GifGrid = ({ category }) => {
  const { error, images, isLoading, retry } = useFetchGifs(category)
  const headingId = useId()

  return (
    <section className="gif-section" aria-labelledby={headingId}>
      <div className="section-heading">
        <div>
          <p className="section-heading__label">Resultados para</p>
          <h2 id={headingId}>{category}</h2>
        </div>
        {!isLoading && !error && (
          <span className="result-count">
            {images.length} {images.length === 1 ? 'resultado' : 'resultados'}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="status-message" role="status">
          <span className="spinner" aria-hidden="true" />
          Buscando GIFs…
        </div>
      )}

      {error && (
        <div className="status-message status-message--error" role="alert">
          <div>
            <strong>No pudimos cargar los GIFs.</strong>
            <p>{error}</p>
          </div>
          <button className="button-secondary" type="button" onClick={retry}>
            Reintentar
          </button>
        </div>
      )}

      {!isLoading && !error && images.length === 0 && (
        <p className="status-message" role="status">
          No encontramos GIFs para esta búsqueda.
        </p>
      )}

      {!isLoading && !error && images.length > 0 && (
        <div className="card-grid">
          {images.map((image) => (
            <GifItem key={image.id} {...image} />
          ))}
        </div>
      )}
    </section>
  )
}
