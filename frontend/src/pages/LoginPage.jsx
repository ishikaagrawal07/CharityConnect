import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/client';

export default function LoginPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const response = await apiClient.post('/auth/login', { email, password });
                localStorage.setItem('access_token', response.data.access_token);
                navigate('/dashboard');
            } else {
                await apiClient.post('/auth/register', { name, email, password });
                const loginResponse = await apiClient.post('/auth/login', { email, password });
                localStorage.setItem('access_token', loginResponse.data.access_token);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            if (Array.isArray(err.response?.data?.detail)) {
                setError(err.response.data.detail[0].msg);
            } else {
                setError(err.response?.data?.detail || "Authentication failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
        setError(null);
    };

    return (
        <div className="bg-background text-on-surface antialiased min-h-screen relative overflow-hidden">
            {/* Background Pattern Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img aria-hidden="true" className="w-full h-full object-cover opacity-40 mix-blend-multiply" alt="Abstract forest background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmg8ohtuhTp9B6YI4E15G_aZNMAmEXQ3TRat80HUjzl_r0H26XU5slUdLbzgr44LPdYylK2YKLpaEY9a2QhQaBMK2Wzi5_fW41zxpkzQrpf2kh-pUMneO915ENICcnckUl6CJAKdb1miqrMbuurdrFMLkyQ4qMUp4PWTkm1LEgEDQeVFZiz92fD8E-1m0UDAlPE2K4GHHGfxNGWY1V4KZEbhUlg4c7TWo15R1c1SZ0tEGtQnxIUiKD8fkZhwsjXeGOdV2lT676u6Y"/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
            </div>

            {/* Back to Home Button */}
            <Link to="/" className="absolute top-md left-md z-20 flex items-center gap-xs font-label-md text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Home
            </Link>

            {/* Main Content Canvas */}
            <main className="relative z-10 min-h-screen flex items-center justify-center p-md sm:p-gutter">
                {/* Login/Signup Card */}
                <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-xl ambient-shadow-surface-1 p-md sm:p-lg flex flex-col">
                    
                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center mb-lg">
                        <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-sm text-primary">
                            <span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: "'FILL' 1"}}>spa</span>
                        </div>
                        <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">Impact Wallet</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {isLogin ? 'Sign in to continue your journey.' : 'Join us and start growing forests.'}
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="mb-md p-sm bg-error-container text-on-error-container rounded-lg font-label-sm flex items-center gap-sm">
                            <span className="material-symbols-outlined text-error">error</span>
                            {error}
                        </div>
                    )}

                    {/* Form Section */}
                    <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
                        
                        {/* Name Field (Sign up only) */}
                        {!isLogin && (
                            <div className="flex flex-col gap-base">
                                <label className="font-label-md text-label-md text-on-surface" htmlFor="name">Full Name</label>
                                <div className="w-full bg-surface-container-low rounded-lg transition-all focus-within:ring-2 focus-within:ring-secondary-container focus-within:bg-surface-container-lowest flex items-center px-sm">
                                    <span className="material-symbols-outlined text-outline mr-base" style={{fontVariationSettings: "'FILL' 0"}}>person</span>
                                    <input 
                                        className="w-full py-sm bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline ring-0 focus:ring-0" 
                                        id="name" 
                                        placeholder="Jane Doe" 
                                        required={!isLogin} 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="flex flex-col gap-base">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
                            <div className="w-full bg-surface-container-low rounded-lg transition-all focus-within:ring-2 focus-within:ring-secondary-container focus-within:bg-surface-container-lowest flex items-center px-sm">
                                <span className="material-symbols-outlined text-outline mr-base" style={{fontVariationSettings: "'FILL' 0"}}>mail</span>
                                <input 
                                    className="w-full py-sm bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline ring-0 focus:ring-0" 
                                    id="email" 
                                    placeholder="you@example.com" 
                                    required 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-base">
                            <div className="flex justify-between items-center">
                                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                                {isLogin && (
                                    <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors" href="#">Forgot Password?</a>
                                )}
                            </div>
                            <div className="w-full bg-surface-container-low rounded-lg transition-all focus-within:ring-2 focus-within:ring-secondary-container focus-within:bg-surface-container-lowest flex items-center px-sm relative">
                                <span className="material-symbols-outlined text-outline mr-base" style={{fontVariationSettings: "'FILL' 0"}}>lock</span>
                                <input 
                                    className="w-full py-sm bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline ring-0 focus:ring-0 pr-10" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    required 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button 
                                    aria-label="Toggle password visibility" 
                                    className="absolute right-sm text-outline hover:text-on-surface transition-colors flex items-center" 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={loading}
                            className="w-full bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg mt-base hover:bg-tertiary transition-colors flex justify-center items-center gap-xs shadow-sm disabled:opacity-70" 
                            type="submit"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                            {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                        </button>
                    </form>

                    {/* Footer Section */}
                    <div className="mt-lg text-center">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {isLogin ? "Don't have an account?" : "Already have an account?"} 
                            <button onClick={toggleMode} className="font-label-md text-label-md text-primary hover:text-secondary transition-colors ml-xs">
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
