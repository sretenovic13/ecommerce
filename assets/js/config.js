import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5XUauhY1VzE5WdQxOLPaMMzYjMmQXds8",
  authDomain: "ecommerce-1189c.firebaseapp.com",
  projectId: "ecommerce-1189c",
  storageBucket: "ecommerce-1189c.appspot.com",
  messagingSenderId: "303126893709",
  appId: "1:303126893709:web:4e995e9fc09d3015c73ec4",
  measurementId: "G-C765V83VVP",
  databaseURL: "https://ecommerce-1189c-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

export default app;