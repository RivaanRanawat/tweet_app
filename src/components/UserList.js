import React, { useEffect, useState, setState } from "react";
import { userRef, firebaseApp } from "../firebase";
import SingleUser from "./SingleUser";
import { Autocomplete, Icon } from "react-materialize";

export default () => {
  const [users, setUsers] = useState([]);
  const [myUID, setMyUID] = useState("");

  useEffect(() => {
    const getAllTheUsers = async () => {
      userRef.on("value", snap => {
        var fetchedUsers = [];
        snap.forEach(singleUser => {
          fetchedUsers.push({
            ...singleUser.val()
          });
        });
        const uid = firebaseApp.auth().currentUser.uid;
        setMyUID(uid);
        fetchedUsers.reverse();
        setUsers(fetchedUsers);
      });
    };
    getAllTheUsers();
  }, []);

  return (
    <div>
      {users.map(singleUser => (
        <SingleUser details={singleUser} myUID={myUID} />
      ))}
    </div>
  );
};
