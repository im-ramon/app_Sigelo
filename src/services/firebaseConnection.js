import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyA0OArJ2c_MKpnaFP72dKSGV2Tg4_YSqN8",
    authDomain: "sigelo-050521.firebaseapp.com",
    projectId: "sigelo-050521",
    storageBucket: "sigelo-050521.appspot.com",
    messagingSenderId: "828067272243",
    appId: "1:828067272243:web:7beb8fc1ca25e7c6e63546",
    measurementId: "G-XNB8XVXC2E"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;