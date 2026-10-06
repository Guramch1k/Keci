"use client";

import Image from "next/image";

type Place = {
  name: string;
  rating: string;
  type: string;
  lat: number;
  lng: number;
};

type Props = {
  places: Place[];
  selected: string;
  onSelect: (name: string) => void;
};

export default function KeciMap({}: Props) {
  return (
    <div className="keciHomeMap">
      <Image
        src="/keci-map.jpeg"
        alt="Keci — карта Батуми"
        fill
        priority
        className="keciHomeMapImage"
        sizes="(max-width: 900px) 100vw, 55vw"
      />
    </div>
  );
}
