export function clampRating(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.max(0, Math.min(10, Math.round(num * 10) / 10));
}

export function normalizeItem(input, fallbackIndex = 0) {
  const id = input?.id ?? `local-${fallbackIndex}`;
  const title = String(input?.title ?? '').trim();
  const description = String(input?.description ?? '').trim();
  const image = String(input?.image ?? '').trim();
  const rating = clampRating(input?.rating ?? 0);

  const genre = String(input?.genre ?? '').trim() || 'Drama';

  return { id, title, description, image, rating, genre };
}

export function uniqueGenres(items) {
  const set = new Set(items.map(i => i.genre).filter(Boolean));
  return Array.from(set);
}
