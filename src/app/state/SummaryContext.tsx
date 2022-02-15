import React, { useContext, useState } from "react";
import { Marker } from "../model/marker";

interface SummaryState {
  currentWaypoints: Marker[];
  addWaypoint: (marker: Marker, isSelected: boolean) => void;
  setCurrentWaypoints: React.Dispatch<React.SetStateAction<Marker[]>>;
}

const initialState: SummaryState = {
  currentWaypoints: [],
  addWaypoint: () => {},
  setCurrentWaypoints: () => {},
};

export const SummaryContext = React.createContext(initialState);

const SummaryContextProvider: React.FC = (props) => {
  const [currentWaypoints, setCurrentWaypoints] = useState<Marker[]>([]);

  const handleWaypointAdd = (marker: Marker, isSelected: boolean) => {
    if (isSelected) {
      console.log("Removing from current waypoints");
      setCurrentWaypoints((prev) => [
        ...prev.filter((m) => m.id !== marker.id),
      ]);
    } else {
      console.log("Adding to current waypoints");
      setCurrentWaypoints((prev) => [
        ...prev.filter((m) => m.id !== marker.id),
        marker,
      ]);
    }
  };

  const initialState: SummaryState = {
    currentWaypoints: currentWaypoints,
    addWaypoint: handleWaypointAdd,
    setCurrentWaypoints: setCurrentWaypoints,
  };

  return (
    <SummaryContext.Provider value={initialState}>
      {props.children}
    </SummaryContext.Provider>
  );
};

export const useSummaryContext = () => useContext(SummaryContext);

export default SummaryContextProvider;
