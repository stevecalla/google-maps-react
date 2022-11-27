import React, { useState, memo } from "react";
import { Autocomplete } from "@react-google-maps/api";
import Form from "react-bootstrap/Form";
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

  return (
    <>
      <FontAwesomeIcon
        icon="fa-search"
        className="fa-duotone fa-xl"
        style={shareStyle}
        onClick={() => setOpen(!open)}
        title="Search"
        alt="Share my profile"
      />

      <div style={formStyle} className="">
        <Collapse in={open}>
          <div id="collapse-search-bar">
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
                  className="mb-1"
                  type="search"
                  required
                  id="destination"
                  name="destination"
                  placeholder="Destination"
                  ref={destination}
                  size="sm"
                />
              </Autocomplete>
            </Form>

            <Autocomplete>
              <Form.Control
                className="mb-0"
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

            <div className="d-flex justify-content-between pt-1">
              <Button
                type="submit"
                className="mb-1 ml-2"
                style={{ marginLeft: "5px" }}
                onClick={calculateRoute}
                aria-controls="collapse-search-bar"
                aria-expanded={open}
                size="sm"
              >
                Submit
              </Button>

              <FontAwesomeIcon
                  icon="fa-xmark-circle"
                  className="pt-1 px-2 fa-xl"
                  title="Delete"
                  alt="Delete input"
                  style={{ color: "grey" }}
                  onClick={() => {
                    clearRoute();
                    setOpen(false);
                  }}
                  aria-controls="collapse-search-bar"
                  aria-expanded={open}
                />
                
              {/* <FontAwesomeIcon
                icon="fa-location"
                className="pt-2 px-2 pb-1 fa-xl"
                title="Center"
                alt="Center Map"
                style={{ color: "grey" }}
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}
              /> */}
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default memo(SearchBar);

const formStyle = {
  top: "95px",
  left: "10px",
  position: "absolute",
  zIndex: "1",
  backgroundColor: "white",
  cursor: "grab",
  boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px",
};

const shareStyle = {
  height: "22px",
  width: "22px",
  bottom: "22px",
  left: "12px",
  padding: "10px",
  paddingLeft: "12px",
  color: "#666666",
  backgroundColor: "white",
  cursor: "grab",
  position: "absolute",
  zIndex: "1",
  boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px",
};
