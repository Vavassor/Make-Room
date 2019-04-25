import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBIpFhToEbjol8tqfmw4EWZ7U30jg4MY4o",
  authDomain: "make-room-project.firebaseapp.com",
  databaseURL: "https://make-room-project.firebaseio.com",
  projectId: "make-room-project",
  storageBucket: "make-room-project.appspot.com",
  messagingSenderId: "955706425317"
};

firebase.initializeApp(config);

const database = firebase.database();


export {
  database,
};