import { memo, useCallback, useRef } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerClusterer,
} from "@react-google-maps/api";
import s from "./Map.module.css";
import LocationMarker from "../marker/LocationMarker";
import { useDraggableMap } from "./useDraggable";
import { Marker } from "../../model/marker";
import SummaryContextProvider, {
  useSummaryContext,
} from "../../state/SummaryContext";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const defaultOptions = {
  zoomControl: true,
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  keyboardShortCuts: false,
};

interface MapProps {
  center?: { lat: number; lng: number };
  directions: google.maps.DirectionsResult | null;
  markers: Marker[];
}

const Map = ({ center, directions, markers }: MapProps) => {
  const centerPoint = {
    lat: center ? center.lat : markers[0].lat,
    lng: center ? center.lng : markers[0].lng,
  };

  const isDraggable = useDraggableMap(directions);

  const mapRef = useRef<GoogleMap | undefined>(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  console.log("Map rendered");
  

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ ...defaultOptions, draggable: isDraggable }}
      >
        {directions !== null ? (  
          <DirectionsRenderer
            options={{ markerOptions: { visible: false } }}
            directions={directions}
          />
        ) : null}
        {markers.length > 0 ? (
          <MarkerClusterer>
            {(clusterer) =>
              markers.map((marker) => (
                <LocationMarker
                  key={marker.id}
                  marker={marker}
                  clusterer={clusterer}
                  directions={directions}
                />
              ))
            }
          </MarkerClusterer>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default memo(Map);
