import { postRef } from "../firebase";

export default (uid, content, likes, commments) => {
  try {
    postRef.push({
      createdBy: uid,
      content,
      createdAt: new Date().toLocaleString(),
      likes: [],
      comments: []
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
