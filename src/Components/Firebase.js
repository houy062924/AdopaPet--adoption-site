import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAsNP69Z8MRaqdsITt0Su2M797LwdbIsYE",
  authDomain: "adoption-platform.firebaseapp.com",
  databaseURL: "https://adoption-platform.firebaseio.com",
  projectId: "adoption-platform",
  storageBucket: "adoption-platform.appspot.com",
  messagingSenderId: "526590461170",
  appId: "1:526590461170:web:896b40db355036c97dfc6b",
  measurementId: "G-QPSZRPGJLE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;