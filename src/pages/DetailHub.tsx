import { useHubStore } from '@/stores/hub.store';
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, QrCode, Wifi, Zap } from 'lucide-react'
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams, } from 'react-router-dom'

const DetailHub = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const hub = location.state?.hub;
    console.log("hubs", hub);
    console.log("id", id)

    const {setHub} = useHubStore();

    useEffect( ()=> {
        setHub(hub);
    },[hub])


    return (
        <div className="flex flex-col h-full bg-background">
            <div className="relative h-48 bg-primary/5 flex items-center justify-center overflow-hidden">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 p-2 bg-white rounded-xl shadow-lg z-10"
                >
                    <ArrowLeft size={14} />
                </button>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <Zap size={60} className="text-primary opacity-10" />
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-background rounded-t-[1.5rem]" />
            </div>

            <div className="px-5 space-y-5 flex-1 -mt-4 relative z-10">
                <div className="space-y-1">
                    <h1 className="text-xl font-bold font-display">{hub.name}</h1>
                    <p className="text-text-muted flex items-center gap-1.5 text-xs font-medium">
                        <MapPin size={12} className="text-primary" /> {hub.address}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-3xl">
                        <p className="text-text-muted text-[9px] uppercase font-bold tracking-widest mb-1">Max Output</p>
                        <p className="text-base font-bold text-primary-dark">{hub.power}W</p>
                    </div>
                    <div className="glass-card p-4 rounded-3xl">
                        <p className="text-text-muted text-[9px] uppercase font-bold tracking-widest mb-1">Price</p>
                        <p className="text-base font-bold text-primary-dark">{hub.price}Ks/hr</p>
                    </div>
                </div>

                <div className="space-y-3 bg-white/50 p-4 rounded-3xl border border-white/40">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Wifi size={16} className="text-primary" />
                        </div>
                        <span className="text-xs font-bold">{hub.wifi ? 'High-Speed WiFi' : 'No WiFi'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Zap size={16} className="text-primary" />
                        </div>
                        <span className="text-xs font-bold">
                            {hub.available_slots} / {hub.total_slots} slots available
                        </span>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        onClick={() => navigate(`/scan-qr/${hub.id}`)}
                        className={`btn-primary w-full flex items-center justify-center gap-2 text-sm py-2 px-4 ${hub.available_slots === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={hub.available_slots === 0}
                    >
                        <QrCode size={16} />
                        Scan to Start
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailHub