import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsShowcaseSection from "@/components/BenefitsShowcaseSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsShowcaseSection />
      <FAQSection />
      <Footer />
    </>
  );
}
