import Header from "./Header.jsx";
import { useState } from "react";
import Map from "./Map.jsx";
import { useNavigate } from "react-router-dom";
import { ref as uploadRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { storage } from "../firebase";
import { db as database } from "../firebase";

import { Button } from "react-bootstrap";

const apiKey = "AIzaSyBI3mSmIlTQwxACtvrJzt2GdwvTWHWiOSM";

function Report() {
  const [image, setImage] = useState("");
  const [cords, setCords] = useState();
  const [name, setName] = useState("");
  const [volunteers, setVolunteers] = useState("");
  const [desc, setDesc] = useState("");
  const [uploaded, setUpload] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [marker, setMarker] = useState();

  let navigate = useNavigate();

  function handleMarker(e) {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMarker({ lat, lng });
    getAddress(lat, lng);
    console.log(marker);
  }

  function showUploaded(e) {
    setUpload(false);
    if (e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    setImgFile(e.target.files[0]);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleVolunteers(e) {
    setVolunteers(e.target.value);
  }

  let mapStyle = {
    width: "80vw",
    height: "80vw",
    maxWidth: "600px",
    maxHeight: "600px",
    borderRadius: "20px",
    overflow: "hidden",
  };

  async function getAddress(lat, lng) {
    let reqLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    const response = await fetch(reqLink);

    let data = await response.json();
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

  if (!cords) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      let currLat = position.coords.latitude;
      let currLng = position.coords.longitude;
      setCords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMarker(cords);
      getAddress(position.coords.latitude, position.coords.longitude);
    });
  }

  function storeImg(event) {
    if (uploaded === false && image !== "") {
      let storageRef = uploadRef(storage, `/images/${desc}${imgFile.name}`);
      uploadBytesResumable(storageRef, imgFile).on("state_changed", (snapshot) => {
        while ((snapshot.totalBytes / snapshot.bytesTransferred) * 100 < 100) {
          console.log((snapshot.totalBytes / snapshot.bytesTransferred) * 100 !== 100);
        }
        if ((snapshot.totalBytes / snapshot.bytesTransferred) * 100 === 100) {
          alert("Upload Done!");
          setUpload(true);
        }
      });
    } else {
      if (!imgFile) {
        alert("Please Upload an Image of the location");
      } else {
        alert("Image already uploaded");
      }
    }
  }

  function uploadInfo(event) {
    event.preventDefault();
    if (uploaded) {
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
    } else {
      alert("Please upload image or wait for it to upload");
    }
  }

  return (
    <div className="report-sec">
      <Header />
      <h1 className="call-to-action-report">See Garbage at your local park, or location?</h1>
      <div className="location">
        <h2>Location</h2>
        <div className="map">
          <Map coordinates={cords} marker={marker} markerHandler={handleMarker} />
        </div>
      </div>
      <form onSubmit={uploadInfo}>
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
          {" "}
          Upload Image
        </Button>
        <Button variant="primary" type="submit">
          REPORT
        </Button>
      </form>
    </div>
  );
}

export default Report;