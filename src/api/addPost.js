import { postRef } from "../firebase";

export default (uid, content) => {
  try {
    postRef.push({
      createdBy: uid,
      content,
      createdAt: new Date().toLocaleString()
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
