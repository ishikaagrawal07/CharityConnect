import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export default function WorldPage() {
    const [wallet, setWallet] = useState({ balance: 0, total_donated: 0 });
    const [causes, setCauses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDonating, setIsDonating] = useState(false);

    const fetchWorldData = async () => {
        try {
            const [walletRes, causesRes] = await Promise.all([
                apiClient.get('/wallet/me'),
                apiClient.get('/causes/')
            ]);
            setWallet(walletRes.data);
            setCauses(causesRes.data);
        } catch (error) {
            console.error("Failed to load world data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorldData();

        // Parallax effect for the background
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            const landscape = document.querySelector('.landscape-canvas');
            if (landscape) {
                landscape.style.backgroundPosition = `${50 + x / 10}% ${50 + y / 10}%`;
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handlePlantMore = async () => {
        if (!causes.length) return;
        const mainCause = causes[0];

        const amountStr = window.prompt(`How much would you like to donate to ${mainCause.name}? (₹)`);
        if (!amountStr) return;
        
        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        if (amount > wallet.balance) {
            alert("Insufficient wallet balance. Please add money via your Wallet or Dashboard first.");
            return;
        }

        setIsDonating(true);
        try {
            await apiClient.post('/donations/donate', { cause_id: mainCause.id, amount });
            await fetchWorldData(); // Refresh data
            alert("Donation successful! Your ecosystem is growing.");
        } catch (error) {
            alert("Failed to donate: " + (error.response?.data?.detail || error.message));
        } finally {
            setIsDonating(false);
        }
    };

    if (loading) {
        return <div className="p-lg flex justify-center items-center h-full"><span className="material-symbols-outlined animate-spin text-4xl text-primary">eco</span></div>;
    }

    const mainCause = causes.length > 0 ? causes[0] : null;

    // Gamification Math
    const currentXP = wallet.total_donated * 10;
    // Tiers: Tier I (0-5000 XP), Tier II (5000-15000 XP), Tier III (15000+ XP)
    let tierName = "Tier I Seedling";
    let nextTierXP = 5000;
    let tierProgress = (currentXP / nextTierXP) * 100;

    if (currentXP >= 15000) {
        tierName = "Tier III Guardian";
        nextTierXP = 50000;
        tierProgress = ((currentXP - 15000) / (nextTierXP - 15000)) * 100;
    } else if (currentXP >= 5000) {
        tierName = "Tier II Steward";
        nextTierXP = 15000;
        tierProgress = ((currentXP - 5000) / (nextTierXP - 5000)) * 100;
    }

    const treesPlanted = Math.floor(wallet.total_donated / 100);
    const co2Offset = treesPlanted * 21;

    return (
        <div className="landscape-canvas w-full flex-1 min-h-full relative overflow-hidden flex flex-col">
            {/* Global Impact HUD (Top Overlay) */}
            <div className="absolute top-md left-md right-md flex justify-between items-start z-10 pointer-events-none">
                <div className="floating-card p-md rounded-xl shadow-[0_20px_40px_rgba(27,67,50,0.08)] pointer-events-auto flex flex-col gap-sm min-w-[320px]">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-outline font-bold">Global Impact</span>
                            <span className="font-headline-md text-headline-md text-primary">{tierName}</span>
                        </div>
                        <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>temp_preferences_eco</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-xs mt-xs">
                        <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                            <span>{currentXP.toLocaleString()} XP</span>
                            <span>{nextTierXP.toLocaleString()} XP</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-secondary to-inverse-primary rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, Math.max(0, tierProgress))}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-sm pointer-events-auto">
                    <button className="w-12 h-12 floating-card rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-surface-container-low transition-all">
                        <span className="material-symbols-outlined">explore</span>
                    </button>
                    <button className="w-12 h-12 floating-card rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-surface-container-low transition-all">
                        <span className="material-symbols-outlined">filter_vintage</span>
                    </button>
                </div>
            </div>

            {/* Central Landscape: Seedling Plot */}
            <div className="w-full h-full flex items-center justify-center relative">
                {/* Decorative Subtle Grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1b4332 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                {/* Interactive Landscape Container */}
                <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center">
                    
                    {/* Growth Rings (Background Animation) */}
                    <div className="absolute w-64 h-64 md:w-96 md:h-96 border-2 border-secondary/10 rounded-full growth-ring-animate"></div>
                    <div className="absolute w-80 h-80 md:w-[480px] md:h-[480px] border border-secondary/5 rounded-full growth-ring-animate" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Project Focus Point */}
                    <div className="relative z-20 flex flex-col items-center">
                        <div className="group relative cursor-pointer transform hover:scale-105 transition-transform duration-500">
                            {/* Growth Indicator Tooltip */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 floating-card px-4 py-2 rounded-full shadow-lg border border-primary/5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                                <span className="font-label-md text-label-md text-primary whitespace-nowrap">Growth Stage: Active Development</span>
                            </div>
                            
                            {/* The Plant Illustration */}
                            <div className="w-48 h-48 md:w-64 md:h-64 relative">
                                <img alt="Featured Project Ecosystem" className="w-full h-full drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB607QQKJeTot2gn_qvdF3WWflPFPDdcMMZBX8VY4gE_0XWzX_sdrwdsv7EOtCEGlYy47enP4nr6JiMfbNbsWPWzJk6dttFKskOc_soETKVFg9ttEJIdQ1g5Rd46E4xXRSqYJ3cTY4pcSm8nbCu2ikVUTZZIzAwGajtcy0PkIil4dKsr0AqJIDuE3U7_NVvcwUi5GQZtP8knsvnFjLzlPFV-YWE0g_NqsLLxNzSiidruXiBCY-Sfb7LlJOAwAq4KE45e8YsWlERrhs"/>
                                <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-secondary/10 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                        
                        {/* Project Labels */}
                        <div className="mt-md text-center">
                            <h2 className="font-headline-md text-headline-md text-primary">{mainCause ? mainCause.name : 'Ecosystem Project'}</h2>
                            <p className="font-body-md text-on-surface-variant max-w-xs">{mainCause ? mainCause.description : 'Contribute to grow this ecosystem.'}</p>
                        </div>
                    </div>

                    {/* Small Peripheral Seedlings */}
                    <div className="absolute top-10 right-10 md:top-20 md:right-20 opacity-60">
                        <img alt="Seedling" className="w-8 h-8 md:w-12 md:h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApy3qWW4oCEqrxSk4gfGCTS2PlQciCO32TSg_EtXeabyCwOIxR6Yfr6uj_gQCXaQhEByK1GPL4zusFg_mB92fBjjl_AdtUgcTmxVEMRUP2TD_DiH0o6ZxteH3K70yy_aI94e9FFUM34adu0VYD3Ao_w8JQjK5wm6V72hyuQq9WL-sBH8h0nAgssu3LgNfYLnWdzNomqbXUKtQg4VVxBJkNZy1M2RgTULwYHTYMk6oMguFCLO8oq4PdQIf7SoKA99DS8ZLGSP7qRWw"/>
                    </div>
                    <div className="absolute bottom-16 left-5 md:bottom-32 md:left-10 opacity-40">
                        <img alt="Fern" className="w-10 h-10 md:w-16 md:h-16" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcTk19dR_WfABxRzFkLIr43j6w7lIsrtfsly1wgYvB--hyou2e_KAGs26BkvsuTA8q26LnUiEyc_t2roq8a1SnWkq4vVNd3QV4ZgL6Zy-A8fQ5XHPER5z924uLJkI0J3pwVygg8iB0C-t5B2PMeDwbtRXAXNRduL0vAkk3QT67NtjUG_5_BqxGo-jkOfInwCZqvl8W_3UjhBHOHByA7GOaWyp4qRzUj_jQKsXb9BSllg-7K_749g3K6By4fGT5J7ULzEfK9L-aJ38"/>
                    </div>
                </div>
            </div>

            {/* Bottom Action Hub */}
            <div className="absolute bottom-24 lg:bottom-xl left-1/2 -translate-x-1/2 flex flex-col items-center gap-md w-full max-w-md px-md z-20">
                {/* Secondary Info Card */}
                <div className="w-full floating-card rounded-2xl p-sm px-md flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-sm">
                        <div className="p-2 bg-secondary/5 rounded-lg">
                            <span className="material-symbols-outlined text-secondary">water_drop</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-outline uppercase">Next Milestone</p>
                            <p className="font-label-md text-label-md text-on-surface">{(wallet.total_donated + 500).toLocaleString()} Impact Score</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-secondary font-bold">
                        <span>XP</span>
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                    </div>
                </div>

                {/* Primary CTA */}
                <button 
                    onClick={handlePlantMore}
                    disabled={isDonating}
                    className="group relative bg-primary text-on-primary w-full py-5 rounded-2xl shadow-[0_10px_20px_rgba(1,45,29,0.2)] hover:shadow-[0_15px_30px_rgba(1,45,29,0.3)] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden active:scale-95 disabled:opacity-70"
                >
                    <span className="relative z-10 font-headline-md text-headline-md">{isDonating ? 'Planting...' : 'Plant More'}</span>
                    {!isDonating && <span className="relative z-10 material-symbols-outlined text-headline-md">psychiatry</span>}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </button>
            </div>

            {/* Right Sidebar Quick Stats (Hidden on Mobile for cleanliness) */}
            <div className="hidden lg:flex absolute top-gutter bottom-gutter right-gutter w-72 flex-col gap-md pointer-events-none z-10">
                <div className="flex-1"></div>
                
                <div className="floating-card p-md rounded-2xl shadow-sm pointer-events-auto border border-primary/5">
                    <div className="flex items-center gap-sm mb-sm">
                        <span className="material-symbols-outlined text-secondary">language</span>
                        <span className="font-label-md text-label-md text-primary">Global Health</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                                <span>CO2 Sequestration</span>
                                <span className="text-secondary">{co2Offset}kg</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                <div className="h-full bg-secondary" style={{ width: `${Math.min(100, treesPlanted * 2)}%` }}></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                                <span>Trees Planted</span>
                                <span className="text-secondary">{treesPlanted}</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-md text-secondary font-label-md text-label-md py-2 border border-secondary/20 rounded-xl hover:bg-secondary/5 transition-colors">
                        View Detailed Report
                    </button>
                </div>

                <div className="floating-card p-sm rounded-2xl shadow-sm pointer-events-auto flex items-center gap-sm border border-primary/5">
                    <div className="w-10 h-10 bg-secondary-container rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary">notifications</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-outline">Latest Activity</span>
                        <span className="text-xs text-on-surface line-clamp-1">Your ecosystem is thriving!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
