import { useEffect, useState } from 'react'

export const GifItem = ({ title, url }) => {
  const [copyStatus, setCopyStatus] = useState('idle')

  useEffect(() => {
    if (copyStatus === 'idle') return undefined

    const timeoutId = window.setTimeout(() => setCopyStatus('idle'), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [copyStatus])

  const copyGifUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopyStatus('success')
    } catch {
      setCopyStatus('error')
    }
  }

  const accessibleTitle = title || 'GIF animado'

  return (
    <article className="card">
      <div className="card__media">
        <img src={url} alt={accessibleTitle} loading="lazy" decoding="async" />
        <button
          className={`copy-button copy-button--${copyStatus}`}
          type="button"
          onClick={copyGifUrl}
          aria-label={`Copiar enlace de ${accessibleTitle}`}
        >
          {copyStatus === 'success' ? (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m5 12 4 4L19 6" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <rect x="8" y="8" width="11" height="11" rx="2" />
              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
          )}
        </button>
      </div>
      <p>{title || 'Sin título'}</p>
    </article>
  )
}
