import React, { Component } from "react";
// import './hello.css'

class MapView extends Component {
  componentWillMount () {
  }
  render () {
    return (
      <div className="hello-map">
        <p className="text-style">
          It is the Map page about MapVGL
        </p>
        <div id="map_container"></div>
      </div>
    )
  }
}

export default MapView;