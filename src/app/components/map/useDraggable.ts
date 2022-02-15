import { useEffect, useState } from "react";

export const useDraggableMap = (
  directions: google.maps.DirectionsResult | null
) => {
  const [isDraggable, setDraggable] = useState(true);

  useEffect(() => {
    if (directions != null) {
      setDraggable(false);
    } else {
      setDraggable(true);
    }
  }, [directions]);

  return isDraggable;
};
