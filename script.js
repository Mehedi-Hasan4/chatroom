
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDbf5cHMOIluUjriXxe6NhCKT329HyVNgc",
    authDomain: "chatroom-15379.firebaseapp.com",
    projectId: "chatroom-15379",
    storageBucket: "chatroom-15379.firebasestorage.app",
    messagingSenderId: "1021909684994",
    appId: "1:1021909684994:web:b0ecbf19b0f3a3323a681b",
    measurementId: "G-N3R2EF2QWM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// Initialize Firebase (v8 syntax)
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// -----------------------------
// Chat Join Function
// -----------------------------
function enterChat() {
    let username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Enter a name!");
        return;
    }

    localStorage.setItem("chatUser", username);
    window.location.href = "chat.html";
}

function sendMessage() {
  let msg = document.getElementById("messageBox").value;
  if (!msg) return;
  db.ref("messages").push({
    user: username,
    text: msg
  });
  document.getElementById("messageBox").value = "";
}

db.ref("messages").on("child_added", function(snapshot) {
  let msg = snapshot.val();
  let box = document.getElementById("messages");
  let div = document.createElement("div");
  div.className = "message";
  div.textContent = msg.user + ": " + msg.text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
});
