import "./App.css";
import Map from "./components/map/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import ControlPanel from "./components/control-panel/ControlPanel";
import RouteSummary from "./components/route-summary/RouteSummary";
import data from "../data/data.json";
import { useState } from "react";
import { Marker } from "./model/marker";
import { findDirections } from "./services/directions-service";
import SummaryContextProvider from "./state/SummaryContext";

const API_KEY = process.env.REACT_APP_API_KEY;
const CENTER_POINT = { lng: 26.364, lat: 58.2456 };

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY!,
  });

  const markers = data as Marker[];

  const [filteredWaypoints, setFilteredWaypoints] = useState<Marker[]>([]);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const calculateDistance = async (currentWaypoints: Marker[]) => {
    if (currentWaypoints.length < 2) return;

    const directions = await findDirections(currentWaypoints);

    setDirections(directions);
  };

  const filterWaypoints = (from: string, to: string) => {
    const filtered = markers.filter((marker) => {
      const markerDate = marker.date_created.split(" ")[0];
      return markerDate >= from && markerDate <= to;
    });
    setFilteredWaypoints(filtered);
  };

  const clearFilter = () => {
    setFilteredWaypoints([]);
  };

  return (
    <SummaryContextProvider>
      <div className="App">
        {isLoaded ? (
          <>
            <Map
              center={CENTER_POINT}
              markers={filteredWaypoints}
              directions={directions}
            />
            <ControlPanel
              directions={directions}
              setDirections={setDirections}
              filterWaypoints={filterWaypoints}
              clearFilter={clearFilter}
              calculateDistance={calculateDistance}
            />
            <RouteSummary directions={directions} />
          </>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </SummaryContextProvider>
  );
}

export default App;
