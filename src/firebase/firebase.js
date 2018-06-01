import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD874pHH8FqTt5mV1LUtWi-fi1M885bolQ",
    authDomain: "critikal-f3736.firebaseapp.com",
    databaseURL: "https://critikal-f3736.firebaseio.com",
    projectId: "critikal-f3736",
    storageBucket: "critikal-f3736.appspot.com",
    messagingSenderId: "76803647543"
  };
  firebase.initializeApp(config);

  export const database = firebase.database().ref('/articleData');
  export const storage = firebase.storage().ref();


