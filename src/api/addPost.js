import { postRef } from "../firebase";

export default (uid, content, likes) => {
  try {
    postRef.push({
      createdBy: uid,
      content,
      createdAt: new Date().toLocaleString(),
      likes: []
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
