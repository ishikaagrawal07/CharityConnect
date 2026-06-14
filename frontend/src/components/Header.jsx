import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-md">
            <div className="max-w-container-max mx-auto px-md md:px-lg h-20 flex justify-between items-center">
                <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary text-3xl">psychiatry</span>
                    <span className="font-headline-md text-headline-md font-bold text-primary">Impact Wallet</span>
                </div>
                <div>
                    <Link to="/login" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors duration-200">
                        Log In
                    </Link>
                </div>
            </div>
        </header>
    );
}
