import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
import React, {Component} from "react";

import "./mapCss.css"


class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showInfoWindow: false,
    };
  }

  handleMapClick(props) {
    if (this.state.showInfoWindow) {
      this.setState({
        showInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  handleMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showInfoWindow: true,
    });
  }

  render() {
    const markerPosition = {
      lat: this.props.marker.position.latitude,
      lng: this.props.marker.position.longitude,
    };

    const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${markerPosition.lat},${markerPosition.lng}`;

    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={markerPosition}
        containerStyle={{
          maxHeight: "100%",
          position: "relative",
          width: "100%",
        }}
        onClick={this.handleMapClick}
      >
        <Marker
          onClick={this.handleMarkerClick}
          position={markerPosition}
          name={this.props.marker.name}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfoWindow}
        >
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
            <a href={directionsLink}>Get Directions</a>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCKqyLfb3rmO6CPk4Fl3mBhXCdkbl-zHK4",
})(MapContainer);

export {MapContainer};