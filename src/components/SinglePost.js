import React, { useState, useEffect } from "react";
import { Dropdown, Icon, Button, Textarea } from "react-materialize";
import { userRef } from "../firebase";
import moment from "moment";
import deletePost from "../api/deletePost";
import editPost from "../api/editPost";
import EditPost from "./EditPost";

export default ({ details, myUID }) => {
  var likectr = 0;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [edit_post, setEdit_post] = useState(false);
  const [likePressed, setLikePressed] = useState(false);
  const [likeNo, setLikeNo] = useState(likectr);

  useEffect(() => {
    const getName = () => {
      userRef.child(details.createdBy).once("value", snap => {
        setFirstName(snap.val()["firstName"]);
        setLastName(snap.val()["lastName"]);
        setImageURL(snap.val()["imageURL"]);
      });
    };
    if (details && details.createdBy) {
      getName();
    }
  }, [details]);

  const onPostDelete = (event, postKey) => {
    event.preventDefault();
    const result = deletePost(postKey);
    console.log(result);
    setEdit_post(false);
  };

  const onPostEdit = (event, postKey, uid, content) => {
    event.preventDefault();
    setEdit_post(true);
  };

  const funlikePressed = () => {
    setLikePressed(true);
    setLikeNo(likectr++);
  };

  return (
    <div classNameee="whole">
      <div className="outerBox m10">
        <div>
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
                      imageURL
                        ? imageURL
                        : "https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
                    }
                    alt="profile photo"
                    height="100%"
                  />
                </div>
              </div>
              <div style={{ marginLeft: 10, flex: 1 }}>
                <div
                  style={{
                    color: "#385898",
                    fontWeight: 600
                  }}
                >
                  {firstName} {lastName}
                </div>
                <div style={{ fontSize: 12, color: "gray" }}>
                  {moment(details.createdAt).fromNow()}
                </div>
              </div>
              {myUID === details.createdBy && (
                <div>
                  <Dropdown
                    options={{
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }}
                    trigger={
                      <Button flat node="button">
                        <Icon>more_vert</Icon>
                      </Button>
                    }
                  >
                    <a
                      href=""
                      style={{ color: "black" }}
                      onClick={event => {
                        onPostEdit(
                          event,
                          details.postKey,
                          myUID,
                          details.content
                        );
                      }}
                    >
                      Edit
                    </a>
                    <a
                      href=""
                      style={{ color: "black" }}
                      onClick={event => {
                        onPostDelete(event, details.postKey);
                      }}
                    >
                      Delete
                    </a>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            {edit_post === true ? (
              <EditPost
                keeyId={details.postKey}
                previousContent={details.content}
              />
            ) : (
              details.content
            )}
          </div>
          {likePressed === true ? (
            <div>
              <span class="material-icons" onClick={funlikePressed}>
                favorite_border
              </span>
              <span>{likeNo}</span>
            </div>
          ) : (
            <div>
              <span class="material-icons">favorite</span>
              <span>{likeNo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
