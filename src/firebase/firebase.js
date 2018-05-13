//importing Firebase
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDi428pHCk8xVtPM0U5oj4-zBVsWSlWd3E",
  authDomain: "lovepets-2018.firebaseapp.com",
  databaseURL: "https://lovepets-2018.firebaseio.com",
  projectId: "lovepets-2018",
  storageBucket: "lovepets-2018.appspot.com",
  messagingSenderId: "452655643148"
};
if(!firebase.apps.length){
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
  auth,
  database
};