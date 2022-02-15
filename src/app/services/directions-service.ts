import { Marker } from "../model/marker";

export async function findDirections(waypoints: Marker[]) {
  const directionService = new google.maps.DirectionsService();

  const directions = await directionService.route(
    {
      origin: getOrigin(waypoints),
      destination: getDestination(waypoints),
      waypoints: waypoints.length > 2 ? getWaypoints(waypoints) : [],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        return result;
      } else {
        console.error(`error fetching directions ${result}`);
        return null;
      }
    }
  );
  
  return directions;
}

function getOrigin(waypoints: Marker[]) {
  return { lng: waypoints[0].lng, lat: waypoints[0].lat };
}

function getDestination(waypoints: Marker[]) {
  return {
    lng: waypoints[waypoints.length - 1].lng,
    lat: waypoints[waypoints.length - 1].lat,
  };
}

function getWaypoints(waypoints: Marker[]) {
  return [...waypoints].splice(1, waypoints.length - 2).map((p) => ({
    location: { lat: p.lat, lng: p.lng },
  })) as google.maps.DirectionsWaypoint[];
}
