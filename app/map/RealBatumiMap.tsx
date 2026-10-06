"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useMemo } from "react";

import "leaflet/dist/leaflet.css";

export type Place = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  cuisine: string;
  address: string;
  phone: string;
  website: string;
  openingHours: string;
};

type Props = {
  places: Place[];
  selected: string | null;
  onSelect: (id: string) => void;
};

function MapController({
  selected,
  places,
}: {
  selected: string | null;
  places: Place[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!selected) return;

    const place = places.find(
      (item) => item.id === selected
    );

    if (place) {
      map.flyTo(
        [place.lat, place.lng],
        Math.max(map.getZoom(), 16),
        {
          duration: 0.6,
        }
      );
    }
  }, [selected, places, map]);

  return null;
}

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

export default function RealBatumiMap({
  places,
  selected,
  onSelect,
}: Props) {
  const icon = useMemo(
    () => createKeciIcon(),
    []
  );

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
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        selected={selected}
        places={places}
      />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[
            place.lat,
            place.lng,
          ]}
          icon={icon}
          eventHandlers={{
            click: () =>
              onSelect(place.id),
          }}
        >
          <Popup>
            <div className="keciPopup">
              <strong>{place.name}</strong>

              {place.cuisine && (
                <span>
                  {place.cuisine.replaceAll(
                    "_",
                    " · "
                  )}
                </span>
              )}

              {place.address && (
                <span>
                  {place.address}
                </span>
              )}

              {place.openingHours && (
                <small>
                  {place.openingHours}
                </small>
              )}

              <a
                href={
                  "https://www.openstreetmap.org/?mlat=" +
                  place.lat +
                  "&mlon=" +
                  place.lng +
                  "#map=19/" +
                  place.lat +
                  "/" +
                  place.lng
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть в OpenStreetMap
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
