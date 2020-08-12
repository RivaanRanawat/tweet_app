import React, { useState } from "react";
import { Textarea, Button, Row } from "react-materialize";
import { firebaseApp } from "../firebase";
import editPost from "../api/editPost";

export default ({ keeyId, previousContent }) => {
  console.log(keeyId);
  const [content, setContent] = useState("");
  const [editNeeded, setEditNeeded] = useState(true);

  const editAPost = () => {
    if (!content) {
      return;
    }
    if (content.length > 120) {
      return;
    }
    console.log("yes");
    const uid = firebaseApp.auth().currentUser.uid;
    console.log("ok");
    const output = editPost(keeyId, uid, content);
    console.log("noo");
    if (output === true) {
      setContent("");
      console.log("Post Edited");
      setEditNeeded(false);
    }

    if (output === false) {
      console.log("post not edited");
      setEditNeeded(true);
    }
  };

  function goBack() {
    window.history.back();
    window.location.reload();
  }

  return (
    <div>
      {editNeeded === false ? (
        goBack()
      ) : (
        <div>
          <h6 style={{ fontWeight: 500 }}>Changed Your Mind?</h6>
          <Row style={{ marginBottom: 0 }}>
            <Textarea
              value={content}
              s={12}
              className="custom-textArea"
              placeholder={previousContent}
              data-length={120}
              onChange={event => setContent(event.target.value)}
            />
          </Row>
          <div style={{ height: 0 }}>
            <Button
              small
              waves="light"
              style={{ background: "royalblue", marginTop: -60 }}
              onClick={editAPost}
            >
              EDIT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};