import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Products from "@/components/site/products";
import VideoShowcase from "@/components/site/video-showcase";
import PreviousWorks from "@/components/site/previous-works";
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
        <VideoShowcase videoSrc="/marketing-video-khalid.mp4" />
        <PreviousWorks />
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
