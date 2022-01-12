import { useState } from "react";
import Map from "./Map.jsx";
import { useNavigate } from "react-router-dom";
import { ref as uploadRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { storage } from "../firebase";
import { db as database } from "../firebase";
import { Button } from "react-bootstrap";

// google maps api key
const apiKey = "AIzaSyBI3mSmIlTQwxACtvrJzt2GdwvTWHWiOSM";

function Report() {
  // all the usestates for the form information
  const [image, setImage] = useState("");
  const [cords, setCords] = useState();
  const [name, setName] = useState("");
  const [volunteers, setVolunteers] = useState("");
  const [desc, setDesc] = useState("");
  const [uploaded, setUpload] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [marker, setMarker] = useState();

  let navigate = useNavigate();

  // function used to set the marker based on the location
  function handleMarker(e) {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMarker({ lat, lng });
    getAddress(lat, lng);
    console.log(marker);
  }

  // show the uploaded image of where garbage was spotted
  function showUploaded(e) {
    setUpload(false);
    if (e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    setImgFile(e.target.files[0]);
  }

  // set the name of the park from the form
  function handleChange(e) {
    setName(e.target.value);
  }

  // set the number of volunteers required from the form
  function handleVolunteers(e) {
    setVolunteers(e.target.value);
  }

  // function used to get the users location
  async function getAddress(lat, lng) {
    let reqLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    const response = await fetch(reqLink);

    let data = await response.json();
    // when there is a response, fill in the location type information
    if (data) {
      data = data.results[0].address_components;

      let country, province, city, street;

      data.forEach((elem) => {
        if (elem.types.includes("country")) {
          country = elem.short_name;
        } else if (elem.types.includes("administrative_area_level_1")) {
          province = elem.short_name;
        } else if (elem.types.includes("locality")) {
          city = elem.short_name;
        } else if (elem.types.includes("route")) {
          street = elem.short_name;
        }
      });
      setDesc(`${street}, ${city}, ${province}, ${country}`);
    }
  }

  let missisaugaLocation = {
    lat: 43.589,
    lng: -79.6441,
  };

  // used to set the marker to the user's location
  if (!cords) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        setCords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setTimeout(function () {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          setMarker({ lat, lng });
        }, 100);
        getAddress(position.coords.latitude, position.coords.longitude);
      },
      // default location on map if location services is disables and sets
      (error) => {
        setCords(missisaugaLocation);
      }
    );
  }

  // used to store the image from the firebase
  function storeImg(event) {
    event.preventDefault();
    // when the image is not uploaded, upload image
    if (uploaded === false && image !== "") {
      let storageRef = uploadRef(storage, `/images/${desc}${imgFile.name}`);
      // upload all the bytes of the image
      uploadBytesResumable(storageRef, imgFile).on("state_changed", (snapshot) => {
        while ((snapshot.totalBytes / snapshot.bytesTransferred) * 100 < 100) {
          console.log((snapshot.totalBytes / snapshot.bytesTransferred) * 100 !== 100);
        }
        // when all bytes are transferred, upload is done
        if ((snapshot.totalBytes / snapshot.bytesTransferred) * 100 === 100) {
          alert("Upload Done!");
          setUpload(true);
          setTimeout(function () {
            uploadInfo();
          }, 1200);
        }
      });
    } else {
      // throw errors
      if (!imgFile) {
        alert("Please Upload an Image of the location");
      } else {
        alert("Image already uploaded");
      }
    }
  }
  // upload all the gathered report information from the form to upload to database
  function uploadInfo() {
    if (name && name !== "" && desc && desc !== "" && image && image !== "" && volunteers && volunteers !== "") {
      getDownloadURL(uploadRef(storage, `/images/${desc}${imgFile.name}`))
        .then((url) => {
          set(dbRef(database, `/Events/${desc}`), {
            name: name,
            desc: desc,
            volunteers: volunteers,
            image: url,
          }).catch(alert);
          setUpload(false);
          navigate("/");
        })
        .catch(alert);
    } else {
      alert("Please fill in all the feilds");
    }
  }
  // build the report page
  return (
    <div className="report-sec">
      <h1 className="call-to-action-report">See Garbage at your local park, or location?</h1>
      <div className="location">
        <h2>Location</h2>
        <div className="map">
          <Map coordinates={cords} marker={marker} markerHandler={handleMarker} />
        </div>
      </div>
      <form>
        <h2>Image</h2>
        <label for="imgUpload" className="imgInputField" style={{ backgroundImage: `URL(${image})` }}>
          "Upload Image Here"
          <input id="imgUpload" type="file" accept="image/*" onChange={showUploaded} />
        </label>

        <label className="info-input" for="title-input">
          Park Name
        </label>
        <input className="input-box" type="text" id="title-input" value={name} onChange={handleChange} />

        <label className="info-input" for="volunteer-input">
          Estimate of Volunteers Needed
        </label>
        <input
          className="input-box"
          type="number"
          id="volunteer-input"
          min="1"
          value={volunteers}
          onChange={handleVolunteers}
        />

        <Button id="upload" variant="primary" onClick={storeImg}>
          REPORT
        </Button>
      </form>
    </div>
  );
}

export default Report;
