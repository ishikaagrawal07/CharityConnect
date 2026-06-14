import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-[921px] flex items-center justify-center py-xl px-md lg:px-lg overflow-hidden hero-bg-gradient">
            {/* Abstract background blobs for organic feel */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-40 z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary-container blur-3xl mix-blend-multiply"></div>
                <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-primary-fixed blur-3xl mix-blend-multiply"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-tertiary-fixed blur-3xl mix-blend-multiply"></div>
            </div>
            <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center relative z-10 w-full">
                {/* Hero Content */}
                <div className="flex flex-col gap-lg order-2 lg:order-1 text-center lg:text-left z-10">
                    <div className="space-y-sm">
                        <span className="inline-block px-md py-xs rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider mb-sm">
                            Save Small. Donate Big.
                        </span>
                        <h1 className="font-display-lg text-display-lg text-primary mb-sm leading-tight">
                            Every rupee you give grows a living world.
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0">
                            Transform micro-savings into monumental environmental change. Join a community where your financial growth is directly linked to the planet's flourish.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-md justify-center lg:justify-start mt-sm">
                        <Link to="/login" className="w-full sm:w-auto px-xl py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-xs hover:bg-tertiary transition-colors duration-200 shadow-md">
                            Get Started
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-xl py-sm bg-transparent text-secondary border border-transparent hover:text-primary transition-colors duration-200 font-label-md text-label-md flex items-center justify-center">
                            I already have an account
                        </Link>
                    </div>
                </div>
                {/* Hero Visual */}
                <div className="order-1 lg:order-2 relative w-full h-[400px] lg:h-[600px] z-10">
                    <div className="w-full h-full rounded-2xl overflow-hidden ambient-shadow-surface-1 relative">
                        <img 
                            alt="Growing forest" 
                            className="w-full h-full object-cover rounded-2xl" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhWNQxPmaZRebm1PqEx_Q3yBUr9Eh-jNgDAntClISOQyU60eUeH5a-Dec4QoBNfFhtUAdkV0pUyzLkgkOwKLkXNOy9p-UT4zJRWFtOxd1yYeHbQdX3EGerSqSP53ggLu9D9UO4mtwvLW8n2zJkfJqaaZWOlsMw5ZPv3RaoKIMbB3_djcXQqY6E-VnmaSU8q--Po5AbVbval2wt5tqyAjLlaw4KhM2EvmAAIp7RuVvnNgmkegWAwvk67PqT_4ePVQL90jfeVGCavOk"
                        />
                        {/* Floating Glassmorphism Element */}
                        <div className="absolute bottom-lg left-lg right-lg lg:right-auto lg:w-72 bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-md ambient-shadow-surface-2 border border-white/20">
                            <div className="flex items-center gap-sm mb-xs">
                                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                                    <span className="material-symbols-outlined">forest</span>
                                </div>
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant">Global Impact</p>
                                    <p className="font-headline-md text-[20px] text-primary leading-tight font-bold">12,450 Trees</p>
                                </div>
                            </div>
                            <div className="w-full bg-surface-variant rounded-full h-2 mt-sm overflow-hidden">
                                <div className="bg-gradient-to-r from-secondary to-secondary-fixed h-full rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
