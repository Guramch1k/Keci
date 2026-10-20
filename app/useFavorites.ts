"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "keci:favorites";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Избранное, которое хранится в браузере посетителя (localStorage). */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setIds(read());
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // приватный режим или переполнено — просто не сохраняем
    }

    setIds(next);
  }, []);

  return { ids, toggle, has: (id: string) => ids.includes(id) };
}
