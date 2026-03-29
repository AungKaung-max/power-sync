import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MobileLayout from "./layouts/MobileLayout";
import About from "./pages/About";
import History from "./pages/History";
import Home from "./pages/Home";

import toast, { Toaster } from "react-hot-toast";
import Charging from "./pages/Charging";
import Checkout from "./pages/Checkout";
import DetailHub from "./pages/DetailHub";
import Hub from "./pages/Hub";
import ReviewPage from "./pages/ReviewPage";
import ScanQR from "./pages/ScanQr";
import Settings from "./pages/Setting";
import { requestToken } from "./services/auth";
import { useAuthStore } from "./stores/auth.store";
import { usePreventZoom } from "./utils/preventZoom";

function App() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { setAccessToken } = useAuthStore();
  usePreventZoom();

  // Fallback: fetch location from IP if geolocation fails
  const fetchFallbackLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setUserLocation({ lat: data.latitude, lng: data.longitude });
      toast("Using approximate location based on IP", { id: "loc" });
    } catch (err) {
      console.error("Fallback location failed", err);
      setUserLocation(null);
    }
  };

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported. Using approximate location.", { id: "loc" });
      fetchFallbackLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Geolocation error:", error);

        if (error.code === 1) {
          // PERMISSION_DENIED
          toast.error("Location permission denied. Using approximate location.", { id: "loc" });
        } else if (error.code === 2) {
          // POSITION_UNAVAILABLE
          toast.error("Location unavailable. Using approximate location.", { id: "loc" });
        } else if (error.code === 3) {
          // TIMEOUT
          toast.error("Location request timed out. Using approximate location.", { id: "loc" });
        } else {
          toast.error("Failed to get location. Using approximate location.", { id: "loc" });
        }

        fetchFallbackLocation();
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Fetch token
  useEffect(() => {
    localStorage.removeItem("user-storage");
    const fetchToken = async () => {
      try {
        const token = await requestToken();
        setAccessToken(token);
      } catch (error) {
        console.log("Error fetching token", error);
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/scan-qr/:id" element={<ScanQR />} />
        <Route path="/charging" element={<Charging />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route element={<MobileLayout />}>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/hubs" element={<Hub userLocation={userLocation} />} />
          <Route path="/hubs/:id" element={<DetailHub />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;