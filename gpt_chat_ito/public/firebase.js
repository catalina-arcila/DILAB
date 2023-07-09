 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDM9rnH4jvqyr1dDlPP1SuRuAvLPGmwz34",
   authDomain: "mipip-86452.firebaseapp.com",
   projectId: "mipip-86452",
   storageBucket: "mipip-86452.appspot.com",
   messagingSenderId: "775676261197",
   appId: "1:775676261197:web:99e4a36217df84768abd04"
 };

 // Initialize Firebase
 export const app = initializeApp(firebaseConfig);

 export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));