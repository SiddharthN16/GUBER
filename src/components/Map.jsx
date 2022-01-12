import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Map({ markerHandler, coordinates, marker }) {
  // loads the google maps api
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBI3mSmIlTQwxACtvrJzt2GdwvTWHWiOSM",
  });

  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  // map is displayed if it is loaded with a marker otherwise load nothing
  return isLoaded ? (
    <GoogleMap onClick={markerHandler} zoom={15} center={coordinates} mapContainerStyle={mapStyle}>
      <Marker position={marker} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
