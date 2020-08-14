import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-materialize";
import { userRef } from "../firebase";

export default ({ details, myUID }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const getName = () => {
      userRef.child(details.createdBy).once("value", snap => {
        setFirstName(snap.val()["firstName"]);
        setLastName(snap.val()["lastName"]);
        setImageURL(snap.val()["imageURL"]);
        setBio(snap.val()["bio"]);
      });
    };
    if (details && details.createdBy) {
      getName();
    }
  }, [details]);

  return (
    <div>
      <Container>
        <Row>
          <Col s={12} m={3}></Col>
          <Col s={12} m={6}>
            <div className="outerBox1">
              <div>
                <div>
                  <div style={{ display: "flex", marginBottom: 10 }}>
                    <div>
                      <div
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 8,
                          overflow: "hidden"
                        }}
                      >
                        <img
                          src={
                            details.imageURL
                              ? details.imageURL
                              : "https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
                          }
                          alt="profile photo"
                          height="100%"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: 10,
                        flex: 1
                      }}
                    >
                      <div
                        style={{
                          color: "#ff0000",
                          fontWeight: 600,
                          fontSize: 30,
                          paddingLeft: "auto",
                          paddingRight: "auto",
                          marginBottom: 0,
                          marginLeft: "auto",
                          marginRight: "auto"
                        }}
                      >
                        <strong>
                          {details.firstName} {details.lastName}
                        </strong>
                      </div>
                      <div style={{ fontFamily: "Lato", fontSize: 18 }}>
                        <p>{details.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col s={12} m={3}></Col>
        </Row>
      </Container>
    </div>
  );
};
