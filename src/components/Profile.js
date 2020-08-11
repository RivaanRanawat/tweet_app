import React, { useState } from "react";
import { Icon } from "react-materialize";
import EditProfile from "./EditProfile";
export default ({ userDetails }) => {
  const [editMode, setEditMode] = useState(false);

  const changeToFalse = () => {
    setEditMode(false);
  };

  return (
    <div className="outerBox m10">
      {editMode ? (
        <div>
          <EditProfile
            changeToFalse={changeToFalse}
            userDetails={userDetails}
          />
        </div>
      ) : (
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
                  src={
                    userDetails && userDetails.imageURL
                      ? userDetails.imageURL
                      : "https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
                  }
                  alt="profile photo"
                  height="100%"
                />
              </div>
            </div>
            <div style={{ marginLeft: 10, flex: 1 }}>
              {userDetails && userDetails.firstName
                ? `${userDetails.firstName} ${userDetails.lastName}`
                : "Loading"}
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setEditMode(true)}
            >
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
            <div style={{ fontSize: 12 }}>Not Editable.</div>
          </div>
        </div>
      )}
    </div>
  );
};
