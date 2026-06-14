import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export default function DashboardLayout() {
    const location = useLocation();
    const [user, setUser] = useState({ name: 'Eco Explorer', initial: 'E' });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiClient.get('/auth/me');
                if (res.data) {
                    const email = res.data.email;
                    const name = res.data.name || email.split('@')[0];
                    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
                    setUser({ name: displayName, initial: displayName.charAt(0) });
                }
            } catch (error) {
                console.error("Failed to load user", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* SideNavBar Desktop */}
            <nav className="hidden md:flex flex-col h-full py-md px-sm border-r border-outline-variant bg-surface w-64 fixed left-0 top-0 z-20 shadow-[0px_4px_20px_rgba(21,43,28,0.06)]">
                <div className="mb-lg px-md">
                    <h1 className="font-headline-md text-headline-md font-bold text-primary">Impact Wallet</h1>
                </div>
                <div className="flex flex-col gap-sm flex-1">
                    <Link to="/dashboard" className={`flex items-center gap-sm px-md py-sm font-label-md text-label-md rounded-xl transition-all ${location.pathname === '/dashboard' ? 'bg-secondary-container text-on-secondary-container scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/dashboard' ? "'FILL' 1" : "'FILL' 0" }}>home</span>
                        Home
                    </Link>
                    <Link to="/wallet" className={`flex items-center gap-sm px-md py-sm font-label-md text-label-md rounded-xl transition-all ${location.pathname === '/wallet' ? 'bg-secondary-container text-on-secondary-container scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/wallet' ? "'FILL' 1" : "'FILL' 0" }}>account_balance_wallet</span>
                        Wallet
                    </Link>
                    <Link to="/world" className={`flex items-center gap-sm px-md py-sm font-label-md text-label-md rounded-xl transition-all ${location.pathname === '/world' ? 'bg-secondary-container text-on-secondary-container scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/world' ? "'FILL' 1" : "'FILL' 0" }}>public</span>
                        World
                    </Link>
                    <Link to="/causes" className={`flex items-center gap-sm px-md py-sm font-label-md text-label-md rounded-xl transition-all ${location.pathname === '/causes' ? 'bg-secondary-container text-on-secondary-container scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/causes' ? "'FILL' 1" : "'FILL' 0" }}>volunteer_activism</span>
                        Causes
                    </Link>
                    <Link to="/profile" className={`flex items-center gap-sm px-md py-sm font-label-md text-label-md rounded-xl transition-all ${location.pathname === '/profile' ? 'bg-secondary-container text-on-secondary-container scale-95' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/profile' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
                        Profile
                    </Link>
                    <Link to="/profile" className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-high transition-colors font-label-md text-label-md rounded-xl">
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </Link>
                </div>
                
                <div className="mt-auto px-md">
                    <div className="flex items-center gap-sm mb-md p-sm bg-surface-container-low rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">{user.initial}</div>
                        <div>
                            <p className="font-label-md text-label-md text-primary">{user.name}</p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">Active 🔥</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('access_token');
                            window.location.href = '/login';
                        }}
                        className="w-full bg-outline-variant/20 text-on-surface-variant font-label-md text-label-md py-sm rounded-lg hover:bg-error-container hover:text-on-error-container transition-colors flex items-center justify-center gap-base">
                        <span className="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full md:ml-64 relative overflow-y-auto overflow-x-hidden">
                <Outlet />
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface shadow-[0px_-4px_20px_rgba(21,43,28,0.06)] z-20 flex justify-around items-center h-20 px-sm pb-safe">
                <Link to="/dashboard" className="flex flex-col items-center gap-xs text-on-secondary-container w-16">
                    <div className="bg-secondary-container rounded-full px-4 py-1 flex items-center justify-center">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    </div>
                    <span className="font-label-sm text-[10px] font-semibold">Home</span>
                </Link>
                <Link to="/wallet" className={`flex flex-col items-center gap-xs w-16 ${location.pathname === '/wallet' ? 'text-on-secondary-container' : 'text-on-surface-variant'}`}>
                    <div className={`${location.pathname === '/wallet' ? 'bg-secondary-container rounded-full' : ''} px-4 py-1 flex items-center justify-center`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/wallet' ? "'FILL' 1" : "'FILL' 0" }}>account_balance_wallet</span>
                    </div>
                    <span className="font-label-sm text-[10px] font-medium">Wallet</span>
                </Link>
                <Link to="/world" className={`flex flex-col items-center gap-xs w-16 ${location.pathname === '/world' ? 'text-on-secondary-container' : 'text-on-surface-variant'}`}>
                    <div className={`${location.pathname === '/world' ? 'bg-secondary-container rounded-full' : ''} px-4 py-1 flex items-center justify-center`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/world' ? "'FILL' 1" : "'FILL' 0" }}>public</span>
                    </div>
                    <span className="font-label-sm text-[10px] font-medium">World</span>
                </Link>
                <Link to="/causes" className={`flex flex-col items-center gap-xs w-16 ${location.pathname === '/causes' ? 'text-on-secondary-container' : 'text-on-surface-variant'}`}>
                    <div className={`${location.pathname === '/causes' ? 'bg-secondary-container rounded-full' : ''} px-4 py-1 flex items-center justify-center`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/causes' ? "'FILL' 1" : "'FILL' 0" }}>volunteer_activism</span>
                    </div>
                    <span className="font-label-sm text-[10px] font-medium">Causes</span>
                </Link>
            </nav>
        </div>
    );
}
