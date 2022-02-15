import { useEffect, useState } from "react";
import { Marker } from "../../model/marker";

export const useSelected = (currentWaypoints: Marker[]) => {
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    if (currentWaypoints.length === 0 && isSelected) {
      setSelected(false);
    }
  }, [currentWaypoints, isSelected]);

  return isSelected;
};

export const useClickable = (directions: google.maps.DirectionsResult | null) => {
  const [isClickable, setClickable] = useState(false);
  useEffect(() => {
    if (directions !== null) {
      setClickable(false);
    } else {
      setClickable(true);
    }
  }, [directions]);
  return isClickable;
};
