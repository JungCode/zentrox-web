import {
  FeaturesGrid,
  HeroSection,
  HowItWorks,
} from '@/features/landing/components';

const LandingPage = () => {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex w-full flex-1 flex-col">
        <HeroSection />
        <HowItWorks />
        <FeaturesGrid />
      </main>
    </div>
  );
};

export default LandingPage;
