import firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyCe0GKe866Qz3JGXUJhbnApny6JHn4YXFo",
    authDomain: "react-redux-firebase-ex.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-ex.firebaseio.com",
    projectId: "react-redux-firebase-ex",
    storageBucket: "react-redux-firebase-ex.appspot.com",
    messagingSenderId: "20879823493"
};

const devConfig = {
    apiKey: "AIzaSyCe0GKe866Qz3JGXUJhbnApny6JHn4YXFo",
    authDomain: "react-redux-firebase-ex.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-ex.firebaseio.com",
    projectId: "react-redux-firebase-ex",
    storageBucket: "react-redux-firebase-ex.appspot.com",
    messagingSenderId: "20879823493"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();