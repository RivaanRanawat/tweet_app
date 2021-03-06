import React, { useState } from "react";
import { firebaseApp, storageRef } from "../firebase";
import editUserInfo from "../api/editUserInfo";
import { Button } from "react-materialize";

export default ({ changeToFalse, userDetails }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const onSubmit = () => {
    const uid = firebaseApp.auth().currentUser.uid;
    //hi
    if (image) {
      var uploadTask = storageRef.ref(`image/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        () => {},
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(imageURL) {
            const data = {
              uid,
              firstName,
              lastName,
              imageURL,
              email: userDetails.email,
              bio
            };

            const result = editUserInfo(data);

            if (result === true) {
              console.log("User Info Edited");
            }

            if (result === false) {
              console.log("Error");
            }
          });
        }
      );
    } else {
      const data = {
        uid,
        firstName,
        lastName,
        bio
      };

      const result = editUserInfo(data);

      if (result === true) {
        console.log("User Info Edited");
      }

      if (result === false) {
        console.log("Error");
      }
    }
  };

  return (
    <div>
      <div onClick={() => changeToFalse()}>
        <span style={{ cursor: "pointer" }} class="material-icons">
          navigate_before
        </span>
      </div>
      {image && (
        <img src={URL.createObjectURL(image)} alt="profile pic" height="40px" />
      )}
      <input type="file" onChange={event => setImage(event.target.files[0])} />
      <input
        placeholder="Enter Your First Name"
        value={firstName}
        onChange={event => setFirstName(event.target.value)}
      />
      <input
        placeholder="Enter your last Name"
        value={lastName}
        onChange={event => setLastName(event.target.value)}
      />
      <input
        placeholder="About You"
        value={bio}
        onChange={event => setBio(event.target.value)}
      />
      <Button
        style={{ justifyContent: "center", backgroundColor: "royalblue" }}
        onClick={onSubmit}
      >
        OK
      </Button>
    </div>
  );
};
