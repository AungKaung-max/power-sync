import { getUserInfo } from '@/backend/autoLogin';
import { getSession } from '@/backend/getSession';
import { useUserStore } from '@/stores/user.store';
import { convertCSTtoMMT } from '@/utils/convert';
import { GetAuthCode } from '@/utils/nativeAPIs';
import { motion } from 'framer-motion';
import { MapPin, User, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Session {
    id: string;
    totalCost: number;
    duration: number;
    hubName: string;
    power: number;
    status: 'Active' | 'Completed';
    date?: string;
}

function getAuthCodeAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
        GetAuthCode(
            (code: string) => resolve(code),
            (err: any) => reject(err)
        );
    });
}

const Home = () => {
    const [history, setHistory] = useState<Session[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true); // new state
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setUsers, users } = useUserStore();

    

    useEffect(() => {
        
        (async () => {
            
            // Load user info
            if (!users?.length) {
                setLoading(true);
                try {
                    const authCode = await getAuthCodeAsync();
                    const userInfo = await getUserInfo({ authCode });
                    setUsers(userInfo);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }

            // Fetch history
            setHistoryLoading(true);
            try {
                const data = await getSession({
                    appId: users[0]?.registerId
                });

                const mapped: Session[] = (data.result || []).map((item: any, i: number) => ({
                    id: item.id || `session-${i}`,
                    totalCost: item.totalCost,
                    duration: item.duration,
                    hubName: item.hubName,
                    power: item.power,
                    status: item.status as 'Active' | 'Completed',
                    date: item.date ? convertCSTtoMMT(item.date) : ''
                }));

                // Sort by date descending and take last 3 items
                const sorted = mapped.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                setHistory(sorted.slice(0, 3));
            } catch (err) {
                console.error(err);
            } finally {
                setHistoryLoading(false);
            }
        })();
    }, [users, setUsers]);

    return (
        <div className="p-5 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-text-muted text-[11px] font-bold uppercase tracking-widest">Good Morning</p>
                    {loading ? (
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mt-1" />
                    ) : (
                        <h1 className="text-lg font-bold text-text-main">{users[0]?.fullName}</h1>
                    )}
                </div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100"
                >
                    <User className="text-primary" size={20} />
                </motion.div>
            </div>

            {/* Services */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm px-1">Services</h3>
                <div className="grid grid-cols-1 gap-4">
                    <button
                        onClick={() => navigate('/hubs')}
                        className="glass-card p-4 rounded-[2rem] flex flex-col items-center gap-3 transition-all active:scale-95"
                    >
                        <div className="w-11 h-11 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <MapPin className="text-primary" size={22} />
                        </div>
                        <span className="font-bold text-xs">Find Hub</span>
                    </button>
                </div>
            </div>

            {/* Activity - last 3 items */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="font-bold text-sm">Activity</h3>
                    <button className="text-primary text-[11px] font-bold" onClick={() => navigate("/history")}>View All</button>
                </div>

                {historyLoading ? (
                    // Skeleton placeholder
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-card p-4 rounded-[2rem] flex items-center gap-4 min-h-[100px] max-h-[100px] animate-pulse">
                                <div className="w-10 h-10 bg-gray-300 rounded-2xl" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                                <div className="w-16 h-4 bg-gray-300 rounded" />
                            </div>
                        ))}
                    </div>
                ) : (
                    history.length > 0 ? (
                        history.map(session => (
                            <div
                                key={session.id}
                                className="glass-card p-4 rounded-[2rem] flex items-center gap-4 min-h-[100px] max-h-[100px]"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <Zap className="text-primary" size={20} />
                                </div>

                                <div className="flex-1">
                                    <p className="font-bold text-sm">{session.hubName}</p>
                                    <p className="text-text-muted text-[10px] font-medium">
                                        {session.date} • {session.duration} min
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <p className="font-bold text-base text-primary">{session.totalCost} Ks</p>
                                    <span
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${session.status.toLowerCase() === 'completed'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {session.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-text-muted text-[11px] font-bold uppercase tracking-widest">
                            No session history available.
                        </p>
                    )
                )}
            </div>
        </div>
    );
};
export default Home;