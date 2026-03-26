import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MobileLayout from "./layouts/MobileLayout";
import About from "./pages/About";
import History from "./pages/History";
import Home from "./pages/Home";

import { Toaster } from "react-hot-toast";
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
  
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const{setAccessToken} = useAuthStore();
   usePreventZoom();
  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position",position)
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
  localStorage.removeItem("user-storage")
   const fetchToken = async() => {
    try {
      const token = await requestToken();
      setAccessToken(token)

    } catch (error) {
      console.log("Error token fetch",error)
    }
   }
   fetchToken()

  }, [])


  return (
    <>
    <Toaster position="top-center" />
      <Routes>
        {/* <Route path="/" element={<SplashScreen/>}></Route> */}
        <Route path="/scan-qr/:id" element={<ScanQR/>}></Route>
        <Route path="/charging" element={<Charging/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/review" element={<ReviewPage/>}></Route>
        <Route element={<MobileLayout />}>

          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/settings" element={<Settings/>}/> 
          <Route path="/hubs" element={<Hub userLocation={userLocation}/>}/> 
          <Route path="/hubs/:id" element={<DetailHub/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
