import { useHubStore } from '@/stores/hub.store';
import { motion } from 'framer-motion'
import { Pause, Play, Square, Zap } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const Charging = () => {
    const { hub } = useHubStore();
    console.log("hubs", hub);
    const [chargingStats, setChargingStats] = useState({ time: 0, kwh: 0, cost: 0 });
    const [isPaused, setIsPaused] = useState(false);
    const [isCharging, setIsCharging] = useState(true); // start charging automatically
    const navigate = useNavigate()

    useEffect(() => {
        if (!hub) return; // wait for hub info
        let interval: number | undefined;

        if (isCharging && !isPaused) {
            interval = window.setInterval(() => {
                setChargingStats(prev => {
                    const kwhPerSec = hub.power / 3600; // power in kW -> kWh/sec
                    const newKwh = Number((prev.kwh + kwhPerSec).toFixed(2));
                    const pricePerSec = hub.price / 3600; // price per hour -> per second
                    const newCost = Number((prev.cost + pricePerSec).toFixed(2));
                    return {
                        time: prev.time + 1,
                        kwh: newKwh,
                        cost: newCost
                    };
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isCharging, isPaused, hub]);

    const handlePauseResume = () => {
        setIsPaused(prev => !prev);
    }

    const handleEndSession = () => {
        setIsCharging(false);
        console.log("Charging session ended", chargingStats);
        navigate("/history");
    };

    return (
        <div className="p-6 h-full flex flex-col space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-xl font-bold font-display">Live Session</h1>
                <div className="inline-flex items-center gap-2.5 bg-emerald-50 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-primary text-[11px] font-bold uppercase tracking-widest">{hub?.name || 'Power Hub'}</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-10">
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="128" cy="128" r="115"
                            className="stroke-slate-100 fill-none"
                            strokeWidth="12"
                        />
                        <motion.circle
                            cx="128" cy="128" r="115"
                            className="stroke-primary fill-none"
                            strokeWidth="12"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 722" }}
                            animate={{ strokeDasharray: `${(chargingStats.kwh % 10) * 72.2} 722` }}
                            transition={{ type: "spring", stiffness: 50 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap size={32} className="text-primary mb-2" />
                        </motion.div>
                        <span className="text-5xl font-bold font-display tracking-tighter">{chargingStats.kwh}</span>
                        <span className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">kWh</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 w-full gap-5">
                    <div className="glass-card p-5 rounded-[2.5rem] text-center">
                        <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest mb-1.5">Duration</p>
                        <p className="text-xl font-bold font-display">{formatTime(chargingStats.time)}</p>
                    </div>
                    <div className="glass-card p-5 rounded-[2.5rem] text-center border-primary/10 bg-emerald-50/20">
                        <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest mb-1.5">Current Cost</p>
                        <p className="text-xl font-bold font-display text-primary">{chargingStats.cost}MMK</p>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePauseResume}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${isPaused ? 'bg-primary text-white shadow-primary/20' : 'bg-white border border-slate-100 text-primary'}`}
                    >
                        {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleEndSession}
                        className="w-14 h-14 bg-text-main text-white rounded-2xl flex items-center justify-center shadow-lg"
                    >
                        <Square size={18} fill="currentColor" />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default Charging;