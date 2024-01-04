import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCxsuJmuLAzTjYIdg6urkIKwBS2RaWIZM",
  authDomain: "nestquest2023.firebaseapp.com",
  projectId: "nestquest2023",
  storageBucket: "nestquest2023.appspot.com",
  messagingSenderId: "975318123627",
  appId: "1:975318123627:web:b674bae40250e25db61d2e",
  measurementId: "G-4MZVDMB3FZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage();