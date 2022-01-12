import { GoogleMap, useJsApiLoader , Marker } from '@react-google-maps/api';

function Map({markerHandler, coordinates, marker}){
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBI3mSmIlTQwxACtvrJzt2GdwvTWHWiOSM"
  })

  const mapStyle = {
    width: '100%',
    height: '100%'
  };

  return isLoaded ? (
    <GoogleMap
    onClick={markerHandler}
    zoom={15}
    center={coordinates}
    mapContainerStyle={mapStyle}
    >
      <Marker position={marker} />
    </GoogleMap>

  ): <></>
}

export default Map;