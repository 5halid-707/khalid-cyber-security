import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Products from "@/components/site/products";
import VideoShowcase from "@/components/site/video-showcase";
import ToolsMarquee from "@/components/site/tools-marquee";
import Credentials from "@/components/site/credentials";
import AcademicCredentials from "@/components/site/academic-credentials";
import AcademicProducts from "@/components/site/academic-products";
import Footer from "@/components/site/footer";
import FloatingContact from "@/components/site/floating-contact";
import Chatbot from "@/components/site/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-fg">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Products />
        <VideoShowcase videoSrc="/marketing-video.mp4" />
        <ToolsMarquee />
        <Credentials />
        <AcademicCredentials />
        <AcademicProducts />
      </main>
      <Footer />

      {/* Floating widgets */}
      <FloatingContact />
      <Chatbot />
    </div>
  );
}
