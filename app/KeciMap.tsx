"use client";

import Image from "next/image";

type Place = {
  name: string;
};

type Props = {
  places: Place[];
  selected: string;
  onSelect: (id: string) => void;
};

export default function KeciMap({}: Props) {
  return (
    <div className="keciHomeMap">
      <Image
        src="/IMG_5514.jpeg"
        alt="Keci — карта Батуми"
        fill
        priority
        className="keciHomeMapImage"
        sizes="(max-width: 900px) 100vw, 55vw"
      />
    </div>
  );
}
