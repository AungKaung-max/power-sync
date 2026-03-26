import { useEffect } from "react";

export const usePreventZoom = () => {
  useEffect(() => {
    // Check if the platform is iOS
   
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    const handleTouchStart = (e: TouchEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      ) {
        e.target.style.fontSize = "16px";
      }
    };

    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.head.removeChild(meta);
    };
  }, []);
};

