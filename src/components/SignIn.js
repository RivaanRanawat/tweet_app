import React from "react";

import { TextInput } from "react-materialize";
export default () => {
  return (
    <div className="outerBox">
      <TextInput label="Email" />
      <TextInput label="Password" />
    </div>
  );
};
