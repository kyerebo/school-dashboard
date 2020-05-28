import firebase from "firebase";

var config = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: "school-dashboard-bc657.firebaseapp.com",
  databaseURL: "https://school-dashboard-bc657.firebaseio.com",
  projectId: "school-dashboard-bc657",
  storageBucket: "school-dashboard-bc657.appspot.com",
  messagingSenderId: "1000952375233",
  appId: "1:1000952375233:web:ca336e73a73d8ed6057140",
};
firebase.initializeApp(config);
export default firebase;
