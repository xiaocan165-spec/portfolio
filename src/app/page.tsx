import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import DemoSection from "@/components/DemoSection";
import TechBreakdown from "@/components/TechBreakdown";
import ContactSection from "@/components/ContactSection";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <DemoSection />
      <TechBreakdown />
      <ContactSection />
      <BackToTop />
    </>
  );
}
