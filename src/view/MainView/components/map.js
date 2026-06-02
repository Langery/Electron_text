import { memo } from 'react';

const MapView = memo(() => (
  <div className="hello-map">
    <p className="text-style">It is the Map page about MapVGL</p>
    <div id="map_container" />
  </div>
));

export default MapView;
