import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export default function WalletPage() {
    const [wallet, setWallet] = useState({ balance: 0, total_donated: 0 });
    const [transactions, setTransactions] = useState([]);
    const [causesMap, setCausesMap] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchWalletData = async () => {
        try {
            const [walletRes, historyRes, causesRes] = await Promise.all([
                apiClient.get('/wallet/me'),
                apiClient.get('/donations/history'),
                apiClient.get('/causes/')
            ]);
            
            setWallet(walletRes.data);
            setTransactions(historyRes.data);

            const map = {};
            causesRes.data.forEach(c => map[c.id] = c);
            setCausesMap(map);

        } catch (error) {
            console.error("Failed to load wallet data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWalletData();
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
            fetchWalletData(); // Refresh data
        } catch (error) {
            alert("Failed to add money: " + (error.response?.data?.detail || error.message));
        }
    };

    if (loading) {
        return <div className="p-lg flex justify-center items-center h-full"><span className="material-symbols-outlined animate-spin text-4xl text-primary">eco</span></div>;
    }

    const treesPlanted = Math.floor(wallet.total_donated / 100);

    return (
        <div className="p-md lg:p-xl w-full h-full pb-32">
            {/* Header Section */}
            <header className="mb-lg flex justify-between items-end">
                <div>
                    <h1 className="font-headline-lg text-headline-lg text-primary mb-2">My Growth Wallet</h1>
                    <p className="font-body-md text-on-surface-variant">Your financial ecosystem is flourishing.</p>
                </div>
                <div className="flex gap-sm">
                    <button onClick={handleAddMoney} className="px-6 py-3 bg-primary text-on-primary font-label-md rounded-full shadow-sm hover:shadow-md transition-shadow active:scale-95">
                        Add Money
                    </button>
                </div>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-md items-stretch">
                
                {/* Hero Balance Card */}
                <div className="col-span-12 lg:col-span-7 bg-white rounded-xl shadow-[20px_20px_40px_rgba(27,67,50,0.06)] overflow-hidden flex flex-col relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-bl-[100%] transition-transform group-hover:scale-110 duration-500"></div>
                    <div className="p-md relative z-10 flex-1 flex flex-col justify-center">
                        <span className="font-label-md text-secondary uppercase tracking-widest mb-2">Available Balance</span>
                        <h2 className="font-display-lg text-display-lg text-primary">₹{wallet.balance.toLocaleString()}</h2>
                        <div className="mt-md flex items-center gap-4">
                            <div className="flex items-center gap-1 text-secondary font-bold">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span className="font-label-sm">+₹{(wallet.total_donated * 0.1).toFixed(0)} this week (est.)</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-outline-variant"></div>
                            <span className="text-on-surface-variant font-label-sm">Active saving pots</span>
                        </div>
                    </div>
                    <div className="bg-secondary/5 p-sm border-t border-secondary/10 flex justify-between items-center">
                        <span className="font-label-sm text-secondary-fixed-variant">Virtual Card Active • 1234 **** **** 5678</span>
                        <button className="text-secondary font-label-md flex items-center gap-1 hover:underline">
                            Manage <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Top Up Promo Card */}
                <div className="col-span-12 lg:col-span-5 bg-tertiary-container text-white rounded-xl p-md flex flex-col justify-between shadow-lg relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-on-tertiary-container/30 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-tertiary-fixed">eco</span>
                            </div>
                            <span className="font-label-md text-tertiary-fixed">Accelerator Bonus</span>
                        </div>
                        <h3 className="font-headline-md text-headline-md leading-tight mb-2">Boost your garden growth by 12% today</h3>
                        <p className="font-body-md text-on-tertiary-container/80 mb-6">Top up ₹2000+ to unlock the Golden Sprout badge and earn higher yields.</p>
                    </div>
                    <button onClick={handleAddMoney} className="relative z-10 w-full bg-secondary-fixed text-primary py-4 rounded-lg font-label-md font-bold shadow-lg hover:bg-white transition-colors">
                        Top Up Now
                    </button>
                </div>

                {/* Monthly Momentum Chart */}
                <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-[20px_20px_40px_rgba(27,67,50,0.06)] p-md flex flex-col">
                    <div className="flex justify-between items-start mb-lg">
                        <div>
                            <h3 className="font-headline-md text-headline-md text-primary">Savings Momentum</h3>
                            <p className="font-label-sm text-on-surface-variant">Monthly growth trajectory (Static UI Demo)</p>
                        </div>
                        <div className="flex bg-surface-container rounded-lg p-1">
                            <button className="px-4 py-1 text-label-sm font-bold bg-white shadow-sm rounded-md text-primary">Monthly</button>
                            <button className="px-4 py-1 text-label-sm font-medium text-on-surface-variant hover:text-primary">Quarterly</button>
                        </div>
                    </div>
                    {/* Chart Area */}
                    <div className="flex-1 flex items-end justify-between gap-4 h-48 px-2">
                        {[
                            { month: 'Jan', height: '40%' },
                            { month: 'Feb', height: '55%' },
                            { month: 'Mar', height: '45%' },
                            { month: 'Apr', height: '85%', active: true, label: '₹4,200' },
                            { month: 'May', height: '60%' },
                            { month: 'Jun', height: '75%' }
                        ].map((col, idx) => (
                            <div key={idx} className="group flex flex-col items-center flex-1 gap-2">
                                <div className={`w-full rounded-t-lg transition-all duration-500 relative flex items-center justify-center ${col.active ? 'bg-secondary text-white' : 'bg-surface-container-highest group-hover:bg-secondary-fixed-dim'}`} style={{ height: col.height }}>
                                    {col.active && <span className="absolute -top-8 bg-primary text-[10px] px-2 py-1 rounded text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-bold">{col.label}</span>}
                                </div>
                                <span className={`font-label-sm ${col.active ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{col.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mini Impact Stat */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-md">
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-4 animate-float">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>forest</span>
                        </div>
                        <h4 className="font-headline-md text-headline-md text-primary">{treesPlanted} Trees</h4>
                        <p className="font-label-sm text-on-surface-variant mt-2 px-4">Planted through your donations.</p>
                    </div>
                    <div className="bg-secondary/5 rounded-xl p-md border border-secondary/20 flex flex-col">
                        <span className="font-label-sm text-secondary font-bold uppercase mb-2">Round-up Active</span>
                        <div className="flex items-center justify-between">
                            <span className="text-primary font-body-md">Next Milestone</span>
                            <span className="text-primary font-bold">₹85.50 / ₹100</span>
                        </div>
                        <div className="w-full h-2 bg-white/50 rounded-full mt-3 overflow-hidden">
                            <div className="h-full bg-secondary rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="col-span-12 bg-white rounded-xl shadow-[20px_20px_40px_rgba(27,67,50,0.06)] overflow-hidden">
                    <div className="px-md py-6 flex justify-between items-center border-b border-surface-container">
                        <h3 className="font-headline-md text-headline-md text-primary">Recent Donations</h3>
                        <button className="text-secondary font-label-md hover:underline">View All History</button>
                    </div>
                    <div className="divide-y divide-surface-container">
                        {transactions.length === 0 ? (
                            <div className="p-md text-center text-on-surface-variant">No donations yet. Make your first donation to see it here!</div>
                        ) : (
                            transactions.map((tx) => {
                                const cause = causesMap[tx.cause_id];
                                const d = new Date(tx.donated_at);
                                return (
                                    <div key={tx.id} className="px-md py-sm flex items-center justify-between hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                                                <span className="material-symbols-outlined">{cause?.icon || 'volunteer_activism'}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-label-md text-on-surface">Donated to {cause?.name || 'Unknown Cause'}</h4>
                                                <p className="text-[12px] text-on-surface-variant">
                                                    {d.toLocaleDateString()} • {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Impact
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-headline-md text-headline-md text-on-surface block">-₹{tx.amount.toLocaleString()}</span>
                                            <span className="text-[10px] bg-secondary-fixed px-2 py-0.5 rounded text-secondary-fixed-variant font-bold">Successful</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
