import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Marker as MarkerModel } from "../../model/marker";
import { useSummaryContext } from "../../state/SummaryContext";

interface LocationMarkerProps {
  marker: MarkerModel;
  clusterer: any;
  directions: google.maps.DirectionsResult | null;
}

const LocationMarker = ({
  marker,
  clusterer,
  directions,
}: LocationMarkerProps) => {
  const { currentWaypoints, addWaypoint } = useSummaryContext();

  const [isSelected, setSelected] = useState(false);
  const [isClickable, setClickable] = useState(true);

  //Mark marker as selected if it is in current waypoints array
  useEffect(() => {
    if (currentWaypoints.length === 0 && isSelected) {
      setSelected(false);
    }
  }, [currentWaypoints, isSelected]);

  useEffect(() => {
    if (directions !== null) {
      setClickable(false);
    } else {
      setClickable(true)
    }
  }, [directions]);

  const handleMarkerClick = () => {
    // If marker is disabled then it can't be used for route calculation
    if (marker.date_disabled) return;

    addWaypoint(marker, isSelected);

    setSelected((prev) => !prev);
  };

  return (
    <Marker
      onClick={isClickable ? handleMarkerClick : undefined}
      position={{ lng: marker.lng, lat: marker.lat }}
      icon={{
        url: marker.date_disabled ? "/locationOff.svg" : "/location.svg",
        scaledSize: {
          width: isSelected ? 70 : 50,
          height: isSelected ? 70 : 50,
          equals: () => true,
        },
        labelOrigin: new google.maps.Point(25, -7),
      }}
      label={{ text: marker.id.toString(), color: "black" }}
      clusterer={clusterer}
    />
  );
};

export default LocationMarker;
