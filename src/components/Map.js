import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useRef, useState, memo } from "react";

// import Placeholder from "react-bootstrap/Placeholder";
import Spinner from 'react-bootstrap/Spinner';

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const containerStyle = {
  // display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  position: "relative",
  // display: "none",
};

const mapStyle = {
  height: "100%",
  width: "100%",
  position: "absolute",
  left: "0",
  top: "0",
  border: "1px solid black",
  // display: "none",
};

const formStyle = {
  width: "400px",
  height: "400px",
  position: "absolute",
  zIndex: "1",
  backgroundColor: "white",
  border: "1px solid black",
  // display: "none",
};

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

  async function calculateRoute(event) {
    event.preventDefault();
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
      // eslint-disable-next-line no-undef
      // waypoints: waypts,
      optimizeWaypoints: true,
    });
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
    <div style={containerStyle}>
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

      <Form style={formStyle}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Autocomplete>
              <Form.Control
                className="mb-2"
                type="text"
                id="origin"
                name="origin"
                placeholder="Origin"
                ref={origin}
              />
            </Autocomplete>
          </Col>
          <Col xs="auto">
            <Autocomplete>
              <Form.Control
                className="mb-2"
                type="text"
                id="destination"
                name="destination"
                placeholder="Destination"
                ref={destination}
              />
            </Autocomplete>
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2" onClick={calculateRoute}>
              Submit
            </Button>
          </Col>

          <FontAwesomeIcon
            icon="fa-trash"
            className="p-2 fa-2lg"
            onClick={clearRoute}
            style={{ color: "#0565EE" }}
          />
          <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>

          <FontAwesomeIcon
            icon="fa-trash"
            className="p-2 fa-2lg"
            onClick={() => {
              console.log("click");
              map.panTo(center);
              map.setZoom(15);
            }}
            style={{ color: "#0565EE" }}
          />
        </Row>
      </Form>
    </div>
  );
}

export default memo(Map);
