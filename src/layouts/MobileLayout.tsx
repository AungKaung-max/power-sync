import { AnimatePresence, motion } from 'framer-motion';
import { HistoryIcon, Home, Info, SettingsIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

type PageWrapperProps = {
    children: ReactNode;
};



function PageWrapper({ children }: PageWrapperProps) {
    const location = useLocation();
    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="min-h-full"
        >
            {children}
        </motion.div>
    );
}


function MobileLayout() {

    const routes = [
        { id: 1, label: "Home", path: "/", icon: <Home size={20} /> },
        { id: 2, label: "About", path: "/about", icon: <Info size={20} /> },
        { id: 3, label: "History", path: "/history", icon: <HistoryIcon size={20} /> },
        { id: 4, label: "Settings", path: "/settings", icon: <SettingsIcon /> }
    ]

    return (
        <>

            <div className='mobile-container flex flex-col shadow-2xl'>
                <main className="flex-1 overflow-y-auto hide-scrollbar pb-20">
                    <AnimatePresence mode='wait'>
                        <PageWrapper>
                            <Outlet />
                        </PageWrapper>
                    </AnimatePresence>

                </main>
                <nav className="nav-blur px-2 py-2 flex justify-between items-center border-t border-slate-100 z-40 fixed bottom-0 left-0 right-0">
                    {routes.map((route) => (
                        <NavLink
                            key={route.id}
                            to={route.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center text-[11px] font-bold uppercase tracking-wider gap-1.5 px-4 py-2 rounded-2xl ${isActive ? "opacity-100 bg-primary/10 text-primary" : "opacity-60 text-slate-400"
                                }`
                            }
                        >
                            {route.icon}
                            {route.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

        </>
    )
}

export default MobileLayout