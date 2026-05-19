import React from 'react'

export default function Header({ searchQuery, onSearch, children }) {
  return (
    <header className="header">
      <div className="headerInner">
        <div className="brand">
          <div className="brandTitle">🎬 Movie Catalog</div>
          <div className="brandSub">Каталог фільмів: пошук, фільтри, додавання</div>
        </div>

        <div style={{ flex: 1, maxWidth: 520 }}>
          <div className="row" style={{ gap: 12, flexWrap: 'nowrap' }}>
            <input
              className="input"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            {children ? <div style={{ display: 'flex', gap: 8 }}>{children}</div> : null}
          </div>
        </div>
      </div>
    </header>
  )
}
