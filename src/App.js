import React, { useState } from 'react';
import './App.css';

import Map from './components/Map';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faLocation } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faLocation);

function App() {
  const [originDb, setOriginDb] = useState('Boulder, CO, USA');
  const [destinationDb, setDestinationDb] = useState('Longmont, CO, USA');
  
  //get originDB from geoLocationAPI
  // setOriginDb('Boulder, CO, USA');
  
  //get destinationDB from database
  // setDestinationDb('Longmont, CO, USA');

  return (
    <div className="App">
      <Map originDb={originDb} destinationDb={destinationDb} />
    </div>
  );
}

export default App;
