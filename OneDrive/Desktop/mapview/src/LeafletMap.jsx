import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import citiesData from "./cities.json"; // First JSON file
import highlightedCitiesData from "./highlightedCities.json"; // Second JSON file

// Define custom marker icons for different colors
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const whiteIcon = new L.Icon({
  iconUrl: "https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const LeafletMap = () => {
  // Example coordinates for Dalian and Patna (you should replace with actual coordinates)
  const dalianCoordinates = [38.914, 121.6147];
  const patnaCoordinates = [25.5941, 85.1376];

  // Define polyline options
  const polylineOptions = {
    color: 'green', // Line color
    weight: 5, // Line weight in pixels
    opacity: 1, // Line opacity (0 to 1)
  };

  return (
    <MapContainer center={[20, 77]} zoom={5} style={{ height: "100vh", width: "100vw" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render markers from the first JSON file (cities.json) */}
      {citiesData.map((city) => {
        // Conditional logic to use different marker colors for Dalian
        const icon = (city.name === "Dalian") ? redIcon : blueIcon;

        return (
          <Marker key={city.name} position={city.coordinates} icon={icon}>
            <Popup>
              <div className="bg-red-500 text-white p-2 rounded">
                {city.name}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Render markers from the second JSON file (highlightedCities.json) with white markers */}
      {highlightedCitiesData.map((highlightedCity) => (
        <Marker key={highlightedCity.name} position={highlightedCity.coordinates} icon={whiteIcon}>
          <Popup>
            <div className="bg-white text-black p-2 rounded">
              {highlightedCity.name}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Add polyline from Dalian to Patna */}
      <Polyline positions={[dalianCoordinates, patnaCoordinates]} pathOptions={polylineOptions} />
      <Polyline positions={[[23.1291, 113.2644],[28.6692, 77.4538]]} pathOptions={polylineOptions} />
      {/* New code for polyline */}
    </MapContainer>
  );
};

export default LeafletMap;
