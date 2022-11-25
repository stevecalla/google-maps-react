import React from 'react';
import './App.css';

import Map from './components/Map';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
