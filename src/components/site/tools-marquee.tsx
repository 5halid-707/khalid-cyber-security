const TOOLS = [
  {
    name: "Kali",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kali/kali-linux-wordmark.svg",
  },
  {
    name: "Python",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Cisco",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cisco/cisco-original.svg",
  },
  {
    name: "IBM",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg",
  },
  {
    name: "Flutter",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "MySQL",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "WordPress",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  {
    name: "Photoshop",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  },
  {
    name: "Premiere",
    type: "img",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg",
  },
];

export default function ToolsMarquee() {
  // Duplicate for seamless infinite scroll
  const loop = [...TOOLS, ...TOOLS];

  return (
    <section
      id="tools"
      className="relative py-12 bg-surface border-y border-edge overflow-hidden"
    >
      <p className="text-center font-mono text-xs text-fg/50 tracking-[0.3em] mb-6">
        {"// TECH STACK WE MASTER"}
      </p>
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-surface to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-surface to-transparent pointer-events-none" />

        <div className="flex gap-14 animate-marquee w-max items-center">
          {loop.map((tool, i) => (
            <div
              key={i}
              className="shrink-0 w-20 h-20 flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
              title={tool.name}
            >
              <img
                src={tool.src}
                alt={tool.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
