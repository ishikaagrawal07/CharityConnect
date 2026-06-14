import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export default function DashboardPage() {
    const [wallet, setWallet] = useState({ balance: 0, total_donated: 0 });
    const [causes, setCauses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: 'Eco Warrior' });

    const fetchDashboardData = async () => {
        try {
            const [userRes, walletRes, causesRes] = await Promise.all([
                apiClient.get('/auth/me'),
                apiClient.get('/wallet/me'),
                apiClient.get('/causes/')
            ]);
            if (userRes.data) {
                const name = userRes.data.name || userRes.data.email.split('@')[0];
                setUser({ name: name.charAt(0).toUpperCase() + name.slice(1) });
            }
            setWallet(walletRes.data);
            setCauses(causesRes.data);
        } catch (error) {
            console.error("Failed to load dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleAddMoney = async () => {
        const amountStr = window.prompt("Enter amount to add to your wallet (₹):");
        if (!amountStr) return;
        
        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        try {
            await apiClient.post('/wallet/add', { amount });
            fetchDashboardData(); // Refresh data
        } catch (error) {
            alert("Failed to add money: " + (error.response?.data?.detail || error.message));
        }
    };

    const handleDonate = async (causeId) => {
        if (!causes.length) {
            alert("No causes available to donate to.");
            return;
        }
        
        const targetCauseId = causeId || causes[0].id; // Default to first cause if not specified
        const amountStr = window.prompt("Enter amount to donate (₹):");
        if (!amountStr) return;

        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        if (amount > wallet.balance) {
            alert("Insufficient wallet balance. Please add money first.");
            return;
        }

        try {
            await apiClient.post('/donations/donate', { cause_id: targetCauseId, amount });
            fetchDashboardData(); // Refresh data
            alert("Donation successful! Your ecosystem is growing.");
        } catch (error) {
            alert("Failed to donate: " + (error.response?.data?.detail || error.message));
        }
    };

    if (loading) {
        return <div className="p-lg flex justify-center items-center h-full"><span className="material-symbols-outlined animate-spin text-4xl text-primary">eco</span></div>;
    }

    const calculatedLevel = Math.max(1, Math.floor(wallet.total_donated / 500) + 1);
    const treesPlanted = Math.floor(wallet.total_donated / 100);
    const co2Offset = treesPlanted * 21; // roughly 21kg per tree

    return (
        <>
            {/* Top Bar */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-gutter py-md flex justify-between items-center w-full">
                <div className="flex md:hidden items-center gap-sm">
                    <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">Impact Wallet</h1>
                </div>
                <div className="hidden md:block">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Welcome back, {user.name}</h2>
                </div>
                <div className="flex items-center gap-md">
                    <div className="bg-[#FFF8E7] text-[#935D00] px-sm py-xs rounded-full font-label-sm text-label-sm flex items-center gap-xs shadow-sm">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>local_fire_department</span>
                        Active Streak
                    </div>
                    <div className="flex gap-base">
                        <button className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <div className="p-gutter max-w-container-max mx-auto w-full flex flex-col gap-lg pb-xl">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:hidden text-on-surface mb-sm">Welcome back, {user.name}</h2>
                
                {/* Top Row: Wallet & Living World */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                    
                    {/* Wallet Card */}
                    <div className="lg:col-span-5 bg-surface-container-lowest rounded-[1rem] p-md shadow-ambient flex flex-col justify-between min-h-[280px]">
                        <div>
                            <div className="flex justify-between items-start mb-sm">
                                <h3 className="font-label-md text-label-md text-on-surface-variant">Available Impact Balance</h3>
                                <span className="material-symbols-outlined text-primary-container">account_balance_wallet</span>
                            </div>
                            <p className="font-display-lg text-display-lg text-primary tracking-tight">₹{wallet.balance.toLocaleString()}</p>
                            
                            <div className="mt-md space-y-sm">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-body-md text-body-md text-outline">Gamification Rank Progress</span>
                                    <span className="font-label-md text-label-md text-primary">Lvl {calculatedLevel}</span>
                                </div>
                                <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-secondary to-[#aeeecb] rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (wallet.total_donated % 500) / 5)}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-sm mt-lg">
                            <button onClick={handleAddMoney} className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg hover:bg-tertiary transition-colors">
                                Add Money
                            </button>
                            <button onClick={() => handleDonate(null)} className="flex-1 bg-secondary-container text-on-secondary-container font-label-md text-label-md py-sm rounded-lg hover:bg-[#95d4b3] transition-colors border border-transparent text-center">
                                Donate Now
                            </button>
                        </div>
                    </div>

                    {/* Living World Card */}
                    <div className="lg:col-span-7 bg-surface-container-lowest rounded-[1rem] p-xs shadow-ambient relative overflow-hidden group min-h-[280px] flex flex-col">
                        <div className="relative w-full h-48 md:h-full rounded-xl overflow-hidden bg-[#e8f5e9]">
                            <img alt="Lush green forest illustration representing the user's ecosystem" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnGLUuykvMLUgS4rGox0Lrc2MJ8_XUS7L2bNeUMPAoviNHSLHKWQU0JRWYDHXgxq3vnSjfqf2mLPVYy6EHxUxE_7OcXrKSzwiNL8uNPbUMkvnpfFQnL8_bkKZ55Xj3Z7prWV0pXnJTJ6Nr0t8wgMWUG4wcc7SybD2Sk_reeieTSoLta21Il_IP_AnsIOMYtHIk3NWrTfqEFz4i2bzs5JFhqG5pQbb3bk93Riac6R67Bk1gyZGIIn7IB3bQm08KO-eTaEQskO0rqlY"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-md">
                                <div className="bg-surface/90 backdrop-blur-sm self-start px-sm py-xs rounded-lg mb-base flex items-center gap-xs">
                                    <span className="material-symbols-outlined text-secondary" style={{ fontSize: '16px' }}>psychiatry</span>
                                    <span className="font-label-sm text-label-sm text-primary">Level {calculatedLevel} Ecosystem</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md text-on-primary">Your forest is thriving!</h3>
                                <p className="font-body-md text-body-md text-primary-fixed-dim mt-xs hidden md:block">Keep donating to nurture more life.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Row: Quick Actions */}
                <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        <button onClick={() => handleDonate(causes.find(c => c.name.toLowerCase().includes('tree'))?.id)} className="bg-surface-container-lowest rounded-[1rem] p-md shadow-ambient hover:shadow-lg transition-shadow flex items-center justify-between text-left group border border-transparent focus:outline-none btn-tactile">
                            <div className="flex items-center gap-md">
                                <div className="w-12 h-12 rounded-full bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">water_drop</span>
                                </div>
                                <div>
                                    <h4 className="font-label-md text-label-md text-on-surface">Water your world</h4>
                                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-xs">Contribute to Tree Plantation</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">arrow_forward</span>
                        </button>
                        
                        <button onClick={() => handleDonate(causes.length > 1 ? causes[1].id : null)} className="bg-surface-container-lowest rounded-[1rem] p-md shadow-ambient hover:shadow-lg transition-shadow flex items-center justify-between text-left group border border-transparent focus:outline-none">
                            <div className="flex items-center gap-md">
                                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-xs">
                                        <h4 className="font-label-md text-label-md text-on-surface">Suggested Cause</h4>
                                    </div>
                                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-xs">Support Education</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Lifetime Stats */}
                <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Lifetime Impact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                        <div className="bg-surface-container-lowest rounded-[1rem] p-md shadow-ambient border-t-4 border-secondary-container">
                            <div className="flex items-center gap-sm mb-sm text-secondary">
                                <span className="material-symbols-outlined">nature_people</span>
                                <h4 className="font-label-md text-label-md">Trees Planted</h4>
                            </div>
                            <p className="font-headline-lg text-headline-lg text-primary">{treesPlanted}</p>
                        </div>
                        <div className="bg-surface-container-lowest rounded-[1rem] p-md shadow-ambient border-t-4 border-[#B2EBF2]">
                            <div className="flex items-center gap-sm mb-sm text-[#006064]">
                                <span className="material-symbols-outlined">co2</span>
                                <h4 className="font-label-md text-label-md">CO2 Offset</h4>
                            </div>
                            <p className="font-headline-lg text-headline-lg text-primary">{co2Offset}<span className="text-xl ml-xs text-outline">kg</span></p>
                        </div>
                        <div className="bg-surface-container-lowest rounded-[1rem] p-md shadow-ambient border-t-4 border-[#FFE082]">
                            <div className="flex items-center gap-sm mb-sm text-[#FF8F00]">
                                <span className="material-symbols-outlined">savings</span>
                                <h4 className="font-label-md text-label-md">Total Donated</h4>
                            </div>
                            <p className="font-headline-lg text-headline-lg text-primary">₹{wallet.total_donated.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
