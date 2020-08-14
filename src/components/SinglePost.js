import React, { useState, useEffect } from "react";
import { Dropdown, Icon, Button, Col, Textarea } from "react-materialize";
import { userRef, postRef } from "../firebase";
import moment from "moment";
import deletePost from "../api/deletePost";
import EditPost from "./EditPost";
import ProfilePage from "./ProfilePage";
import { firebaseApp } from "../firebase";

export default ({ details, myUID }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [edit_post, setEdit_post] = useState(false);
  const [likePressed, setLikePressed] = useState(false);
  const [profileYes, setProfileYes] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);
  const [isComment, setIsComment] = useState(false);
  const [commentsText, setcommentsText] = useState("");
  const [showComments, setShowComments] = useState([]);

  const uid = firebaseApp.auth().currentUser.uid;
  var arr = [];
  useEffect(() => {
    const getLikes = async () => {
      postRef
        .child(details.postKey)
        .child("likes")
        .once("value", snap => {
          var arr = [];
          snap.forEach(liket => {
            arr.push({
              ...liket.val()
            });
          });
          setLikeNumber(arr.length);
        });
    };

    const getComments = async () => {
      postRef
        .child(details.postKey)
        .child("comments")
        .child(details.createdBy)
        .once("value", snap => {
          setShowComments(snap.value["commentsText"]);
        });
    };
    const getName = () => {
      userRef.child(details.createdBy).once("value", snap => {
        setFirstName(snap.val()["firstName"]);
        setLastName(snap.val()["lastName"]);
        setImageURL(snap.val()["imageURL"]);
      });
    };

    if (details && details.createdBy) {
      getLikes();
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

  function funCommentPressed() {
    console.log("hi from comment");
    postRef
      .child(details.postKey)
      .once("value")
      .then(function(snapshot) {
        postRef
          .child(details.postKey)
          .child("comments")
          .child(uid)
          .set({
            commentsText,
            uid
          });
      });
    setcommentsText("");
  }

  const funlikePressed = () => {
    if (likePressed === true) {
      postRef
        .child(details.postKey)
        .once("value")
        .then(function(snapshot) {
          postRef
            .child(details.postKey)
            .child("likes")
            .child(uid)
            .remove()
            .then(function(snap) {
              console.log("Success");
            });
        });
      setLikePressed(false);
    } else {
      postRef
        .child(details.postKey)
        .once("value")
        .then(function(snapshot) {
          postRef
            .child(details.postKey)
            .child("likes")
            .child(uid)
            .push()
            .set({
              uid
            });
        });
      setLikePressed(true);
    }
  };

  function onComment() {
    setIsComment(true);
  }

  function onNameClick() {
    setProfileYes(true);
  }

  return (
    <div className="whole">
      <div className="outerBox m10">
        <div>
          <div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div>
                <div
                  style={{
                    width: 50,
                    height: 50,
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
              <div style={{ marginLeft: "10px", flex: 1 }}>
                <div
                  style={{
                    color: "#385898",
                    fontWeight: 600,
                    cursor: "default"
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
                likee={arr}
              />
            ) : (
              details.content
            )}
          </div>
          {likePressed === true ? (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Col s={4} m={4}>
                <span
                  className="material-icons"
                  onClick={funlikePressed}
                  style={{ color: "red" }}
                >
                  favorite
                </span>
              </Col>
              <Col s={4} m={4}>
                <span style={{ marginLeft: 5 }}>{likeNumber}</span>
              </Col>
              <Col s={4} m={4}>
                <Icon style={{ margin: "auto" }}>comment</Icon>
              </Col>
            </div>
          ) : (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Col s={4} m={4}>
                <span
                  className="material-icons"
                  onClick={funlikePressed}
                  style={{ color: "red" }}
                >
                  favorite_border
                </span>
              </Col>
              <Col s={4} m={4}>
                <span style={{ marginLeft: 5 }}>{likeNumber}</span>
              </Col>
              <Col s={4} m={4}>
                <div onClick={onComment}>
                  <Icon style={{ margin: "auto" }}>comment</Icon>
                </div>
              </Col>
            </div>
          )}
          {isComment === true ? (
            <div>
              <Textarea
                value={commentsText}
                s={12}
                className="custom-textArea"
                placeholder="Please write here..."
                data-length={120}
                onChange={event => setcommentsText(event.target.value)}
              />
              <Button onClick={funCommentPressed}>OK</Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
