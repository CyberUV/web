
 // Initialize Firebase
 const firebaseConfig = {
  apiKey: "AIzaSyDefTZ3hQl16jIvXbIQ3AXFvkvQWlwIpqI",
  authDomain: "dream-web-61ad8.firebaseapp.com",
  projectId: "dream-web-61ad8",
  storageBucket: "dream-web-61ad8.appspot.com",
  messagingSenderId: "40035040781",
  appId: "1:40035040781:web:ab016bb5d72c612e325f44",
  measurementId: "G-76X879JLY4"
};
// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get references to DOM elements
const serverInput = document.getElementById('server-input');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passInput = document.getElementById('pass-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageContainer = document.getElementById('message-container');

// Send button click event handler
sendButton.addEventListener('click', function() {
  const serverName = serverInput.value.trim().toLowerCase();
  const email = emailInput.value;
  const pass = passInput.value;
  const name = nameInput.value.trim();

  // serverName = "joyal2";
  // email = "joyal@gmail.com";
  // pass = "0gkgjhghj" ;
  // name = "Rudraksh" ;
  
  const message = messageInput.value;

  if (serverName) {
    const serverRef = firebase.database().ref(serverName);
    serverRef.push().set({
      name: name,
      message: message,
      pass: pass,
      email: email,
    });

    // Clear input fields
    // nameInput.value = '';
    messageInput.value = '';
  }
});

// Realtime listener for server messages
serverInput.addEventListener( "change" , function() {
  let serverName = serverInput.value.trim().toLowerCase();

  // Clear message container
  messageContainer.innerHTML = '';

  if (serverName) {
    const serverRef = firebase.database().ref(serverName);
    serverRef.on('child_added', function(snapshot) {
      const message = snapshot.val();
      displayMessage(message.name, message.message);
      scrollToBottom();
    });
  }
});

// Function to escape HTML characters and preserve whitespace
function escapeHTML(unsafeText) {
  return unsafeText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Function to display messages
function displayMessage(name, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('all-message');

  // Check if the sender's name matches your name
  if (name === nameInput.value) {
    messageElement.classList.add('my-message'); // Add a custom class for your messages
  }

  // Escape the HTML and preserve whitespace
  const safeMessage = escapeHTML(message);
  
  // Preserve whitespace and tabs by using <pre> or CSS
  messageElement.innerHTML = `<strong class="meesa">${name} :</strong> <pre>${safeMessage}</pre>`;
  
  messageContainer.appendChild(messageElement);
}


function scrollToBottom() {
  messageContainer.scrollTop = messageContainer.scrollHeight;
}