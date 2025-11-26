// ---------------------------------------------
// Firebase v8 CONFIG + INIT
// ---------------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDbf5cHMOIluUjriXxe6NhCKT329HyVNgc",
    authDomain: "chatroom-15379.firebaseapp.com",
    databaseURL: "https://chatroom-15379-default-rtdb.firebaseio.com/",
    projectId: "chatroom-15379",
    storageBucket: "chatroom-15379.firebasestorage.app",
    messagingSenderId: "1021909684994",
    appId: "1:1021909684994:web:b0ecbf19b0f3a3323a681b",
    measurementId: "G-N3R2EF2QWM"
};

// Initialize Firebase (v8 syntax)
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// ---------------------------------------------
// JOIN CHAT
// ---------------------------------------------
function enterChat() {
    let username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Enter a name!");
        return;
    }

    localStorage.setItem("chatUser", username);
    window.location.href = "chat.html";
}

// ---------------------------------------------
// SEND MESSAGE
// ---------------------------------------------
var username = localStorage.getItem("chatUser");

function sendMessage() {
    let msg = document.getElementById("messageBox").value;

    if (!msg) return;

    db.ref("messages").push({
        user: username,
        text: msg,
        time: Date.now()
    });

    document.getElementById("messageBox").value = "";
}

// ---------------------------------------------
// DISPLAY MESSAGES IN REALTIME
// ---------------------------------------------
db.ref("messages").on("child_added", function(snapshot) {
    let msg = snapshot.val();
    let box = document.getElementById("messages");

    let div = document.createElement("div");
    div.className = "message";

    div.innerHTML = `
        <strong>${msg.user}</strong>: ${msg.text}
    `;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
});
