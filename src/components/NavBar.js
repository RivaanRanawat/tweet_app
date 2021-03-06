import React from "react";
import { Navbar, NavItem, Icon, Container } from "react-materialize";
import { firebaseApp } from "../firebase";
export default () => {
  return (
    <div style={{ background: "royalblue" }}>
      <Container>
        <Navbar
          alignLinks="right"
          brand={
            <a className="brand-logo" href="">
              Logo
            </a>
          }
          className="custom-navbar"
          id="mobile-nav"
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
            href="components.html"
            onClick={() => {
              firebaseApp.auth().signOut();
            }}
          >
            Log Out
          </NavItem>
        </Navbar>
      </Container>
    </div>
  );
};
