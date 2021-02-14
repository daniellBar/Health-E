import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div><img alt="" src='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' style={{ height: 40, width: 40 }} /></div>

const API_KEY = 'AIzaSyCTwmmUbksAqfSEKLn9fR4oSVbBimBrXvk'

class SimpleMap extends Component {
  render() {
    let defaultCenter = {
      lat: 59.95,
      lng: 30.33
    }

    let defaultZoom= 11

    return (
      // Important! Always set the container height explicitly
      <div className="simple-map"  style={{ height: '300px', width: '370px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center || defaultCenter}
          defaultZoom={this.props.zoom || defaultZoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default SimpleMap;
