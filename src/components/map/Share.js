import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Share = () => {
  //section need to pass in location info
  const [show, setShow] = useState(false);
  const [tinyURI, setTinyURI] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let origin = "Boulder, CO, USA"; //origin
  let destination = "Longmont, CO, USA"; //destination

  let encodedURI = "";

  const webShareAPI = () => {
    // create map URL
    const uri = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    encodedURI = encodeURI(uri);

    // fetch tinyURL
    const tinyUrlApiPath = `https://api.tinyurl.com/create?api_token=${process.env.REACT_APP_TINY_URL_KEY}`; // set tinyurl api call path

    postData(tinyUrlApiPath).then((data) => {
      setTinyURI(data.data.tiny_url);
      console.log({data})
      console.log(data.data.tiny_url)
    });

    console.log(tinyURI)

    shareNavigator();
    // setTimeout(() => {
    // }, 5000);

  };

  function shareNavigator() {
    if (navigator.share) {
      console.log("true");
      navigator
        .share({ text: iphoneInfo})
        // .share({text: `Pristine Clean Directions, Job Location: ${destination}, Map Link: ${tinyURI}, Cleaning at it's finest!!`})
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Launch modal to send email if navigator share feature doesn't exist
      handleShow();
    }
  }

  let iphoneInfo = `Pristine Clean Directions, Job Location: ${destination}, Map Link: ${tinyURI}, Cleaning at it's finest!!`;

  let emailInfo = `mailto:?subject=Pristine Clean Job Directions: ${destination}&body=Directions from ${origin} to ${destination}. Map Link: ${tinyURI}`;

  // URL would not post properly in email with "&". Use tiny URL to get around the issue.
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        url: encodedURI,
        domain: "tiny.one",
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <>
      <FontAwesomeIcon
        icon="fa-share-nodes"
        className="fa-2xl"
        style={shareStyle}
        onClick={() => webShareAPI()}
        title="Share"
        alt="Share my profile"
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="e">Email Directions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Button
            className="btn btn-secondary"
            variant="secondary"
            title="Email share"
            onClick={() => window.open(emailInfo)}
          >
            Click to Email Directions
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

const shareStyle = {
  bottom: "200px",
  padding: "6px",
  right: "12px",
  color: "#0E6DFD",
  backgroundColor: "white",
  cursor: "grab",
  position: "absolute",
  zIndex: "3",
};
