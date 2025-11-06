import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import HeroStepsSection from "@/components/HeroStepsSection";
import FAQStaticList from "@/components/FAQStaticList";
import PracticeWithAIMock from "@/components/PracticeWithAIMock";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <PracticeWithAIMock />
      <HowItWorksSection />
      <HeroStepsSection />
      <FAQStaticList />
    </>
  );
}
