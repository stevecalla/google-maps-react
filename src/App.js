import React, { useState } from 'react';
import './App.css';

import Map from './components/Map/';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faLocation, faShareNodes, faXmarkCircle, faSearchLocation, faSearch } from '@fortawesome/free-solid-svg-icons';

import { geoLocation, error, options } from "./components/Map/geoLocation";

library.add(faTrash, faLocation, faShareNodes, faXmarkCircle, faSearchLocation, faSearch);

function App() {
  const [originDb, setOriginDb] = useState('Boulder, CO, USA');
  // const [originDb, setOriginDb] = useState('40.0945509, -105.178197'); //Boulder, CO
  const [destinationDb, setDestinationDb] = useState('Longmont, CO, USA');

  // get originDB from geoLocationAPI
  // convert geoLocation lat/lng to street address
  // setOriginDb('Boulder, CO, USA');
  // navigator.geolocation.getCurrentPosition(geoLocation, error, options);

  let currentLocation;
  async function getLocation() {
    currentLocation = await geoLocation;
  }

  getLocation();
  console.log(currentLocation);
  
  //get destinationDB from database
  // setDestinationDb('Longmont, CO, USA');

  return (
    <div className="App">
      <Map originDb={originDb} destinationDb={destinationDb} />
    </div>
  );
}

export default App;
