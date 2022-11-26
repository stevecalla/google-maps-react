import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Share = () => {
  return (
    <div>
      <p>HELLO</p>
       <FontAwesomeIcon
            icon="fa-share-nodes"
            className="fa-2xl"
            title="Share"
            style={shareStyle}
            onClick={() => {}}
          />
    </div>
  )
}

const shareStyle = {
  bottom: "200px",
  padding: "6px",
  right: "12px",
  color: "#0E6DFD",
  backgroundColor: "white",
  pointer: "grab",
  position: "absolute",
  zIndex: "3",
};