"use client";

import { Heart } from "lucide-react";

import { useFavorites } from "../useFavorites";

export default function FavoriteButton({ id }: { id: string }) {
  const favorites = useFavorites();
  const active = favorites.has(id);

  return (
    <button
      className={active ? "clubPageFavorite active" : "clubPageFavorite"}
      aria-pressed={active}
      onClick={() => favorites.toggle(id)}
    >
      <Heart />
      {active ? "В избранном" : "В избранное"}
    </button>
  );
}
