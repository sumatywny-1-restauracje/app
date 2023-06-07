/* eslint-disable jsx-a11y/img-redundant-alt */
import type { Location, SelectedLocation } from "types";
import type { MarkerDragEvent, LngLat } from "react-map-gl";
import { useCallback, useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

type MapComponentProps = {
  locations: Array<Location>;
  selectedLocation?: SelectedLocation;
  setSelectedLocation?: (location: SelectedLocation) => void;
  withPopups?: boolean;
};

const MapComponent = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  withPopups,
}: MapComponentProps) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const [popupInfo, setPopupInfo] = useState<Location | null>(null);

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
      // eslint-disable-next-line no-undef
      mapboxAccessToken={ENV.mapboxAccessToken}
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
      {locations.map((location) => (
        <Marker
          key={location.restaurantId}
          longitude={location.geoLon}
          latitude={location.geoLat}
          color="#3FB1CE"
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
          <div
            className={`${
              withPopups && "cursor-pointer"
            } text-4xl text-sky-400`}
          >
            <FaMapMarkerAlt />
          </div>
        </Marker>
      ))}
      {popupInfo && withPopups && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo?.geoLon)}
          latitude={Number(popupInfo?.geoLat)}
          onClose={() => setPopupInfo(null)}
          maxWidth="320px"
        >
          <div className="flex gap-2">
            <img
              width="80px"
              src={popupInfo.image.src}
              alt={popupInfo.image.alt}
            />
            <div>
              <p>
                {popupInfo.address}, {popupInfo.city}
              </p>
              <p>{popupInfo.workingHours}</p>
              <p>{popupInfo.phone}</p>
            </div>
          </div>
        </Popup>
      )}
      <NavigationControl />
    </Map>
  );
};

export default MapComponent;
