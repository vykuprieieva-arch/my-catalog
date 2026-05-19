import React, { useEffect, useMemo, useState } from 'react'
import Header from './Header.jsx'
import Filter from './Filter.jsx'
import ItemList from './ItemList.jsx'
import AddItemForm from './AddItemForm.jsx'

import { fetchMovies } from '../services/api.js'
import { normalizeItem, uniqueGenres } from '../utils/helpers.js'

export default function App() {
  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGenre, setFilterGenre] = useState('All')
  const [sortBy, setSortBy] = useState('desc')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [genres, setGenres] = useState(['Drama'])

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const results = await fetchMovies(controller.signal)
        const normalized = results.map((r, idx) => normalizeItem(r, idx))

        setItems(normalized)
        setGenres(['All', ...uniqueGenres(normalized)])
      } catch (err) {
        if (err?.name !== 'AbortError') {
          setError(err?.message || 'Unknown error')
        }
      } finally {
        setIsLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [])

  const filteredSortedItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    let out = items

    if (filterGenre !== 'All') {
      out = out.filter((i) => i.genre === filterGenre)
    }

    if (query) {
      out = out.filter((i) => i.title.toLowerCase().includes(query))
    }

    out = [...out].sort((a, b) => {
      if (sortBy === 'asc') return a.rating - b.rating
      return b.rating - a.rating
    })

    return out
  }, [items, searchQuery, filterGenre, sortBy])

  function handleSearch(next) {
    setSearchQuery(next)
  }

  function handleFilterChange(nextFilter) {
    setFilterGenre(nextFilter.genre)
  }

  function handleSortChange(nextSortBy) {
    setSortBy(nextSortBy)
  }

  function handleAdd(newItem) {
    const normalized = normalizeItem(newItem, items.length)
    setItems((prev) => [normalized, ...prev])
    if (!genres.includes(normalized.genre)) {
      setGenres((prev) => ['All', ...prev.filter((g) => g !== 'All'), normalized.genre])
    }
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div>
      <Header searchQuery={searchQuery} onSearch={handleSearch}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setSearchQuery('')
            setFilterGenre('All')
            setSortBy('desc')
          }}
        >
          Reset
        </button>
      </Header>

      <div className="container">
        <div style={{ marginTop: 18, display: 'grid', gap: 16 }}>
          <Filter
            filter={{ genre: filterGenre }}
            sortBy={sortBy}
            genres={genres}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />

          {isLoading && <p className="muted">Завантаження...</p>}
          {error && <p className="error">Помилка: {error}</p>}

          {!isLoading && !error && filteredSortedItems.length === 0 && (
            <p className="muted">Нічого не знайдено</p>
          )}

          {!isLoading && !error && filteredSortedItems.length > 0 && (
            <ItemList items={filteredSortedItems} onDelete={handleDelete} />
          )}

          <div className="hr" />

          <AddItemForm onAdd={handleAdd} existingGenres={genres.filter((g) => g !== 'All')} />
        </div>
      </div>
    </div>
  )
}
