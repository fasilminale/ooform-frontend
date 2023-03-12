importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  // Your Firebase config object here
  apiKey: "AIzaSyD9YqOre1htkEk6G9XJs7RI0-RJCRN6J-Q",
  authDomain: "ooform.firebaseapp.com",
  projectId: "ooform",
  storageBucket: "ooform.appspot.com",
  messagingSenderId: "320367468504",
  appId: "1:320367468504:web:6f58ac294c4d5d860b1cad",
  measurementId: "G-XE3CJC4L8P",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    click_action: payload.notification.click_action,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
