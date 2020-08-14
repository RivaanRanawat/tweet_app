import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Icon, CardTitle } from "react-materialize";
import "./ProfilePage.css";

export default () => {
  const { uid } = useParams();
  return (
    <div className="outerBox m10">
      (
      <div>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                overflow: "hidden"
              }}
            >
              <img
                src="https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
                alt="profile photo"
                height="100%"
              />
            </div>
          </div>
          <div style={{ marginLeft: 10, flex: 1 }}>Rivaan</div>
          <div style={{ cursor: "pointer" }}>
            <Icon>edit</Icon>
          </div>
        </div>
        <div style={{ borderTop: "1px solid lightgray" }}>
          <div
            style={{
              color: "darkblue",
              fontFamily: "fantasy",
              marginTop: 10
            }}
          >
            About me:
          </div>
          <div style={{ fontSize: 12 }}>bio</div>
        </div>
      </div>
      )}
    </div>
  );
};
