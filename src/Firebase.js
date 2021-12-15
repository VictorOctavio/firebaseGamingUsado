import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyDUjWgIOMdV_9t83CTSpaOhog_kAaQmDN8",
    authDomain: "saleusedhardware.firebaseapp.com",
    projectId: "saleusedhardware",
    storageBucket: "saleusedhardware.appspot.com",
    messagingSenderId: "318056090278",
    appId: "1:318056090278:web:4dd4414ee7240a56bd0267"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();

  export {firebase, auth, db}