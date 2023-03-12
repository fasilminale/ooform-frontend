import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const getTokenAndListen = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BOe8482TJaA7qIgRdh8xEGMIsaKyhd3P6it4AbTaXweG6jYeI1Qp-Ex1G9CGiPGtItEqc4y0wKampPJ69Jt441U",
    });
    console.log("FCM token:", token);

    onMessage(messaging, (payload) => {
      console.log("Received FCM message:", payload);
    });

    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export const registerServiceWorker = async () => {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        {
          scope: "/",
        }
      );

      console.log("Service worker registered successfully:", registration);
      return registration;
    } catch (error) {
      console.error("Error registering service worker:", error);
    }
  } else {
    console.warn("Service worker is not supported in this browser.");
  }
};
