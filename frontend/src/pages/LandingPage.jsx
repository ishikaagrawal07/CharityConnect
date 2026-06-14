import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';

export default function LandingPage() {
    return (
        <div className="bg-background text-on-background min-h-screen font-body-md text-body-md antialiased overflow-x-hidden selection:bg-secondary-container selection:text-on-secondary-container">
            <Header />
            <main className="pt-20">
                <HeroSection />
                <FeaturesGrid />
                {/* Bottom padding for breathing room */}
                <div className="h-xl"></div>
            </main>
        </div>
    );
}
