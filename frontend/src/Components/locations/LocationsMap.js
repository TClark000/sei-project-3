import React from 'react'
import MapGL, { NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


class LocationsMap extends React.Component {

  state = {
    viewport: null
  }

  componentDidMount() {
    const { featureSelected } = this.props
    let zoom = 12
    if (featureSelected === 'gowild') {
      zoom = 8
    } else if (featureSelected === 'nightlife') {
      zoom = 13
    } else {
      zoom = 12
    }

    this.setState({
      viewport: {
        latitude: 45.5017,
        longitude: -73.5673,
        zoom: zoom,
        width: '100%',
        height: '700px'
      }
    })
  }

  addMarker(locationToAdd) {
    return <Popup
      key={locationToAdd._id}
      latitude={locationToAdd.coords[0].latitude}
      longitude={locationToAdd.coords[0].longitude}
      className='our-popup'
    >
      <span role='img' aria-label='marker'>{locationToAdd.placeName}</span>
    </Popup>
  }


  pickMapStyle(featureSelected) {
    if (featureSelected === 'gowild') {
      return 'mapbox://styles/teresajclark/ckgzm00mr1ewz19np07bvi341'
    } else if (featureSelected === 'nightlife') {
      return 'mapbox://styles/teresajclark/ckgzljupw81wz19paqpcu360m'
    } else {
      return 'mapbox://styles/mapbox/outdoors-v11'
    }
  }

  render() {
    const { locationsData, featureSelected } = this.props
    const { viewport } = this.state
    return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={this.pickMapStyle(featureSelected)}
      >
        <div>
          <NavigationControl onViewportChange={(viewport) => this.setState({ viewport })} />
        </div>
        {locationsData.map((location) => location.coords[0] ? this.addMarker(location) : null)}
      </MapGL>

    )
  }
}

export default LocationsMap

