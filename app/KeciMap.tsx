"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

type Place = {
  name: string;
  rating: string;
  type: string;
  lat: number;
  lng: number;
};

export default function KeciMap({
  places,
  selected,
  onSelect,
}: {
  places: Place[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  const icon = new L.DivIcon({
    className: "keci-marker",
    html: `
      <div class="keci-marker-inner">
        <span></span>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -44],
  });

  return (
    <MapContainer
      center={[41.646, 41.636]}
      zoom={14}
      scrollWheelZoom={true}
      className="realMap"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => (
        <Marker
          key={place.name}
          position={[place.lat, place.lng]}
          icon={icon}
          eventHandlers={{
            click: () => onSelect(place.name),
          }}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.type} · ★ {place.rating}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
