import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigate("/"); // redirect to home
    }, 1000); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
}

export default SplashScreen;