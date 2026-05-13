import { BuySection } from "../components/BuySection.jsx";
import { CreatorsSection } from "../components/CreatorsSection.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import { MetaSection } from "../components/MetaSection.jsx";
import { OtherOgGroupsSection } from "../components/OtherOgGroupsSection.jsx";
import { ShopsSection } from "../components/ShopsSection.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { StatsBar } from "../components/StatsBar.jsx";
import { WhalesSection } from "../components/WhalesSection.jsx";

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-white font-sans text-[17px] leading-relaxed text-slate-600 antialiased max-lg:text-base">
      <SiteHeader />
      <HeroSection />
      <StatsBar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-20 px-6 py-16 md:space-y-24 md:px-10 md:py-20">
        <ShopsSection />
        <CreatorsSection />
        <BuySection />
        <MetaSection />
        <OtherOgGroupsSection />

        <WhalesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
