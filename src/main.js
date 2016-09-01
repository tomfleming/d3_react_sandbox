import ReactMap from './ReactMap';
import React from 'react';
import ReactDOM from 'react-dom';

var rootElement = document.getElementById('mymap');
ReactDOM.render(<ReactMap mapfile="dist/us.json" width={500} />, rootElement);
