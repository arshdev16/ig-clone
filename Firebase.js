import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARGpmclT0rs4Mq6Ot1PP_mNafMM2GqIzw",
  authDomain: "ig-clone-2244b.firebaseapp.com",
  projectId: "ig-clone-2244b",
  storageBucket: "ig-clone-2244b.appspot.com",
  messagingSenderId: "819468713511",
  appId: "1:819468713511:web:523412607f432f8b055802",
  measurementId: "G-KX5Q009VTE",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const ArrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const ArrayRemove = firebase.firestore.FieldValue.arrayRemove;


