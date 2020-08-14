import React, { useState } from "react";
import { TextInput, Button, Icon } from "react-materialize";
import signUp from "../api/signUp";

export default props => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: ""
  });

  const onSubmit = async () => {
    const result = signUp(data);
    if (result === true) {
      console.log("SIGN UP SUCCESSFUL");
    } else if (result === false) {
      alert("Sign Up Failed");
    }
  };

  const onChangeText = (key, value) => {
    const newData = { ...data };
    newData[key] = value;
    setData(newData);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div className="outerBox w400">
        <h4>Sign Up</h4>
        <TextInput
          label="First Name"
          onChange={e => onChangeText("firstName", e.target.value)}
        />
        <TextInput
          label="Last Name"
          onChange={e => onChangeText("lastName", e.target.value)}
        />
        <TextInput
          label="Email"
          onChange={e => onChangeText("email", e.target.value)}
        />
        <TextInput
          label="Password"
          onChange={e => onChangeText("password", e.target.value)}
        />
        <TextInput
          label="About You"
          onChange={e => onChangeText("bio", e.target.value)}
        />
        <Button node="button" type="submit" waves="light" onClick={onSubmit}>
          Sign Up
          <Icon right>send</Icon>
        </Button>
        <p>
          Already have an account?
          <span
            onClick={() => {
              props.changeState("SI");
            }}
            style={{
              marginLeft: 10,
              fontWeight: "600",
              color: "green",
              cursor: "pointer"
            }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};
