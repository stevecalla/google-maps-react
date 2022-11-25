import React, { useRef, useState, memo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import Spinner from "react-bootstrap/Spinner";

import SearchBar from "./SearchBar";
import { LoadMap } from "./LoadMap";

const center = { lat: 40.1672, lng: -105.1019 };
const libraries = ["places"];

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const origin = useRef();
  const destination = useRef();

  if (!isLoaded) {
    return <Spinner animation="border" />;
  }

  async function calculateRoute() {
    // event.preventDefault();
    if (origin.current.value === "" || destination.current.value === "") {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: origin.current.value,
      destination: destination.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      provideRouteAlternatives: true,
      // alternatives: true,
    });
    // console.log(results);
    // console.log(results.routes[0].legs[0]);
    // console.log(results.routes[0].legs[0].steps[0].instructions);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    origin.current.value = "";
    destination.current.value = "";
  }

  return (
    <div style={containerStyle} className="d-flex align-items-center">
      <LoadMap
        center={center}
        directionsResponse={directionsResponse}
        setMap={setMap}
      />

      <SearchBar
        calculateRoute={calculateRoute}
        center={center}
        clearRoute={clearRoute}
        destination={destination}
        distance={distance}
        duration={duration}
        map={map}
        origin={origin}
      />

    </div>
  );
}

export default memo(Map);

const containerStyle = {
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  position: "relative",
};
