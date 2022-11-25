import React, { useState, useEffect, memo } from "react";
import { Autocomplete } from "@react-google-maps/api";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function SearchBar({
  calculateRoute,
  center,
  clearRoute,
  destination,
  distance,
  duration,
  map,
  origin,
}) {
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   console.log(open)
  //   calculateRoute();
  // }, [open, calculateRoute])
  

  return (
    <div style={formStyle} className="d-flex flex-column p-2 rounded">
      <Form>
        <Row>
          <Col xs="auto">
            <Autocomplete>
              <Form.Control
                className="mb-2"
                type="search"
                required
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
                type="search"
                required
                id="destination"
                name="destination"
                placeholder="Destination"
                ref={destination}
              />
            </Autocomplete>
          </Col>
          <Col xs="auto">
            <Button 
              type="submit" 
              className="mb-2" 
              // onClick={calculateRoute}
              // onDoubleClick={() => setOpen(!open)}
              onClick={() => {
                calculateRoute();
                setOpen(!open);
              }}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Submit
            </Button>
          </Col>
          <Col xs="auto">
            <FontAwesomeIcon
              icon="fa-trash"
              className="p-2 fa-xl"
              title="GitHub"
              // style={{ color: "#0565EE" }}
              style={{ color: "grey" }}
              // onClick={clearRoute}
              onClick={() => {
                clearRoute();
                setOpen(false);
              }}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            />
          </Col>
        </Row>
      </Form>

      <Collapse in={open}>
        <div id="example-collapse-text">
          <Row>
            <Col xs="auto">
              <Autocomplete>
                <Form.Control
                  className="mb-2"
                  type="text"
                  id="distance"
                  name="distance"
                  placeholder="Distance"
                  value={distance && `Distance: ${distance}`}
                  disabled
                />
              </Autocomplete>
            </Col>
            <Col xs="auto">
              <Autocomplete>
                <Form.Control
                  className="mb-2"
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="Duration"
                  value={distance && `Duration: ${duration}`}
                  disabled
                />
              </Autocomplete>
            </Col>
            <Col xs="auto">
              <Button style={{ visibility: "hidden" }} type="submit">
                Submit
              </Button>
            </Col>
            <Col xs="auto">
              <FontAwesomeIcon
                icon="fa-location"
                className="p-2 fa-xl"
                // style={{ color: "#0565EE" }}
                style={{ color: "grey" }}
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}
              />
            </Col>
          </Row>
        </div>
      </Collapse>

    </div>
  );
};

export default memo(SearchBar);

const formStyle = {
  top: "75px",
  position: "absolute",
  zIndex: "1",
  backgroundColor: "white",
};