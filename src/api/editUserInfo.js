import { userRef } from "../firebase";

export default ({ uid, firstName, lastName, imageURL, email, bio }) => {
  userRef.child(uid).set({
    email,
    firstName,
    lastName,
    bio,
    imageURL: imageURL ? imageURL : ""
  });
};
