import { saveSession } from '@/backend/saveSession';
import { UpdateSession } from '@/backend/updateSession';
import { useHubStore } from '@/stores/hub.store';
import { useUserStore } from '@/stores/user.store';
import { StartPay, type IStartPay } from '@/utils/nativeAPIs';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, Zap } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
    const navigate = useNavigate();
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { hub } = useHubStore();
    const { users } = useUserStore();

    const [duration, setDuration] = useState(30);
    const pricePerHour = hub?.price || 0;
    const totalAmount = (duration / 60) * pricePerHour;

    const handlePayment = async () => {
        setIsLoading(true); // Show loading
        try {
            const result = await saveSession({
                duration: duration,
                appId: users[0]?.registerId,
                locationId: hub?.id || ""
            });

            if (result) {
                const { orderinfo, prepay_id, sign, signType } = result.rawRequest;
                const payload: IStartPay = {
                    prepayId: prepay_id,
                    orderInfo: orderinfo,
                    sign: sign,
                    signType: signType,
                    useMiniResultFlag: true,
                };

                StartPay(payload, () => {
                    (async () => {
                        try {
                            console.log("SaveSession success");
                            await UpdateSession({
                                sessionId: result.sessionId
                            });
                            setShowPaymentSuccess(true);
                            await new Promise((resolve) => setTimeout(resolve, 2000));
                            setShowPaymentSuccess(false);
                            navigate(`/charging`);
                        } catch (error) {
                            console.error("Error during payment update:", error);
                            navigate("/");
                        }
                    })();
                });
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.resMsg || "Something went wrong");
            console.log("error", error.message);
        } finally {
            setIsLoading(false); // Hide loading
        }
    };

    return (
        <>
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
                        <h1 className="text-xl font-bold font-display">Review Payment</h1>
                        <p className="text-text-muted text-sm">Hub: {hub?.name}</p>
                    </div>

                    <div className="space-y-3 bg-white/50 p-4 rounded-3xl border border-white/40">
                        <p className="text-sm font-bold">Select Duration:</p>
                        <div className="flex gap-3">
                            {[30, 60, 120].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setDuration(time)}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all ${duration === time ? 'bg-primary text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    {time} mins
                                </button>
                            ))}
                        </div>


                        <div className="mt-4">
                            <p className="text-sm font-bold">Total Amount:</p>
                            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl mt-2">
                                <span className="text-lg font-bold text-primary-dark">{totalAmount} Ks</span>
                                <span className="text-xs text-text-muted">(Price per hour: {pricePerHour} Ks)</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-4 rounded-3xl">
                            <p className="text-text-muted text-[9px] uppercase font-bold tracking-widest mb-1">Max Output</p>
                            <p className="text-base font-bold text-primary-dark">{hub?.power}W</p>
                        </div>
                        <div className="glass-card p-4 rounded-3xl">
                            <p className="text-text-muted text-[9px] uppercase font-bold tracking-widest mb-1">Price</p>
                            <p className="text-base font-bold text-primary-dark">{hub?.price}Ks/hr</p>
                        </div>
                    </div>



                    <div className="pt-2">
                        <button
                            onClick={handlePayment}
                            className={`btn-primary w-full flex items-center justify-center gap-2 text-sm py-2 px-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={16} /> Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={16} /> Pay
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showPaymentSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-text-main/40 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white p-10 rounded-[3rem] shadow-2xl text-center space-y-6 max-w-xs w-full"
                        >
                            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 size={56} className="text-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold font-display">Success!</h2>
                                <p className="text-text-muted text-sm">Payment processed successfully!</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ReviewPage;