import * as firebase from 'firebase'
require('@firebase/firestore')

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZkAG-RH9h9n2U-tF-CW4pKxaELfHYOVw",
    authDomain: "bedtime-stories-1a994.firebaseapp.com",
    databaseURL: "https://bedtime-stories-1a994.firebaseio.com",
    projectId: "bedtime-stories-1a994",
    storageBucket: "bedtime-stories-1a994.appspot.com",
    messagingSenderId: "237084127963",
    appId: "1:237084127963:web:077748e63d4120d68712fe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();