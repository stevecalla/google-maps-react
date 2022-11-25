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
    <div style={formStyle} className="">
      <Form>
        <Autocomplete>
          <Form.Control
            className="ml-5"
            type="search"
            required
            id="origin"
            name="origin"
            placeholder="Origin"
            ref={origin}
            size="sm"
          />
        </Autocomplete>
        <Autocomplete>
          <Form.Control
            className=""
            type="search"
            required
            id="destination"
            name="destination"
            placeholder="Destination"
            ref={destination}
            size="sm"
          />
        </Autocomplete>
        <div className="d-flex justify-content-between pt-1">
          <Button
            type="submit"
            className="mb-1 ml-2"
            style={{ marginLeft: "5px"}}
            // onClick={calculateRoute}
            // onDoubleClick={() => setOpen(!open)}
            onClick={() => {
              calculateRoute();
              setOpen(!open);
            }}
            aria-controls="collapse-search-bar"
            aria-expanded={open}
            size="sm"
          >
            {open ? "Collapse" : "Submit"}
          </Button>
          <FontAwesomeIcon
            icon="fa-trash"
            className="pt-2 px-2 fa-lg"
            title="GitHub"
            // style={{ color: "#0565EE" }}
            style={{ color: "grey" }}
            // onClick={clearRoute}
            onClick={() => {
              clearRoute();
              setOpen(false);
            }}
            aria-controls="collapse-search-bar"
            aria-expanded={open}
          />
        </div>
      </Form>

      <Collapse in={open}>
        <div id="collapse-search-bar">
          <Autocomplete>
            <Form.Control
              className="mb-1"
              type="text"
              id="distance"
              name="distance"
              placeholder="Distance"
              value={distance && `Distance: ${distance}`}
              disabled
              size="sm"
            />
          </Autocomplete>
          <Autocomplete>
            <Form.Control
              className=""
              type="text"
              id="duration"
              name="duration"
              placeholder="Duration"
              value={distance && `Duration: ${duration}`}
              disabled
              size="sm"
            />
          </Autocomplete>
          <div className="d-flex justify-content-between">
            <Button style={{ visibility: "hidden" }} type="submit" size="sm">
              {open ? "Collapse" : "Submit"}
            </Button>
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
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default memo(SearchBar);

const formStyle = {
  top: "95px",
  left: "10px",
  position: "absolute",
  zIndex: "1",
  backgroundColor: "white",
};
