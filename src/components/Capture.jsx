import { useState } from "react";
import { storage } from "../firebase";
import { ref as uploadRef, uploadBytesResumable } from "firebase/storage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Capture = () => {
  const [image, setImage] = useState("");
  const [uploaded, setUpload] = useState(false);
  const [imgFile, setImgFile] = useState();

  let navigate = useNavigate();

  // used to create the image names as the current date + time
  const today = new Date();
  const imgName = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}_${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;

  // function to display the user uploaded image
  const showUploaded = (e) => {
    setUpload(false);
    if (e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    setImgFile(e.target.files[0]);
  };

  // function to store the image to the firebase stoorage
  const storeImg = (event) => {
    event.preventDefault();
    // if there is not image uploaded, upload the image
    if (uploaded === false && image !== "") {
      let storageRef = uploadRef(storage, `/review/${imgName}`);
      // upload all the bytes of the image
      uploadBytesResumable(storageRef, imgFile).on("state_changed", (snapshot) => {
        while ((snapshot.totalBytes / snapshot.bytesTransferred) * 100 < 100) {
          console.log((snapshot.totalBytes / snapshot.bytesTransferred) * 100 !== 100);
        }
        // when all bytes uploaded, image is fully uploaded
        if ((snapshot.totalBytes / snapshot.bytesTransferred) * 100 === 100) {
          alert("Upload Done!");
          setUpload(true);
          navigate("/dashboard");
        }
      });
    }
    // errors messages
    else {
      if (!imgFile) {
        alert("Please Upload an Image of the location");
      } else {
        alert("Image already uploaded");
      }
    }
  };

  // building the capture page
  return (
    <div class="capSec2">
      <form className="captureSec">
        <h1>Cleanup Image</h1>
        <p style={{ width: "80%" }}>
          Submit the Image of your Garbage Cleanup for Manual Review. Return to the Dashboard when Done!
        </p>
        <label for="imgUpload" className="imgInputField" style={{ backgroundImage: `URL(${image})` }}>
          "Upload Image Here"
          <input id="imgUpload" type="file" accept="image/*" onChange={showUploaded} />
        </label>
        <Button className="sub-Capture" onClick={storeImg}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Capture;
