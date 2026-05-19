export async function fetchMovies(signal) {
  // Використаємо JSONPlaceholder як доступний безключовий API.
  // Отримаємо "posts" і перетворимо на фільми (title/опис + постер як placeholder).
  const url = 'https://jsonplaceholder.typicode.com/posts?_limit=40';

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Failed to load: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.map((p, index) => ({
    id: p.id,
    title: p.title,
    description: p.body,
    // Картинку зробимо через picsum (без ключів), щоб був cover у кожної картки
    image: `https://picsum.photos/seed/movie-${p.id}/600/400`,
    // Сортування/фільтр за рейтингом: зробимо рейтинг з id (детерміновано)
    rating: Math.round(((p.id % 10) + 1) * 0.9 * 10) / 10, // 0.9..9.0 приблизно
    // Жанр: теж детерміновано з id
    genre: ['Drama', 'Comedy', 'Action', 'Sci-Fi', 'Fantasy', 'Thriller'][index % 6],
  }));
}
