import React from 'react';
import './App.css';

import Map from './components/Map';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faLocation } from '@fortawesome/free-solid-svg-icons';


library.add(faTrash, faLocation);

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
