import React from 'react'
import ItemCard from './ItemCard.jsx'

export default function ItemList({ items, onDelete }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          description={item.description}
          rating={item.rating}
          genre={item.genre}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
