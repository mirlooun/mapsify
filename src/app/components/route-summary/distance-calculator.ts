import { useEffect, useState } from "react";

export function useRouteDistance(
  directions: google.maps.DirectionsResult | null
) {
  const [routeLength, setRouteLength] = useState<number | null>(null);

  useEffect(() => {
    const calculateRouteLenght = () => {
      let routeLength = 0;

      for (let leg of directions!.routes[0].legs) {
        routeLength += leg.distance!.value;
      }
      // To kilometers
      routeLength = routeLength / 1000;

      setRouteLength(routeLength);
    };

    if (directions !== null && directions.routes.length > 0) {
      calculateRouteLenght();
    } else {
      setRouteLength(null);
    }
  }, [directions]);

  return routeLength;
}
