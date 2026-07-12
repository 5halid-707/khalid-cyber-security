import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Products from "@/components/site/products";
import Credentials from "@/components/site/credentials";
import AcademicCredentials from "@/components/site/academic-credentials";
import VideoShowcase from "@/components/site/video-showcase";
import Designs from "@/components/site/designs";
import PreviousWorks from "@/components/site/previous-works";
import TrainingLabs from "@/components/site/training-labs";
import SecurityReports from "@/components/site/security-reports";
import InteractiveShowcase from "@/components/site/interactive-showcase";
import ContactSection from "@/components/site/contact-section";
import Footer from "@/components/site/footer";
import FloatingContact from "@/components/site/floating-contact";
import Chatbot from "@/components/site/chatbot";
import ScrollArrows from "@/components/site/scroll-arrows";
import MusicPlayer from "@/components/site/music-player";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-fg">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Products />
        <Credentials />
        <AcademicCredentials />
        <VideoShowcase videoSrc="/marketing-video.mp4" />
        <Designs />
        <PreviousWorks />
        <TrainingLabs />
        <SecurityReports />
        <InteractiveShowcase />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating widgets */}
      <ScrollArrows />
      <FloatingContact />
      <MusicPlayer />
      <Chatbot />
    </div>
  );
}
