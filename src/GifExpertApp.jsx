import { useCallback, useState } from 'react'
import { AddCategory, GifGrid } from './components'

export const GifExpertApp = () => {
  const [categories, setCategories] = useState(['Good morning'])

  const onAddCategory = useCallback((newCategory) => {
    setCategories((currentCategories) => {
      const categoryAlreadyExists = currentCategories.some(
        (category) => category.toLocaleLowerCase() === newCategory.toLocaleLowerCase(),
      )

      return categoryAlreadyExists
        ? currentCategories
        : [newCategory, ...currentCategories]
    })
  }, [])

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Buscá tu GIF</h1>
        <p className="hero__description">
          Encontrá el GIF perfecto para cada conversación.
        </p>

        <AddCategory onNewCategory={onAddCategory} />
      </header>

      <div className="results">
        {categories.map((category) => (
          <GifGrid key={category.toLocaleLowerCase()} category={category} />
        ))}
      </div>
    </main>
  )
}
