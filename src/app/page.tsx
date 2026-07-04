import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Products from "@/components/site/products";
import ToolsMarquee from "@/components/site/tools-marquee";
import Credentials from "@/components/site/credentials";
import AcademicCredentials from "@/components/site/academic-credentials";
import Footer from "@/components/site/footer";
import FloatingContact from "@/components/site/floating-contact";
import Chatbot from "@/components/site/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Products />
        <ToolsMarquee />
        <Credentials />
        <AcademicCredentials />
      </main>
      <Footer />

      {/* Floating widgets */}
      <FloatingContact />
      <Chatbot />
    </div>
  );
}
