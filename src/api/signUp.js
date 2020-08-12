import { firebaseApp, userRef } from "../firebase";

export default ({ email, password, firstName, lastName, bio }) => {
  if (!firstName || !lastName) {
    return false;
  }

  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      userRef.child(data.user.uid).set({
        firstName,
        lastName,
        email,
        bio
      });

      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};
