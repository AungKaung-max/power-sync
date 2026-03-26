import { motion } from 'framer-motion';
import { Play, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSession } from '@/backend/getSession';
import { useUserStore } from '@/stores/user.store';
import { convertCSTtoMMT } from '@/utils/convert';

interface Session {
    id: string;
    totalCost: number;
    duration: number;
    hubName: string;
    power: number;
    status: 'Active' | 'Completed';
    date?: string;
}

const History = () => {
    const { users } = useUserStore();
    const [history, setHistory] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true); // new loading state
    const [filter, setFilter] = useState<'all' | 'Active' | 'Completed'>('all');

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getSession({
                    appId: users[0]?.registerId || "cySO000001VFsvrBGZJA"
                });

                const mapped = (data.result || []).map((item: any, i: number) => ({
                    id: item.id || `session-${i}`,
                    totalCost: item.totalCost,
                    duration: item.duration,
                    hubName: item.hubName,
                    power: item.power,
                    status: item.status as 'Active' | 'Completed',
                    date: item.date ? convertCSTtoMMT(item.date) : ''
                }));

                setHistory(mapped);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [users]);

    // Filter history based on selected status
    const filteredHistory =
        filter === 'all'
            ? history
            : history.filter(
                session => session.status.toLowerCase() === filter.toLowerCase()
            );

    return (
        <div className="p-5 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-xl font-bold">Activity Log</h1>

                {/* Filter toggle */}
                <div className="flex gap-2">
                    {(['all', 'Active', 'Completed'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest ${filter === status
                                ? 'bg-primary text-white'
                                : 'bg-slate-100 text-text-muted'
                                }`}
                        >
                            {status.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* History cards */}
            <div className="space-y-5">
                {loading ? (
                    // Skeleton loading for 3 cards
                    [1, 2, 3].map(i => (
                        <div
                            key={i}
                            className="glass-card p-6 rounded-[2rem] space-y-4 animate-pulse min-h-[120px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-3/4 bg-gray-300 rounded" />
                                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="h-4 w-16 bg-gray-300 rounded" />
                                    <div className="h-3 w-12 bg-gray-200 rounded" />
                                </div>
                            </div>
                            <div className="flex gap-6 pt-3 border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-xl" />
                                    <div className="h-3 w-8 bg-gray-200 rounded" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-xl" />
                                    <div className="h-3 w-8 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    filteredHistory.map((session, i) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-6 rounded-[2rem] space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg">{session.hubName}</h3>
                                    <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">
                                        {session.date}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center gap-2 shrink-0"> 
                                    <span className="bg-emerald-50 text-primary font-bold px-3 py-1 rounded-xl text-base">
                                        {session.totalCost} Ks
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-xl text-xs font-bold ${session.status.toLowerCase() === 'completed'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {session.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-6 pt-3 border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                                        <Zap size={14} className="text-primary" />
                                    </div>
                                    <span className="text-xs font-bold">{session.power} kWh</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                                        <Play size={14} className="text-primary" />
                                    </div>
                                    <span className="text-xs font-bold">{session.duration} min</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;