import { useEffect, useState } from "react";
// import { messaging } from "../lib/firebaseClient.js";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { toast, ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const [isPacketModalOpen, setIsPacketModalOpen] = useState(false);
  const [currentPacket, setCurrentPacket] = useState(null);
  useEffect(() => {
    const registerServiceWorker = async () => {
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

    const getTokenAndListen = async () => {
      try {
        const firebase = await import("firebase/app");
        const { getMessaging, getToken, onMessage } = await import(
          "firebase/messaging"
        );

        const firebaseConfig = {
          apiKey: "AIzaSyD9YqOre1htkEk6G9XJs7RI0-RJCRN6J-Q",
          authDomain: "ooform.firebaseapp.com",
          projectId: "ooform",
          storageBucket: "ooform.appspot.com",
          messagingSenderId: "320367468504",
          appId: "1:320367468504:web:6f58ac294c4d5d860b1cad",
          measurementId: "G-XE3CJC4L8P",
        };

        const app = firebase.initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        const token = await getToken(messaging, {
          vapidKey:
            "BOe8482TJaA7qIgRdh8xEGMIsaKyhd3P6it4AbTaXweG6jYeI1Qp-Ex1G9CGiPGtItEqc4y0wKampPJ69Jt441U",
        });

        console.log("FCM token:", token);

        onMessage(messaging, (payload) => {
          console.log("Received FCM message:", payload);

          if (payload.data && payload.data.type === "NEW_PACKET") {
            setCurrentPacket(payload.data.packet);
            setIsPacketModalOpen(true);
          } else {
            toast.info(payload.notification.title);
          }
        });

        return token;
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    getTokenAndListen();
    registerServiceWorker();
  }, []);

  const handleClose = () => {
    setIsPacketModalOpen(false);
    setCurrentPacket(null);
  };

  const handleAccept = () => {
    // TODO: Handle accepting the packet
    setIsPacketModalOpen(false);
    setCurrentPacket(null);
    toast.success("Packet accepted!");
  };

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
      {currentPacket && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                color: "#000",
              }}
            >
              <h2>New Packet</h2>
              <button onClick={handleClose}>X</button>
            </div>
            <p style={{ color: "#000", marginBottom: "20px" }}>
              You have a new packet to accept!
            </p>
            <button
              style={{
                padding: "7px 12px",
                background: "green",
                outline: 0,
                border: 0,
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
