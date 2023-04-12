import { initializeApp } from 'firebase/app';


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFdVz3LqYRp9J4x2jS4Nb7I4bHl4X1sok",
  authDomain: "tutor-app-90736.firebaseapp.com",
  projectId: "tutor-app-90736",
  storageBucket: "tutor-app-90736.appspot.com",
  messagingSenderId: "786484672757",
  appId: "1:786484672757:web:d2c053560ebe97e41badbc",
  measurementId: "G-15Y7QH2130"
};


export  default initializeApp(firebaseConfig);
