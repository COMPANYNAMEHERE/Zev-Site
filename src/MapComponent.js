import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Fix default marker icon for webpack builds
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// A helper component to attach a click handler to the map using useMapEvents
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: () => onMapClick(),
  });
  return null;
}

const MapComponent = () => {
  const position = [51.9225, 4.478309]; // Rotterdam coordinates

  const handleMapClick = () => {
    // Open external navigation via Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`;
    window.open(url, '_blank');
  };

  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={true}
      className="custom-map"
      style={{ width: '100%', height: '300px' }}
    >
      <TileLayer
        attribution='Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors'
        // Stamen Toner Background: a simplified, grayscale basemap with minimal labels
        url="https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          ZeV's Place <br /> Klik voor navigatie.
        </Popup>
      </Marker>
      <MapClickHandler onMapClick={handleMapClick} />
    </MapContainer>
  );
};

export default MapComponent;
