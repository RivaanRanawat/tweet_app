import React, { useState } from "react";
import { Textarea, Button, Row, Icon } from "react-materialize";
import { firebaseApp } from "../firebase";
import addPost from "../api/addPost";
export default () => {
  const uid = firebaseApp.auth().currentUser.uid;
  const [content, setContent] = useState("");
  var likes = [];
  var comments = [];

  const addAPost = () => {
    if (!content) {
      return;
    }
    if (content.length > 120) {
      return;
    }

    const output = addPost(uid, content, likes, comments);
    if (output === true) {
      setContent("");
      console.log("Post added");
    }

    if (output === false) {
      console.log("post not added");
    }
  };

  return (
    <div>
      <div className="outerBox m10">
        <h6 style={{ fontWeight: 500 }}>What's in your mind?</h6>
        <Row style={{ marginBottom: 0 }}>
          <Textarea
            value={content}
            s={12}
            className="custom-textArea"
            placeholder="Please write here..."
            data-length={120}
            onChange={event => setContent(event.target.value)}
          />
        </Row>
        <div
          style={{
            height: 0,
            display: "flex",
            alignItems: "center"
          }}
        >
          <Button
            small
            waves="light"
            style={{ background: "royalblue", marginTop: -60 }}
            onClick={addAPost}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};
