import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import Services from "@/components/site/services";
import ToolsMarquee from "@/components/site/tools-marquee";
import Portfolio from "@/components/site/portfolio";
import Footer from "@/components/site/footer";
import FloatingContact from "@/components/site/floating-contact";
import Chatbot from "@/components/site/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <ToolsMarquee />
        <Portfolio />
      </main>
      <Footer />

      {/* Floating widgets */}
      <FloatingContact />
      <Chatbot />
    </div>
  );
}
