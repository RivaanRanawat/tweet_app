import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBVHH7C0jS-vbe24P6bitraYuYDdjDWuEk",
  authDomain: "twitter-clone-f0966.firebaseapp.com",
  databaseURL: "https://twitter-clone-f0966.firebaseio.com",
  projectId: "twitter-clone-f0966",
  storageBucket: "twitter-clone-f0966.appspot.com",
  messagingSenderId: "50486756217",
  appId: "1:50486756217:web:246f3920d4ee376d41e5a8"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const userRef = firebaseApp.database().ref("users");
export const postRef = firebaseApp.database().ref("posts");
export const storageRef = firebaseApp.storage();
