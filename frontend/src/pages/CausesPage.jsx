import { useState, useEffect, useMemo } from 'react';
import apiClient from '../api/client';

export default function CausesPage() {
    const [causes, setCauses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDonating, setIsDonating] = useState(false);

    useEffect(() => {
        const fetchCauses = async () => {
            try {
                const res = await apiClient.get('/causes/');
                setCauses(res.data);
            } catch (error) {
                console.error("Failed to load causes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCauses();
    }, []);

    const handleDonate = async (cause) => {
        const amountStr = window.prompt(`How much would you like to donate to ${cause.name}? (₹)`);
        if (!amountStr) return;
        
        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        setIsDonating(true);
        try {
            await apiClient.post('/donations/donate', { cause_id: cause.id, amount });
            alert(`Successfully donated ₹${amount} to ${cause.name}! Your impact is growing.`);
        } catch (error) {
            alert("Failed to donate: " + (error.response?.data?.detail || error.message));
        } finally {
            setIsDonating(false);
        }
    };

    // Helper to map backend biome_type to UI Category and Image
    const getCauseMetadata = (biome_type) => {
        switch (biome_type) {
            case 'tree':
                return {
                    category: 'Environment',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVDCZUWlqQ8_Re1mC2speV4QoLjwLSBsWFfewBK-m462u9PZyLFHKsO3jhnHFWaeWjYZT_WLjy04nXHK-4IHOQGxT9buXPntEstCT_I5kxBAGwc3IV7Pi3bsM0WEDs-zo3i1oGGeuzEs_7jrrbXnEpbMR6py698A5NQIqojkot1s_bnpfVWRTCv6xEf0IFVYilzzkYX7UDNWw7UTQsPGwIPhyvaCk0jEiX3Pxru63vP_cnCuudaMitC2Sx_Qfn8nXiNLK3e3unPwU',
                    statIcon: 'park',
                    statLabel: '1.2M Trees'
                };
            case 'school':
                return {
                    category: 'Education',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Eol9bJLLrNY4Szj8618Btfp2BBmztcKZv62unri4096MTStIso1CDBOGdjISqZaDV1WyOkOw4KrqpnsBa-pFA9Zl73AMCvr-O7g0q1c493979H4fP5QV7uMtkiID9n9AQbvbMvSOAVOb8l-drHXNEH6CM3gr0RBY8y_OkXl8t1zU1mMbO9CWZMVLOf7Ljrk8F9YFLX9rXrk7NQd3N18YN4rmlQn-8-wNpsuxJcwXvuBhIYPby2dEnvEADsIRGSyLgmyWlpRB5rM',
                    statIcon: 'menu_book',
                    statLabel: '45k Students'
                };
            case 'clinic':
                return {
                    category: 'Humanitarian',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC42E1ySBgzvDwKTlXDYctnWJUp2qqZzYFKaMws5EaPD0AxItilV3xEnnpF1leXTemNylzdD9ini5tO8UDTfl5rdqxUGzwi6d4dmtsvuQzfzjI-wlh6P64382esWIxfLt-HspJ-hGYSTBznmjmskdZYfZwjQTLWJ9kA4HAAQ-nk2x4zi81zm8v6Yj4rPqg7xZgsudZXyMUQPjEiHdxYkpaAYt7vh2WlDiPqFSyw5Ph1aJtHhsv1kP_fVJxc2si5V7TsbTkfYx5rmZI',
                    statIcon: 'medical_services',
                    statLabel: '12k Treated'
                };
            case 'water':
                return {
                    category: 'Humanitarian',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz1vJph7OAP1buHM6SpHB1N5amBHDYRb6OhDkSVOwWWS_Int5OjlbKRz0dq8kzGFP1Qtw8Gl6mK5Ve56TuPwHE80zAB0UG9Ni7lwwmyxuw6cERpmBNyWKJo1N6t-Si_3iyPFMi4cVl4rt-cpZEvfbep1ZwUcTunF3-CgeHlRMy0_EPnF1mAQggp0XZMtpyAQMYKpSZ2IEWlRmZn_YGvMCdaufXkacqGcWYHrHKRwpiAdpk5X6wJgWPWWll4jthq3P0705kkC5fsj4',
                    statIcon: 'water_drop',
                    statLabel: '850k Liters'
                };
            case 'ocean':
                return {
                    category: 'Environment',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFg43xzABYQkSf2h8GZqEPAIrE3dicB2WYOfdy3FelP6RWZd5QRMzqzQC6E1mSgeQ6nQXKyS8nd9OR0jM0RjBTbYtmtYwEYXogfT_F05_VJTJlFwYw6C81-7JH-Jr_7v2CV_kCznWj3s_NEHEtORdejYEq8HnOP3dN-RiuCs6iuhIcvudvCP7LcxvBYBgt4xrpTOIsVWH7UlY5Wl7hGi7AXSOzsSTr6REZiBoJsE4YUmLK73XbfAF1BVpXkx5rTgloXatGtUYtbxI',
                    statIcon: 'waves',
                    statLabel: '210 Tons'
                };
            case 'code':
                return {
                    category: 'Education',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoaXsdEnQi927QilcCDI52x1IhClaIKQBXCJu1Lg92hw_4Zc5-haSSXf2sIsEAhoh37HGa93D1Tc9ztVHhVYrFrTh-6z9ttIQhSA1NTS1NJ0VSmlvQFdZ5eAjU6_VAhgtr5IZ4obw3cJA4oPjluMyazZ95AIcZHFlfpkGViRo0RMaF52TauZ9s04NFNqgmHlhPN0aXCeOzM-R54NTCVs2GyFlw242yMf0J8aVEhVAXcezg96tph1FgVmdUVC0PQ4Zc5uLI6Tcv2i4',
                    statIcon: 'code',
                    statLabel: '3.4k Grads'
                };
            default:
                return {
                    category: 'Community',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz1vJph7OAP1buHM6SpHB1N5amBHDYRb6OhDkSVOwWWS_Int5OjlbKRz0dq8kzGFP1Qtw8Gl6mK5Ve56TuPwHE80zAB0UG9Ni7lwwmyxuw6cERpmBNyWKJo1N6t-Si_3iyPFMi4cVl4rt-cpZEvfbep1ZwUcTunF3-CgeHlRMy0_EPnF1mAQggp0XZMtpyAQMYKpSZ2IEWlRmZn_YGvMCdaufXkacqGcWYHrHKRwpiAdpk5X6wJgWPWWll4jthq3P0705kkC5fsj4',
                    statIcon: 'public',
                    statLabel: 'Growing Impact'
                };
        }
    };

    const filteredCauses = useMemo(() => {
        return causes.filter(cause => {
            const meta = getCauseMetadata(cause.biome_type);
            
            // Category Filter
            const matchesCategory = filter === 'All' || meta.category === filter;
            
            // Search Filter
            const lowerQuery = searchQuery.toLowerCase();
            const matchesSearch = cause.name.toLowerCase().includes(lowerQuery) || 
                                  (cause.description && cause.description.toLowerCase().includes(lowerQuery)) ||
                                  (cause.ngo_partner && cause.ngo_partner.toLowerCase().includes(lowerQuery));
                                  
            return matchesCategory && matchesSearch;
        });
    }, [causes, filter, searchQuery]);

    if (loading) {
        return <div className="p-lg flex justify-center items-center h-full"><span className="material-symbols-outlined animate-spin text-4xl text-primary">eco</span></div>;
    }

    return (
        <div className="p-md lg:p-xl min-h-screen bg-surface">
            <div className="max-w-[1200px] mx-auto pb-24">
                {/* Header & Filter Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Explore Causes</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Nurture the world with your financial growth.</p>
                    </div>
                    <div className="flex flex-wrap gap-sm">
                        {['All', 'Environment', 'Education', 'Humanitarian'].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-sm py-xs rounded-full font-label-md text-label-md transition-all ${filter === cat ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Search Bar */}
                <div className="mb-lg relative max-w-md">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-md py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all text-body-md outline-none" 
                        placeholder="Search by partner or region..." 
                    />
                </div>

                {/* Cause Cards Grid */}
                {filteredCauses.length === 0 ? (
                    <div className="text-center py-xl text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl mb-sm text-outline">search_off</span>
                        <p>No causes found matching your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                        {filteredCauses.map(cause => {
                            const meta = getCauseMetadata(cause.biome_type);
                            return (
                                <article key={cause.id} className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-card-shadow flex flex-col transition-transform hover:-translate-y-1 duration-300">
                                    <div className="h-48 w-full overflow-hidden relative">
                                        <img src={meta.image} alt={cause.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-secondary-container text-secondary text-label-sm font-label-sm rounded-full">
                                                {meta.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-md flex flex-col gap-sm flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-headline-md text-headline-md text-primary leading-tight">{cause.name}</h3>
                                            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                        </div>
                                        <p className="font-label-md text-label-md text-on-secondary-container">By {cause.ngo_partner || 'Impact Wallet Foundation'}</p>
                                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 flex-1">{cause.description}</p>
                                        
                                        <div className="mt-md p-sm bg-surface-container rounded-lg flex items-center gap-sm">
                                            <div className="p-2 bg-secondary/10 rounded-full">
                                                <span className="material-symbols-outlined text-secondary">{meta.statIcon}</span>
                                            </div>
                                            <div>
                                                <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Live Impact</p>
                                                <p className="font-headline-md text-headline-md text-primary">{meta.statLabel}</p>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleDonate(cause)}
                                            disabled={isDonating}
                                            className="mt-md w-full py-3 border-2 border-secondary text-secondary rounded-xl font-label-md text-label-md hover:bg-secondary hover:text-white transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isDonating ? 'Processing...' : 'Support Growth'}
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
