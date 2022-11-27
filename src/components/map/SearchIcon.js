import React from "react";
// import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchIcon = () => {
  //section need to pass in location info
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <FontAwesomeIcon
        icon="fa-search"
        className="fa-duotone fa-xl"
        style={shareStyle}
        // onClick={() => webShareAPI()}
        title="Search"
        alt="Share my profile"
      />
    </>
  );
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
