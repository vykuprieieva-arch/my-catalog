import React from 'react'

export default function Filter({ filter, sortBy, genres, onFilterChange, onSortChange }) {
  const { genre } = filter

  return (
    <div className="card" style={{ padding: 16, display: 'grid', gap: 12 }}>
      <div className="row" style={{ justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <h3 className="sectionTitle">Filter</h3>
          <label className="muted" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Genre
          </label>
          <select
            className="select"
            value={genre}
            onChange={(e) => onFilterChange({ ...filter, genre: e.target.value })}
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, minWidth: 180 }}>
          <h3 className="sectionTitle">Sort</h3>
          <label className="muted" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Rating
          </label>
          <select className="select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="desc">High → Low</option>
            <option value="asc">Low → High</option>
          </select>
        </div>
      </div>
    </div>
  )
}
