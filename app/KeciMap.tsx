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
    html: "<span></span>",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <MapContainer
      center={[41.646, 41.636]}
      zoom={14}
      scrollWheelZoom
      className="realMap"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
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
