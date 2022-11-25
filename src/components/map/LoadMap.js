import React from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

export const LoadMap = ({ center, directionsResponse, setMap }) => {
  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={mapStyle}
      options={{
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
      }}
      onLoad={(map) => {
        setMap(map);
        map.setZoom(15);
        // eslint-disable-next-line no-undef
        new google.maps.Marker({
          // eslint-disable-next-line no-undef
          position: new google.maps.LatLng(center.lat, center.lng),
          // position: {center},
          map: map,
        });
        // eslint-disable-next-line no-undef
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
      }}
    >
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  );
};

const mapStyle = {
  height: "100%",
  width: "100%",
  position: "absolute",
  left: "0",
  top: "0",
  border: "1px solid black",
};
