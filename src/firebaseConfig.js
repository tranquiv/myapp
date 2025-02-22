import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBv82bvi9IrgK76FK-ezg_ZG-6dw7pNTys",
    authDomain: "myapp-9e4a2.firebaseapp.com",
    projectId: "myapp-9e4a2",
    storageBucket: "myapp-9e4a2.firebasestorage.app",
    messagingSenderId: "409269895187",
    appId: "1:409269895187:web:7041270aecde054ef4bfe6",
    measurementId: "G-28TZFX7W3Z"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };