"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Wand2,
  ArrowRight,
  Play,
  Star,
  PenLine,
  Mic,
  UserCircle2,
  Scissors,
  LayoutTemplate,
  Languages,
  Link as LinkIcon,
  Download,
  Clock,
  Quote,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Check,
} from "lucide-react";

// Self-contained Khalid-AI landing preview — uses explicit colors
// to avoid conflicts with the parent project's cyberpunk theme.

const EMAIL = "khalid-alharbi@zohomail.sa";
const WHATSAPP = "+966575015019";
const WHATSAPP_LINK = "https://wa.me/966575015019";

const features = [
  { icon: PenLine, title: "AI Script Writer", desc: "Drop a URL or a few lines and the AI writes a tight, on-brand video script with hook, body and CTA.", g: "from-indigo-500 to-purple-500" },
  { icon: Mic, title: "AI Voiceover", desc: "50+ ultra-realistic voices in 50+ languages. Pick a tone — energetic, calm, professional — done.", g: "from-purple-500 to-pink-500" },
  { icon: UserCircle2, title: "AI Avatar", desc: "Add a lifelike AI presenter that speaks your script in any language, no camera or studio needed.", g: "from-pink-500 to-rose-500" },
  { icon: Scissors, title: "Video Editor", desc: "Drag-and-drop timeline, scene reordering, text overlays, B-roll and music. Simple but powerful.", g: "from-amber-500 to-orange-500" },
  { icon: LayoutTemplate, title: "Templates Library", desc: "Start from 200+ proven templates for Reels, Shorts, TikTok, product demos and explainer videos.", g: "from-emerald-500 to-teal-500" },
  { icon: Languages, title: "Multi-language", desc: "Translate and dub your video into 50+ languages with one click. Reach a global audience instantly.", g: "from-cyan-500 to-blue-500" },
];

const steps = [
  { icon: LinkIcon, title: "Paste URL or script", desc: "Drop a product link, paste a script, or upload a document. Pick a video type and language.", g: "from-indigo-500 to-purple-500" },
  { icon: Wand2, title: "AI generates everything", desc: "Khalid-AI writes the script, records the voiceover, builds scenes and edits the video automatically.", g: "from-purple-500 to-pink-500" },
  { icon: Download, title: "Preview & download", desc: "Tweak text, music or aspect ratio, then export in 4K. Share to socials in one click.", g: "from-pink-500 to-rose-500" },
];

const stats = [
  { value: "10M+", label: "Videos Created", g: "from-indigo-500 to-purple-500" },
  { value: "150+", label: "Countries", g: "from-purple-500 to-pink-500" },
  { value: "50+", label: "Languages", g: "from-pink-500 to-rose-500" },
  { value: "4.9/5", label: "Average Rating", g: "from-amber-500 to-orange-500" },
];

const tplIcons: Record<string, string> = {
  Package: "📦", Instagram: "📸", Youtube: "▶", Music2: "🎵", Facebook: "f", Linkedin: "in",
  GraduationCap: "🎓", Lightbulb: "💡", Quote: "❝", Sparkles: "✨", CalendarDays: "📅", BookOpen: "📖",
};

const templates = [
  { id: 1, name: "Product Showcase", duration: "0:30", cat: "Marketing", g: "from-indigo-500 via-purple-500 to-pink-500", icon: "Package", popular: true },
  { id: 2, name: "Instagram Reel", duration: "0:15", cat: "Social", g: "from-pink-500 via-rose-500 to-orange-400", icon: "Instagram", popular: true },
  { id: 3, name: "YouTube Short", duration: "0:45", cat: "Social", g: "from-red-500 via-rose-500 to-pink-500", icon: "Youtube", popular: true },
  { id: 4, name: "TikTok Ad", duration: "0:20", cat: "Social", g: "from-cyan-400 via-fuchsia-500 to-rose-500", icon: "Music2", popular: true },
  { id: 5, name: "Facebook Video", duration: "1:00", cat: "Marketing", g: "from-blue-500 via-indigo-500 to-violet-500", icon: "Facebook" },
  { id: 6, name: "LinkedIn Promo", duration: "0:45", cat: "Business", g: "from-sky-500 via-blue-500 to-indigo-500", icon: "Linkedin" },
  { id: 7, name: "Tutorial Video", duration: "2:30", cat: "Education", g: "from-emerald-500 via-teal-500 to-cyan-500", icon: "GraduationCap", popular: true },
  { id: 8, name: "Explainer Video", duration: "1:15", cat: "Education", g: "from-violet-500 via-purple-500 to-fuchsia-500", icon: "Lightbulb" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Content Creator", avatar: "SC", g: "from-pink-500 to-rose-500", rating: 5, text: "Khalid-AI cut my video production time from 4 hours to 10 minutes. The AI voiceovers are shockingly realistic." },
  { name: "Ahmed Hassan", role: "E-commerce Owner", avatar: "AH", g: "from-indigo-500 to-purple-500", rating: 5, text: "I paste a product link and get a polished promo video in Arabic and English. Sales went up 30%." },
  { name: "Maria Lopez", role: "Marketing Manager", avatar: "ML", g: "from-amber-500 to-orange-500", rating: 5, text: "We use it daily for Reels and Shorts. The multi-language dubbing alone is worth it." },
  { name: "Khalid Al-harbi", role: "Cyber Security Expert", avatar: "KH", g: "from-violet-500 to-fuchsia-500", rating: 5, text: "Built as a demo to show what AI video can do. Free, fast, and no sign-up walls." },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it works" },
    { href: "#templates", label: "Templates" },
  ];

  return (
    <div
      style={{
        background: "#0f0f23",
        color: "#f8f9ff",
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .ka-grid {
          background-image:
            linear-gradient(rgba(99, 102, 241, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.07) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .ka-gradient-text {
          background-image: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .ka-glow {
          box-shadow: 0 0 60px -15px rgba(99, 102, 241, 0.6);
        }
        @keyframes ka-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .ka-float { animation: ka-float 6s ease-in-out infinite; }
        .ka-float-slow { animation: ka-float 9s ease-in-out infinite; }
        @keyframes ka-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .ka-pulse { animation: ka-pulse 4s ease-in-out infinite; }
        .ka-card {
          background: #1a1a35;
          border: 1px solid #2d2d55;
        }
        .ka-card:hover { border-color: rgba(99, 102, 241, 0.5); }
        ::selection { background: rgba(99, 102, 241, 0.4); }
      `}</style>

      {/* NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled ? "rgba(15, 15, 35, 0.7)" : "transparent",
          borderBottom: scrolled ? "1px solid #2d2d55" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="sm:px-6 lg:px-8"
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ position: "relative", width: "36px", height: "36px", flexShrink: 0 }}>
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", fontWeight: 900, color: "white",
              }}>K</div>
            </div>
            <span style={{ fontSize: "18px", fontWeight: 700 }}>Khalid-AI</span>
          </Link>

          <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#9ca3af",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                }}
                className="hover:!text-white hover:!bg-[#1a1a35]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a
              href="#cta"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                color: "white",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                boxShadow: "0 0 40px -10px rgba(99, 102, 241, 0.6)",
                transition: "transform 0.2s",
              }}
              className="hover:scale-105"
            >
              Get Started Free
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden"
            style={{
              width: "36px", height: "36px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              borderRadius: "8px", border: "1px solid #2d2d55", background: "#1a1a35",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} color="#f8f9ff" /> : <Menu size={16} color="#f8f9ff" />}
          </button>
        </div>

        {mobileOpen && (
          <div style={{ borderTop: "1px solid #2d2d55", background: "#0f0f23" }} className="md:hidden">
            <nav style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ padding: "10px 12px", fontSize: "14px", fontWeight: 500, color: "#9ca3af", borderRadius: "8px" }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                style={{
                  marginTop: "8px",
                  background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                  color: "white", padding: "10px 12px", fontSize: "14px", fontWeight: 600,
                  borderRadius: "8px", textAlign: "center",
                }}
              >
                Get Started Free
              </a>
            </nav>
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>
        {/* HERO */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div className="ka-grid" style={{ position: "absolute", inset: 0 }} />
          <div className="ka-pulse" style={{
            position: "absolute", top: "-160px", left: "25%",
            width: "384px", height: "384px", borderRadius: "50%",
            background: "#6366f1", opacity: 0.2, filter: "blur(80px)",
          }} />
          <div className="ka-pulse" style={{
            position: "absolute", top: "-80px", right: "25%",
            width: "320px", height: "320px", borderRadius: "50%",
            background: "#ec4899", opacity: 0.2, filter: "blur(80px)",
            animationDelay: "1.5s",
          }} />

          <div style={{
            position: "relative", maxWidth: "1280px", margin: "0 auto",
            padding: "64px 16px 80px",
          }} className="sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
            <div className="grid lg:grid-cols-2" style={{ display: "grid", gap: "48px", alignItems: "center" }}>
              {/* Left */}
              <div style={{ textAlign: "center" }} className="lg:text-left">
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "6px 16px", borderRadius: "999px",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  background: "rgba(99, 102, 241, 0.1)",
                  fontSize: "12px", fontWeight: 600, color: "#818cf8",
                }}>
                  <Sparkles size={14} />
                  Beta — 100% Free Forever
                </div>

                <h1 style={{
                  marginTop: "20px", fontSize: "44px", fontWeight: 900,
                  lineHeight: 1.05, letterSpacing: "-0.02em",
                }} className="sm:text-5xl lg:text-6xl">
                  <span className="ka-gradient-text">AI Video Creator that turns ideas into viral videos</span>
                </h1>

                <p style={{
                  marginTop: "20px", maxWidth: "560px", marginInline: "auto",
                  fontSize: "18px", color: "#9ca3af", lineHeight: 1.6,
                }} className="lg:mx-0">
                  Paste a link, drop a script, or upload a doc — Khalid-AI writes the script, generates the voiceover, designs the scenes, and renders a polished video in minutes.
                </p>

                <div style={{
                  marginTop: "32px", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "12px",
                }} className="sm:flex-row lg:justify-start">
                  <a
                    href="#cta"
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      gap: "8px", padding: "14px 24px", fontSize: "16px", fontWeight: 600,
                      color: "white", borderRadius: "12px",
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                      boxShadow: "0 0 60px -15px rgba(99, 102, 241, 0.6)",
                      transition: "transform 0.2s",
                      width: "100%",
                    }}
                    className="sm:w-auto hover:scale-105"
                  >
                    <Wand2 size={20} />
                    Create Video Now
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#how"
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      gap: "8px", padding: "14px 24px", fontSize: "16px", fontWeight: 600,
                      borderRadius: "12px", border: "1px solid #2d2d55", background: "#1a1a35",
                      width: "100%",
                    }}
                    className="sm:w-auto hover:opacity-80"
                  >
                    <Play size={16} />
                    Watch Demo
                  </a>
                </div>

                <p style={{ marginTop: "16px", fontSize: "12px", color: "#9ca3af" }}>
                  No credit card • Unlimited videos • Beta access
                </p>

                <div style={{
                  marginTop: "24px", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "12px",
                }} className="lg:justify-start">
                  <div style={{ display: "flex" }}>
                    {["from-indigo-500 to-purple-500", "from-pink-500 to-rose-500", "from-amber-500 to-orange-500", "from-emerald-500 to-teal-500"].map((g, i) => (
                      <div key={i} style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: `linear-gradient(to bottom right, ${g.includes("indigo") ? "#6366f1, #a855f7" : g.includes("pink") ? "#ec4899, #f43f5e" : g.includes("amber") ? "#f59e0b, #f97316" : "#10b981, #14b8a6"})`,
                        border: "2px solid #0f0f23",
                        marginLeft: i === 0 ? 0 : "-8px",
                      }} />
                    ))}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
                      ))}
                    </div>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>Trusted by 10M+ creators across 150+ countries</p>
                  </div>
                </div>
              </div>

              {/* Right - floating video previews */}
              <div style={{
                position: "relative", margin: "0 auto",
                height: "420px", maxWidth: "448px",
              }} className="lg:h-[500px]">
                <div className="ka-float sm:w-80" style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: "288px", transform: "translate(-50%, -50%)",
                }}>
                  <div style={{
                    borderRadius: "16px", overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                  }}>
                    <div style={{
                      position: "relative", aspectRatio: "9/16",
                      background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                    }}>
                      <div className="ka-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        gap: "12px", padding: "24px", textAlign: "center",
                      }}>
                        <div style={{
                          width: "56px", height: "56px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Play size={24} style={{ fill: "white", color: "white" }} />
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>AI Generated Video</p>
                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>4K • 0:30 • English</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ka-float-slow sm:w-40" style={{
                  position: "absolute", left: 0, top: "16px", width: "128px",
                }}>
                  <div style={{
                    borderRadius: "12px", overflow: "hidden",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                  }}>
                    <div style={{
                      aspectRatio: "16/9",
                      background: "linear-gradient(135deg, #ec4899, #f43f5e, #fb923c)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Sparkles size={24} color="white" />
                    </div>
                  </div>
                </div>

                <div className="ka-float sm:w-44" style={{
                  position: "absolute", bottom: "32px", right: 0, width: "144px",
                  animationDelay: "2s",
                }}>
                  <div style={{
                    borderRadius: "12px", overflow: "hidden",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                  }}>
                    <div style={{
                      aspectRatio: "1/1",
                      background: "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      gap: "4px",
                    }}>
                      <Sparkles size={20} color="white" />
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "white" }}>AI VOICE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 lg:px-8">
            <div style={{
              position: "relative", overflow: "hidden",
              borderRadius: "24px", border: "1px solid #2d2d55", background: "#1a1a35",
              padding: "40px",
            }} className="sm:p-10">
              <div className="ka-grid" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
              <div style={{
                position: "absolute", left: "-80px", top: "-80px",
                width: "240px", height: "240px", borderRadius: "50%",
                background: "#6366f1", opacity: 0.1, filter: "blur(80px)",
              }} />
              <div style={{
                position: "relative", display: "grid", gap: "24px",
                gridTemplateColumns: "repeat(2, 1fr)",
              }} className="lg:grid-cols-4">
                {stats.map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "40px", fontWeight: 900,
                      backgroundImage: `linear-gradient(to bottom right, ${s.g.includes("indigo") ? "#6366f1, #a855f7" : s.g.includes("purple") ? "#a855f7, #ec4899" : s.g.includes("pink") ? "#ec4899, #f43f5e" : "#f59e0b, #f97316"})`,
                      WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                    }} className="sm:text-5xl">
                      {s.value}
                    </div>
                    <p style={{ marginTop: "8px", fontSize: "14px", color: "#9ca3af" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" style={{ padding: "80px 0" }} className="sm:py-28">
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 lg:px-8">
            <div style={{ maxWidth: "672px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em" }} className="sm:text-4xl lg:text-5xl">
                Everything you need to make scroll-stopping videos
              </h2>
              <p style={{ marginTop: "16px", fontSize: "18px", color: "#9ca3af" }}>
                From idea to finished video — all powered by AI, in one place.
              </p>
            </div>

            <div style={{
              marginTop: "56px", display: "grid", gap: "20px",
              gridTemplateColumns: "repeat(1, 1fr)",
            }} className="sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div key={i} className="ka-card" style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "16px", padding: "24px", transition: "all 0.3s",
                }}>
                  <div style={{
                    position: "absolute", right: "-32px", top: "-32px",
                    width: "112px", height: "112px", borderRadius: "50%",
                    background: `linear-gradient(to bottom right, ${f.g.includes("indigo") ? "#6366f1, #a855f7" : f.g.includes("purple") ? "#a855f7, #ec4899" : f.g.includes("pink") ? "#ec4899, #f43f5e" : f.g.includes("amber") ? "#f59e0b, #f97316" : f.g.includes("emerald") ? "#10b981, #14b8a6" : "#06b6d4, #3b82f6"})`,
                    opacity: 0.1, filter: "blur(40px)",
                  }} />
                  <div style={{
                    display: "inline-flex", width: "48px", height: "48px",
                    alignItems: "center", justifyContent: "center",
                    borderRadius: "12px",
                    background: `linear-gradient(to bottom right, ${f.g.includes("indigo") ? "#6366f1, #a855f7" : f.g.includes("purple") ? "#a855f7, #ec4899" : f.g.includes("pink") ? "#ec4899, #f43f5e" : f.g.includes("amber") ? "#f59e0b, #f97316" : f.g.includes("emerald") ? "#10b981, #14b8a6" : "#06b6d4, #3b82f6"})`,
                    color: "white",
                  }}>
                    <f.icon size={24} />
                  </div>
                  <h3 style={{ marginTop: "16px", fontSize: "18px", fontWeight: 700 }}>{f.title}</h3>
                  <p style={{ marginTop: "8px", fontSize: "14px", color: "#9ca3af" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" style={{ padding: "80px 0", position: "relative" }} className="sm:py-28">
          <div style={{ position: "absolute", inset: 0, background: "rgba(26, 26, 53, 0.4)" }} />
          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 lg:px-8">
            <div style={{ maxWidth: "672px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em" }} className="sm:text-4xl lg:text-5xl">
                From idea to video in 3 steps
              </h2>
              <p style={{ marginTop: "16px", fontSize: "18px", color: "#9ca3af" }}>
                No editing skills required. The AI does the heavy lifting.
              </p>
            </div>

            <div style={{
              marginTop: "64px", display: "grid", gap: "32px",
              gridTemplateColumns: "repeat(1, 1fr)",
            }} className="md:grid-cols-3">
              {steps.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    position: "relative", margin: "0 auto",
                    width: "96px", height: "96px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      background: `linear-gradient(to bottom right, ${s.g.includes("indigo") ? "#6366f1, #a855f7" : s.g.includes("purple") ? "#a855f7, #ec4899" : "#ec4899, #f43f5e"})`,
                      opacity: 0.2, filter: "blur(40px)",
                    }} />
                    <div style={{
                      position: "relative", width: "80px", height: "80px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "16px",
                      background: `linear-gradient(to bottom right, ${s.g.includes("indigo") ? "#6366f1, #a855f7" : s.g.includes("purple") ? "#a855f7, #ec4899" : "#ec4899, #f43f5e"})`,
                      color: "white", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.4)",
                    }}>
                      <s.icon size={36} />
                    </div>
                    <div style={{
                      position: "absolute", right: "-4px", top: "-4px",
                      width: "28px", height: "28px", borderRadius: "50%",
                      border: "2px solid #0f0f23", background: "#1a1a35",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 900, color: "#818cf8",
                    }}>
                      {i + 1}
                    </div>
                  </div>
                  <h3 style={{ marginTop: "20px", fontSize: "20px", fontWeight: 700 }}>{s.title}</h3>
                  <p style={{ marginTop: "8px", maxWidth: "320px", marginInline: "auto", fontSize: "14px", color: "#9ca3af" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEMPLATES */}
        <section id="templates" style={{ padding: "80px 0" }} className="sm:py-28">
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 lg:px-8">
            <div style={{ textAlign: "center", maxWidth: "672px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em" }} className="sm:text-4xl lg:text-5xl">
                Start from a template that converts
              </h2>
              <p style={{ marginTop: "16px", fontSize: "18px", color: "#9ca3af" }}>
                Hand-picked templates for every platform and goal.
              </p>
            </div>

            <div style={{
              marginTop: "48px", display: "grid", gap: "16px",
              gridTemplateColumns: "repeat(2, 1fr)",
            }} className="sm:grid-cols-3 lg:grid-cols-4">
              {templates.map((tpl) => (
                <div key={tpl.id} className="ka-card" style={{
                  overflow: "hidden", borderRadius: "12px", transition: "all 0.3s",
                }}>
                  <div style={{
                    position: "relative", aspectRatio: "4/5",
                    background: tpl.g.includes("indigo") ? "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)"
                      : tpl.g.includes("pink") && tpl.g.includes("rose") && tpl.g.includes("orange") ? "linear-gradient(135deg, #ec4899, #f43f5e, #fb923c)"
                      : tpl.g.includes("red") ? "linear-gradient(135deg, #ef4444, #f43f5e, #ec4899)"
                      : tpl.g.includes("cyan") && tpl.g.includes("fuchsia") ? "linear-gradient(135deg, #22d3ee, #d946ef, #f43f5e)"
                      : tpl.g.includes("blue") && tpl.g.includes("violet") ? "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)"
                      : tpl.g.includes("sky") ? "linear-gradient(135deg, #0ea5e9, #3b82f6, #6366f1)"
                      : tpl.g.includes("emerald") ? "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)"
                      : "linear-gradient(135deg, #8b5cf6, #a855f7, #d946ef)",
                  }}>
                    <div className="ka-grid" style={{ position: "absolute", inset: 0, opacity: 0.2 }} />
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: "48px", fontWeight: 900, color: "rgba(255,255,255,0.95)" }}>
                        {tplIcons[tpl.icon] || "🎬"}
                      </span>
                    </div>
                    {tpl.popular && (
                      <div style={{
                        position: "absolute", left: "8px", top: "8px",
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        padding: "2px 8px", borderRadius: "999px",
                        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                        fontSize: "10px", fontWeight: 700, color: "white",
                      }}>
                        <Sparkles size={10} />
                        Popular
                      </div>
                    )}
                    <div style={{
                      position: "absolute", bottom: "8px", right: "8px",
                      display: "inline-flex", alignItems: "center", gap: "4px",
                      padding: "2px 8px", borderRadius: "999px",
                      background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                      fontSize: "10px", fontWeight: 500, color: "white",
                    }}>
                      <Clock size={10} />
                      {tpl.duration}
                    </div>
                  </div>
                  <div style={{ padding: "12px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tpl.name}</p>
                    <p style={{ marginTop: "2px", fontSize: "12px", color: "#9ca3af" }}>{tpl.cat}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <a href="#cta" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "8px",
                border: "1px solid #2d2d55", background: "#1a1a35",
                fontSize: "14px", fontWeight: 600, transition: "all 0.2s",
              }} className="hover:opacity-80">
                Browse all templates
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: "80px 0" }} className="sm:py-28">
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 lg:px-8">
            <div style={{ maxWidth: "672px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em" }} className="sm:text-4xl lg:text-5xl">
                Loved by creators and marketers
              </h2>
              <p style={{ marginTop: "16px", fontSize: "18px", color: "#9ca3af" }}>
                Real stories from the Khalid-AI community.
              </p>
            </div>

            <div style={{
              marginTop: "56px", display: "grid", gap: "20px",
              gridTemplateColumns: "repeat(1, 1fr)",
            }} className="sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((tm, i) => (
                <div key={i} className="ka-card" style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "16px", padding: "20px", transition: "all 0.3s",
                }}>
                  <Quote style={{
                    position: "absolute", right: "16px", top: "16px",
                    width: "32px", height: "32px", color: "rgba(99, 102, 241, 0.15)",
                  }} />
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[...Array(tm.rating)].map((_, j) => (
                      <Star key={j} size={16} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
                    ))}
                  </div>
                  <p style={{ marginTop: "16px", fontSize: "14px", lineHeight: 1.6 }}>
                    &ldquo;{tm.text}&rdquo;
                  </p>
                  <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `linear-gradient(to bottom right, ${tm.g.includes("pink") ? "#ec4899, #f43f5e" : tm.g.includes("indigo") ? "#6366f1, #a855f7" : tm.g.includes("amber") ? "#f59e0b, #f97316" : "#8b5cf6, #d946ef"})`,
                      color: "white", fontSize: "14px", fontWeight: 700,
                    }}>
                      {tm.avatar}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600 }}>{tm.name}</p>
                      <p style={{ fontSize: "12px", color: "#9ca3af" }}>{tm.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" style={{ padding: "80px 0" }} className="sm:py-28">
          <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 lg:px-8">
            <div style={{
              position: "relative", overflow: "hidden",
              borderRadius: "24px",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              background: "linear-gradient(135deg, rgba(99,102,241,0.15), #1a1a35, rgba(236,72,153,0.15))",
              padding: "32px", textAlign: "center",
            }} className="sm:p-14">
              <div className="ka-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
              <div className="ka-pulse" style={{
                position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
                width: "240px", height: "240px", borderRadius: "50%",
                background: "#6366f1", opacity: 0.25, filter: "blur(80px)",
              }} />
              <div style={{ position: "relative" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "4px 12px", borderRadius: "999px",
                  border: "1px solid rgba(99, 102, 241, 0.3)", background: "rgba(99, 102, 241, 0.1)",
                  fontSize: "12px", fontWeight: 600, color: "#818cf8",
                }}>
                  <Sparkles size={14} />
                  Beta — 100% Free Forever
                </div>
                <h2 style={{ marginTop: "20px", fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em" }} className="sm:text-4xl lg:text-5xl">
                  Ready to make your first AI video?
                </h2>
                <p style={{ marginTop: "16px", maxWidth: "560px", marginInline: "auto", fontSize: "18px", color: "#9ca3af" }}>
                  Join 10 million creators. It&apos;s free during Beta — no card, no limits.
                </p>
                <a
                  href="https://github.com/5halid-707/khalid-ai"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    gap: "8px", marginTop: "32px", padding: "14px 28px",
                    fontSize: "16px", fontWeight: 600, color: "white", borderRadius: "12px",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                    boxShadow: "0 0 60px -15px rgba(99, 102, 241, 0.6)",
                    transition: "transform 0.2s",
                  }}
                  className="hover:scale-105"
                >
                  <Wand2 size={20} />
                  Create Video Now
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{
        marginTop: "auto",
        borderTop: "1px solid #2d2d55",
        background: "#1a1a35",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 16px" }} className="sm:px-6 lg:px-8">
          <div style={{ display: "grid", gap: "32px", gridTemplateColumns: "repeat(2, 1fr)" }} className="md:grid-cols-6">
            <div style={{ gridColumn: "span 2" }} className="md:col-span-2">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative", width: "36px", height: "36px" }}>
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "12px",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "18px", fontWeight: 900, color: "white",
                  }}>K</div>
                </div>
                <span style={{ fontSize: "18px", fontWeight: 700 }}>Khalid-AI</span>
              </div>
              <p style={{ marginTop: "12px", maxWidth: "320px", fontSize: "14px", color: "#9ca3af" }}>
                AI-Powered Video Creation Platform
              </p>
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#9ca3af" }}>
                <p>
                  <span style={{ fontWeight: 600, color: "#f8f9ff" }}>Email:</span>{" "}
                  <a href={`mailto:${EMAIL}`} style={{ color: "#9ca3af" }} className="hover:!text-[#818cf8]">{EMAIL}</a>
                </p>
                <p>
                  <span style={{ fontWeight: 600, color: "#f8f9ff" }}>WhatsApp:</span>{" "}
                  <a href={WHATSAPP_LINK} style={{ color: "#9ca3af" }} className="hover:!text-[#818cf8]">{WHATSAPP}</a>
                </p>
              </div>
            </div>

            {[
              { title: "Product", links: ["Features", "Templates", "Create Video", "Dashboard"] },
              { title: "Company", links: ["About", "Contact", "Blog"] },
              { title: "Resources", links: ["Docs", "API", "Templates"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((c) => (
              <div key={c.title}>
                <h3 style={{ fontSize: "14px", fontWeight: 600 }}>{c.title}</h3>
                <ul style={{ marginTop: "12px", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" style={{ fontSize: "14px", color: "#9ca3af" }} className="hover:!text-white">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "40px", paddingTop: "24px",
            borderTop: "1px solid #2d2d55",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "space-between",
            gap: "16px",
          }} className="sm:flex-row">
            <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center" }} className="sm:text-left">
              © {new Date().getFullYear()} Khalid-AI. All rights reserved.<br />
              <span style={{ color: "#f8f9ff", opacity: 0.8 }}>Demo by Khalid Al-harbi — Cyber Security Expert</span>
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/5halid-707/khalid-ai" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Mail, label: "Email", href: `mailto:${EMAIL}` },
                { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP_LINK },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") || s.href.startsWith("mailto") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  style={{
                    display: "inline-flex", width: "36px", height: "36px",
                    alignItems: "center", justifyContent: "center",
                    borderRadius: "8px", border: "1px solid #2d2d55", background: "#0f0f23",
                    color: "#9ca3af", transition: "color 0.2s",
                  }}
                  className="hover:!text-[#818cf8]"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
