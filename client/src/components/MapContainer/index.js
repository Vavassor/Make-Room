import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
import React, {Component} from "react";
import "./style.css";

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
    return (
      <Map
        className="map"
        google={this.props.google}
        zoom={14}
        containerStyle={{
          height: "250px",
          position: "relative",
          width: "100%",
        }}
        onClick={this.handleMapClick}
      >
        <Marker
          onClick={this.handleMarkerClick}
          name="Current location"
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
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