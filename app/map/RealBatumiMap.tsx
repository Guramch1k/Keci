"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
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

const places: Place[] = [
  {
    name: "Medea Restaurant",
    rating: "4.8",
    type: "Грузинская · $$",
    lat: 41.6502,
    lng: 41.6367,
  },
  {
    name: "Heart of Batumi",
    rating: "4.7",
    type: "Грузинская · $$",
    lat: 41.6471,
    lng: 41.6359,
  },
  {
    name: "Umami at Clouds",
    rating: "4.9",
    type: "Азиатская · $$$",
    lat: 41.6418,
    lng: 41.6338,
  },
  {
    name: "Black Sea Restaurant",
    rating: "4.6",
    type: "Морепродукты · $$",
    lat: 41.6492,
    lng: 41.6415,
  },
];

function createKeciIcon() {
  return new L.DivIcon({
    className: "keci-real-marker",
    html: `
      <div class="keci-real-marker-inner">
        <span></span>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -42],
  });
}

export default function RealBatumiMap() {
  const icon = createKeciIcon();

  return (
    <MapContainer
      center={[41.646, 41.636]}
      zoom={14}
      minZoom={12}
      maxZoom={19}
      scrollWheelZoom={true}
      zoomControl={false}
      className="realBatumiMap"
    >

      <ZoomControl position="bottomright" />

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => (
        <Marker
          key={place.name}
          position={[place.lat, place.lng]}
          icon={icon}
        >
          <Popup>
            <div className="keciPopup">

              <strong>
                {place.name}
              </strong>

              <div>
                ★ {place.rating}
              </div>

              <span>
                {place.type}
              </span>

              <button>
                Открыть
              </button>

            </div>
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}
