export default function FeaturesGrid() {
    return (
        <section className="py-xl px-md lg:px-lg max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {/* Stat Card 1 */}
                <div className="stat-card-gradient rounded-2xl p-lg ambient-shadow-surface-1 flex flex-col items-start gap-md h-full transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant mb-sm">
                        <span className="material-symbols-outlined text-2xl">payments</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary">Micro-impact</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
                        Make a difference with just ₹20 - ₹100 daily contributions. Small habits build vast forests.
                    </p>
                </div>
                {/* Stat Card 2 */}
                <div className="stat-card-gradient rounded-2xl p-lg ambient-shadow-surface-1 flex flex-col items-start gap-md h-full transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant mb-sm">
                        <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary">6 Core Causes</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
                        Curated, transparent allocation. Know exactly where your impact is growing in the real world.
                    </p>
                </div>
                {/* Stat Card 3 */}
                <div className="stat-card-gradient rounded-2xl p-lg ambient-shadow-surface-1 flex flex-col items-start gap-md h-full transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant mb-sm">
                        <span className="material-symbols-outlined text-2xl">park</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary">1:1 Impact</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
                        Every virtual tree you nurture in the app guarantees a real sapling planted in priority zones.
                    </p>
                </div>
            </div>
        </section>
    );
}
