import React from 'react'

export default function ItemCard({ title, image, description, rating, genre, onDelete }) {
  return (
    <div className="card itemCard">
      <div className="itemMedia">{image ? <img src={image} alt={title} /> : <div className="muted">No image</div>}</div>

      <div className="itemBody">
        <div className="itemTitle">{title}</div>

        <div className="ratingLine">
          <span>⭐ {rating.toFixed(1)}</span>
          <span className="muted" style={{ fontSize: 12 }}>
            {genre}
          </span>
        </div>

        <div className="itemDesc">{description}</div>

        <div className="row" style={{ marginTop: 'auto', justifyContent: 'space-between' }}>
          <button
            className="btn btnDanger"
            type="button"
            onClick={() => onDelete?.(title)}
            aria-label={`Delete ${title}`}
            style={{ padding: '10px 14px' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
