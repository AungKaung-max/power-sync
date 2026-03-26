import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import QrScanner from 'qr-scanner'
import { useEffect, useRef, useState } from 'react'
import { toast } from "react-hot-toast"
import { useNavigate, useParams } from 'react-router-dom'

const ScanQr = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const [loading, setLoading] = useState(false) // show loading only after scan

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    const scanner = new QrScanner(
      video,
      (result) => {
        const scannedId = result.data.replace("POWERHUB:", "");
        console.log("Scanned ID:", scannedId);

        scanner.stop(); // stop scanning on any scan
        setLoading(true); // show loading before navigation

        if (scannedId === id) {
          toast.success("QR verified successfully ✅");
          setTimeout(() => {
            // navigate(`/charging/${id}`); 
            navigate("/review"); 
          }, 800);
        } else {
          toast.error("Invalid QR ❌");
          setLoading(false); // hide loading
          // restart scanner after short delay
          setTimeout(() => {
            scanner.start();
          }, 1500);
        }
      },
      {
        preferredCamera: 'environment',
        highlightScanRegion: false
      }
    );

    scanner.start();
    scannerRef.current = scanner;

    return () => {
      scanner.stop();
    }
  }, [id, navigate])

  return (
    <div className="h-screen flex flex-col bg-text-main text-white p-5">

      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-xl">
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-lg font-bold">Scan QR</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">

        <div className="relative w-56 h-56 overflow-hidden rounded-[2rem]">

          {/* VIDEO */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* UI overlay */}
          <div className="absolute inset-0 border-2 border-primary/20 rounded-[2rem]" />
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />

          {/* Scan animation */}
          {!loading && (
            <motion.div
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute left-4 right-4 h-0.5 bg-primary z-10"
            />
          )}

          {/* Loading overlay after scan */}
          {loading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
              <div className="loader border-t-4 border-b-4 border-white w-10 h-10 rounded-full animate-spin"></div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ScanQr