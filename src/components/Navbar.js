import React, { useState } from "react";
import { Navbar, Icon, NavItem, Container } from "react-materialize";
import { firebaseApp } from "../firebase";
import { Link } from "react-router-dom";
import SingleUser from "./SingleUser";

export default ({ stage }) => {
  const [findUser, setFindUser] = useState(false);

  return (
    <div style={{ background: "royalblue" }}>
      <Container>
        <Navbar
          alignLinks="right"
          className="custom-navbar"
          menuIcon={<Icon>menu</Icon>}
          options={{
            draggable: true,
            edge: "left",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
          }}
        >
          <NavItem
            onClick={event => {
              setFindUser(true);
            }}
          >
            <Link to="/users">Find Users</Link>
          </NavItem>

          {findUser === true ? <SingleUser /> : ""}

          {stage === "loggedIn" && (
            <NavItem
              onClick={event => {
                //Stop the reloading of the page
                event.preventDefault();
                firebaseApp.auth().signOut();
              }}
            >
              Log out
            </NavItem>
          )}
        </Navbar>
      </Container>
    </div>
  );
};
