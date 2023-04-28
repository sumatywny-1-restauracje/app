import type { MarkerDragEvent, LngLat } from "react-map-gl";
import { useCallback, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";

type MapLocation = {
  id?: number;
  longitude: number;
  latitude: number;
};

type MapComponentProps = {
  data?: Array<MapLocation>;
  selectedLocation?: MapLocation;
  setSelectedLocation?: (location: MapLocation) => void;
};

const MapComponent = ({
  data,
  selectedLocation,
  setSelectedLocation,
}: MapComponentProps) => {
  // eslint-disable-next-line no-unused-vars
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    if (setSelectedLocation) {
      setSelectedLocation({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);
  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoic3RlcG5pYWN6a3kiLCJhIjoiY2xoMGt1YmxpMHVuczNlcnpoNTlrZXZ2bCJ9.uYYqJlTNB3I5xdXrdnrWeQ"
      initialViewState={{
        longitude: 19.1343786,
        latitude: 51.9189046,
        zoom: 5,
      }}
      style={{ width: "100%", height: "100%", minHeight: "350px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
          color="#FB7185"
        ></Marker>
      )}
      {data?.map((location) => (
        <Marker
          key={location.id}
          longitude={location.longitude}
          latitude={location.latitude}
          color="#3FB1CE"
        />
      ))}
      <NavigationControl />
    </Map>
  );
};

export default MapComponent;
