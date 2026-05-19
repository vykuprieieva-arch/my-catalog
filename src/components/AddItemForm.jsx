import React, { useState } from 'react'
import { clampRating } from '../utils/helpers.js'

export default function AddItemForm({ onAdd, existingGenres }) {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState('7.5')
  const [genre, setGenre] = useState(existingGenres?.[0] ?? 'Drama')

  function handleSubmit(e) {
    e.preventDefault()

    const newItem = {
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
      rating: clampRating(Number(rating)),
      genre: String(genre || 'Drama').trim(),
    }

    onAdd?.(newItem)

    setTitle('')
    setImage('')
    setDescription('')
    setRating('7.5')
    setGenre(existingGenres?.[0] ?? 'Drama')
  }

  return (
    <div className="card" style={{ padding: 16 }}>
      <h3 className="sectionTitle" style={{ margin: 0 }}>Add new film</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="muted" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Title
          </label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Film title"
            required
          />
        </div>

        <div>
          <label className="muted" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Image URL
          </label>
          <input
            className="input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="muted" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Rating (0..10)
          </label>
          <input
            className="input"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div>
          <label className="muted" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Genre
          </label>
          <select className="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
            {(existingGenres?.length ? existingGenres : ['Drama']).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="muted" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Description
          </label>
          <textarea
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            rows={3}
          />
        </div>

        <button className="btn btnPrimary" type="submit">Add</button>
      </form>
    </div>
  )
}
