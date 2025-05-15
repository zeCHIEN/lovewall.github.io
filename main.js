import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyDh3yXZewxQztUwUTIzYkSSWlEE9EukLkI",
  authDomain: "lovewall-46eda.firebaseapp.com",
  projectId: "lovewall-46eda",
  storageBucket: "lovewall-46eda.firebasestorage.app",
  messagingSenderId: "529086371575",
  appId: "1:529086371575:web:02b939fc8321c06446a5f2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const confessionsRef = collection(db, "confessions");

const form = document.getElementById("confessionForm");
const input = document.getElementById("messageInput");
const container = document.getElementById("messagesContainer");

// 提交留言
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = input.value.trim();
  if (!content) return;

  await addDoc(confessionsRef, {
    content,
    timestamp: serverTimestamp()
  });
  input.value = "";
});

// 实时显示留言
onSnapshot(query(confessionsRef, orderBy("timestamp", "desc")), (snapshot) => {
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = data.content;
    container.appendChild(div);
  });
});