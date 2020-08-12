import { postRef } from "../firebase";

export default (postKey, uid, content) => {
  try {
    console.log(postKey);
    postRef.child(postKey).set({
      createdBy: uid,
      content: content,
      createdAt: new Date().toLocaleString()
    });
    console.log("Success");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
