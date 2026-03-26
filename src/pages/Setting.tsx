import { useUserStore } from '@/stores/user.store';
import { Bell, ChevronRight, CreditCard, ShieldCheck, User } from 'lucide-react';
import { useEffect, useState } from 'react';

function formatBirthday(birthday?: string) {
    if (!birthday || birthday.length !== 8) return 'N/A';

    const year = birthday.slice(0, 4);
    const month = parseInt(birthday.slice(4, 6), 10) - 1;
    const day = parseInt(birthday.slice(6, 8), 10);

    const date = new Date(Number(year), month, day);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const displayGender = (gender?: string) => {
    if (!gender) return 'N/A';
    return gender === '1' ? 'Male' : 'Female';
};

const Settings = () => {
    const { users } = useUserStore();
    const [loading, setLoading] = useState(true);

    const user = users[0];

    useEffect(() => {
        if (user) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user]);

    return (
        <div className="p-6 space-y-10">
            <h1 className="text-2xl font-bold font-display">Settings</h1>

            {/* User Profile Card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-md">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <User size={36} className="text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                    {loading ? (
                        <>
                            <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        </>
                    ) : (
                        <>
                            <h3 className="font-bold text-lg">{user?.fullName || 'Alex Johnson'}</h3>
                            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">Premium Member</p>
                            <p className="text-sm text-text-muted">Birthday: {formatBirthday(user?.userInfo.birthday)}</p>
                            <p className="text-sm text-text-muted">Gender: {displayGender(user?.userInfo.gender)}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Settings Options */}
            <div className="space-y-3">
                {[
                    { icon: <User size={20} />, label: 'Personal Details' },
                    { icon: <ShieldCheck size={20} />, label: 'Security & PIN' },
                    { icon: <Bell size={20} />, label: 'Notification Preferences' },
                    { icon: <CreditCard size={20} />, label: 'Billing & Wallet' }
                ].map((item, i) => (
                    <button
                        key={i}
                        className="w-full flex items-center justify-between p-5 hover:bg-white rounded-3xl transition-all active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-5">
                            <div className="text-primary">{item.icon}</div>
                            <span className="font-bold text-sm">{item.label}</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-300" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Settings;