import { motion } from 'framer-motion'
import { MOCK_HISTORY, type Session } from '../dummpy/mock';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
    const [history] = useState<Session[]>(MOCK_HISTORY);
    const session = history[0];
    const navigate = useNavigate();

    if (!session) return null; // safety

    return (
        <div className="min-h-screen flex items-center justify-center p-5">

            <div className="w-full max-w-md space-y-8 text-center">

                {/* Header */}


                <h1 className="text-xl font-bold flex items-center justify-center gap-2">
                    <CheckCircle size={20} className="text-primary" />
                    Payment Successful
                </h1>

                {/* Receipt */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 text-left"
                >
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                            Name
                        </span>
                        <span className="font-bold text-sm">
                            {session.hubName}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                            Date
                        </span>
                        <span className="font-bold text-sm">
                            {session.date}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                            Amount
                        </span>
                        <span className="font-bold text-primary text-lg">
                            ${session.cost}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                            Energy
                        </span>
                        <span className="font-bold text-sm">
                            {session.kwh} kWh
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
                            Duration
                        </span>
                        <span className="font-bold text-sm">
                            {session.duration}
                        </span>
                    </div>
                </motion.div>

                {/* Button (fixed) */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2 px-4"
                >
                    Back to Home
                </motion.button>

            </div>
        </div>
    )
}

export default PaymentSuccess;