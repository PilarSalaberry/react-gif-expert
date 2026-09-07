import { useId, useState } from 'react'

export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setInputValue] = useState('')
  const inputId = useId()

  const onInputChange = ({ target }) => {
    setInputValue(target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const newCategory = inputValue.trim()
    if (newCategory.length < 2) return

    onNewCategory(newCategory)
    setInputValue('')
  }

  const isSubmitDisabled = inputValue.trim().length < 2

  return (
    <form className="search-form" onSubmit={onSubmit} role="search">
      <label className="sr-only" htmlFor={inputId}>
        Buscar GIFs
      </label>

      <input
        id={inputId}
        name="gif-search"
        type="search"
        placeholder="Ej: Gatos, reacciones..."
        value={inputValue}
        onChange={onInputChange}
        autoComplete="off"
        enterKeyHint="search"
      />

      <button type="submit" disabled={isSubmitDisabled}>
        Buscar
      </button>
    </form>
  )
}
