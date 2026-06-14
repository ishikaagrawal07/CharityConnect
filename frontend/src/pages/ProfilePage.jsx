import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [wallet, setWallet] = useState({ balance: 0, total_donated: 0 });
    const [user, setUser] = useState({ email: 'Eco Explorer', name: 'Eco Explorer' });
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('Monochrome');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch User Profile
                const userRes = await apiClient.get('/auth/me');
                if (userRes.data) {
                    const email = userRes.data.email;
                    const name = userRes.data.name || email.split('@')[0];
                    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
                    setUser({ email, name: displayName });
                }

                // Fetch Wallet Data
                const walletRes = await apiClient.get('/wallet/me');
                setWallet(walletRes.data);
            } catch (error) {
                console.error("Failed to load profile data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    if (loading) {
        return <div className="p-lg flex justify-center items-center h-full"><span className="material-symbols-outlined animate-spin text-4xl text-primary">eco</span></div>;
    }

    // Gamification Math (Syncs with World Page)
    const currentXP = wallet.total_donated * 10;
    const treesPlanted = Math.floor(wallet.total_donated / 100);
    const co2Offset = ((treesPlanted * 21) / 1000).toFixed(2); // Tons

    // Tiers
    let tierName = "Tier I Seedling";
    let nextTierXP = 5000;
    let currentTierXP = 0;
    
    if (currentXP >= 15000) {
        tierName = "Tier III Guardian";
        nextTierXP = 50000;
        currentTierXP = 15000;
    } else if (currentXP >= 5000) {
        tierName = "Tier II Steward";
        nextTierXP = 15000;
        currentTierXP = 5000;
    }

    const tierProgress = ((currentXP - currentTierXP) / (nextTierXP - currentTierXP)) * 100;
    const nextTreesNeeded = Math.ceil(((nextTierXP - currentXP) / 10) / 100);

    return (
        <div className="p-md lg:p-xl max-w-container-max mx-auto min-h-screen bg-mesh-gradient w-full">
            {/* Profile Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg pt-md">
                <div className="flex items-center gap-md">
                    <div className="relative">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_gr_h8oEFJQNt46nZGd9QxDrDjXzlkqndOGz5JfMSmmwfy-ZjT0maSwWg09uvEwOxqBucwVUNUcXjw1iMl5ULFNY1nj2kcZatvavLmO-pEsVCaJVTtASudi5VhJDeQPk-ufzn4QaIhNh97kOeP6ZRJpaXdRyzEjYZDGxknMeWVhURgtGyMrbsQzxkV_6eLbeUqhdAO9R_UBSFSGq8mRTlZX_7WF5b0u1hvHQXmMjdKwD8PZzEXZiVwDNnsC7Y2l6_Bmvxmyw0G3I" 
                            alt="Profile" 
                            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover card-shadow" 
                        />
                        <div className="absolute -bottom-2 -right-2 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>eco</span>
                            {tierName.split(' ')[0]} {tierName.split(' ')[1]}
                        </div>
                    </div>
                    <div>
                        <h1 className="font-display-lg text-display-lg text-primary mb-1">{user.name}</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">{tierName} • Active Streaks</p>
                    </div>
                </div>
                <button className="bg-surface border border-outline-variant px-6 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all shadow-sm">
                    Edit Profile
                </button>
            </header>

            {/* Personal Impact Stats Grid */}
            <section className="mb-xl">
                <h2 className="font-headline-md text-headline-md text-primary mb-md">Personal Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    {/* Trees Planted */}
                    <div className="bg-surface p-md rounded-3xl card-shadow flex items-center gap-md transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary" style={{ fontSize: '32px' }}>park</span>
                        </div>
                        <div>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Trees Planted</p>
                            <p className="font-display-lg text-headline-lg text-primary">{treesPlanted}</p>
                        </div>
                    </div>
                    
                    {/* CO2 Offset */}
                    <div className="bg-surface p-md rounded-3xl card-shadow flex items-center gap-md transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>cloud_done</span>
                        </div>
                        <div>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">CO2 Offset</p>
                            <p className="font-display-lg text-headline-lg text-primary">{co2Offset}<span className="text-lg ml-1">tons</span></p>
                        </div>
                    </div>
                    
                    {/* Active Projects */}
                    <div className="bg-surface p-md rounded-3xl card-shadow flex items-center gap-md transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary" style={{ fontSize: '32px' }}>water_drop</span>
                        </div>
                        <div>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Clean Water</p>
                            <p className="font-display-lg text-headline-lg text-primary">{(wallet.total_donated * 2).toLocaleString()}<span className="text-lg ml-1">L</span></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fun Progress Element */}
            <section className="mb-xl p-md bg-secondary-container bg-opacity-30 rounded-3xl border border-secondary border-opacity-10 card-shadow">
                <div className="flex justify-between items-center mb-sm">
                    <span className="font-label-md text-label-md text-primary">Next Milestone: Advancing Tier</span>
                    <span className="text-xs font-bold text-secondary">{Math.min(100, Math.floor(tierProgress))}% Complete</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-1000 ease-out shadow-inner" style={{ width: `${Math.max(2, Math.min(100, tierProgress))}%` }}></div>
                </div>
                <p className="mt-sm text-xs text-on-secondary-container">Plant {nextTreesNeeded} more trees to reach the next tier and unlock the "Oak Sanctuary" cause.</p>
            </section>

            {/* Settings List Layout */}
            <section className="max-w-3xl pb-24">
                <h2 className="font-headline-md text-headline-md text-primary mb-md">Preferences</h2>
                <div className="bg-surface rounded-3xl card-shadow overflow-hidden">
                    {/* Notifications */}
                    <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-low transition-all group border-b border-surface-container active:bg-surface-container-high">
                        <div className="flex items-center gap-md">
                            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant">
                                <span className="material-symbols-outlined">notifications</span>
                            </div>
                            <div className="text-left">
                                <p className="font-label-md text-label-md text-on-surface">Notifications</p>
                                <p className="text-xs text-on-surface-variant">Manage transaction alerts and goal updates</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                    
                    {/* Privacy */}
                    <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-low transition-all group border-b border-surface-container active:bg-surface-container-high">
                        <div className="flex items-center gap-md">
                            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant">
                                <span className="material-symbols-outlined">lock</span>
                            </div>
                            <div className="text-left">
                                <p className="font-label-md text-label-md text-on-surface">Privacy</p>
                                <p className="text-xs text-on-surface-variant">Control visibility of your environmental impact</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                    
                    {/* Security */}
                    <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-low transition-all group border-b border-surface-container active:bg-surface-container-high">
                        <div className="flex items-center gap-md">
                            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant">
                                <span className="material-symbols-outlined">security</span>
                            </div>
                            <div className="text-left">
                                <p className="font-label-md text-label-md text-on-surface">Security</p>
                                <p className="text-xs text-on-surface-variant">2FA, biometrics, and session management</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                    
                    {/* Theme Toggle */}
                    <div className="w-full flex items-center justify-between p-md border-b border-surface-container">
                        <div className="flex items-center gap-md">
                            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant">
                                <span className="material-symbols-outlined">palette</span>
                            </div>
                            <div className="text-left">
                                <p className="font-label-md text-label-md text-on-surface">Visual Style</p>
                                <p className="text-xs text-on-surface-variant">Switch between Monochrome and Vibrant</p>
                            </div>
                        </div>
                        <div className="flex p-1 bg-surface-container-high rounded-xl">
                            <button 
                                onClick={() => setTheme('Monochrome')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'Monochrome' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                Monochrome
                            </button>
                            <button 
                                onClick={() => setTheme('Vibrant')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'Vibrant' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                Vibrant
                            </button>
                        </div>
                    </div>
                    
                    {/* Log Out */}
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between p-md hover:bg-error-container hover:bg-opacity-20 transition-all group active:bg-error-container active:bg-opacity-30"
                    >
                        <div className="flex items-center gap-md">
                            <div className="w-10 h-10 rounded-xl bg-error-container bg-opacity-50 flex items-center justify-center text-error">
                                <span className="material-symbols-outlined">logout</span>
                            </div>
                            <div className="text-left">
                                <p className="font-label-md text-label-md text-error">Log Out</p>
                                <p className="text-xs text-on-error-container">Safely disconnect from your account</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-error opacity-40 group-hover:translate-x-1 transition-transform">logout</span>
                    </button>
                </div>
            </section>
        </div>
    );
}
