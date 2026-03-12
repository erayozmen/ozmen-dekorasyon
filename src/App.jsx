import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Hizmetler", "Projeler", "Hakkımızda", "İletişim"];

const SERVICES = [
  { id: "01", icon: "✦", title: "İç Mekan Tadilat", desc: "Duvar, tavan, zemin — tüm iç mekan dönüşümü. Konsept tasarımdan anahtar teslime.", color: "#C9A96E" },
  { id: "02", icon: "◈", title: "Boya & Dekorasyon", desc: "Dekoratif boya, doku efektleri, özel kaplama uygulamaları ve renk danışmanlığı.", color: "#B8956A" },
  { id: "03", icon: "⬡", title: "Banyo & Mutfak", desc: "Komple yenileme. Fayans, tesisat, mobilya montajı — lüks sonuçlar.", color: "#A07850" },
  { id: "04", icon: "◎", title: "Zemin & Parke", desc: "Laminat, masif ahşap, seramik ve granit döşeme. Kusursuz yüzeyler.", color: "#C9A96E" },
  { id: "05", icon: "◇", title: "Alçıpan & Asma Tavan", desc: "Modern asma tavan tasarımları, LED aydınlatma entegrasyonu ve ses yalıtımı.", color: "#B8956A" },
  { id: "06", icon: "✧", title: "Dış Cephe", desc: "Cephe boyama, mantolama, çevre düzenlemesi ve peyzaj uygulamaları.", color: "#A07850" },
];

const PROJECTS = [
  { title: "Merkez Rezidans", cat: "Komple Tadilat", year: "2024", span: "col-span-2 row-span-2", h: "h-full", bg: "from-stone-800 to-stone-600" },
  { title: "Süleymanpaşa Villa", cat: "İç Dekorasyon", year: "2024", span: "col-span-1 row-span-1", h: "h-64", bg: "from-amber-900 to-amber-700" },
  { title: "Barbaros Dairesi", cat: "Banyo & Mutfak", year: "2023", span: "col-span-1 row-span-1", h: "h-64", bg: "from-stone-700 to-stone-500" },
  { title: "Kapaklı Konut", cat: "Zemin Kaplama", year: "2023", span: "col-span-1 row-span-1", h: "h-64", bg: "from-amber-800 to-stone-600" },
  { title: "Çorlu Ofis", cat: "Ticari Tadilat", year: "2023", span: "col-span-1 row-span-1", h: "h-64", bg: "from-stone-600 to-amber-900" },
];

const STATS = [
  { num: "30+", label: "Yıl Deneyim" },
  { num: "280+", label: "Tamamlanan Proje" },
  { num: "100%", label: "Müşteri Memnuniyeti" },
  { num: "12", label: "Uzman Ekip" },
];

const REASONS = [
  { title: "Zamanında Teslimat", desc: "Her proje belirlenen süre ve bütçe dahilinde teslim edilir. Söz verilir, tutulur." },
  { title: "Kaliteli Malzeme", desc: "Yalnızca garantili, birinci sınıf markalar. Uzun ömürlü, sağlam işçilik." },
  { title: "Şeffaf Fiyat", desc: "Gizli maliyet yok. Baştan net teklif — son fatura aynı rakam." },
  { title: "Tekirdağ'a Özel", desc: "30 yıldan fazladır aynı hizmet, aynı kalitede. Her mahalleyi, her evi tanıyoruz." },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return { pos, hovered, setHovered };
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  const isMobile = window.innerWidth < 900;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isMobile ? 1 : (inView ? 1 : 0),
        transform: isMobile ? "none" : (inView ? "translateY(0)" : "translateY(40px)"),
        transition: isMobile ? "none" : `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const scrollY = useScrollY();
  const { pos, hovered, setHovered } = useCursor();
  const [activeService, setActiveService] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const heroRef = useRef(null);

  const navBg = scrollY > 60;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = `🏠 Yeni Teklif Talebi!\n\n👤 Ad Soyad: ${formState.name}\n📞 Telefon: ${formState.phone}\n🔧 Hizmet: ${formState.service}\n💬 Mesaj: ${formState.message}`;
    await fetch(`https://api.telegram.org/bot8474339486:AAHN9_XiLt7UlvQOUknSIfsXTYBMcq9zC6E/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: 7782912534, text }),
    });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormState({ name: "", phone: "", service: "", message: "" }); }, 3500);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0D0C0A", color: "#F5F0E8", overflowX: "hidden", cursor: "none" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Custom Cursor */}
      <div style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        left: pos.x, top: pos.y,
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s, height 0.2s, background 0.2s",
        width: hovered ? 48 : 12,
        height: hovered ? 48 : 12,
        borderRadius: "50%",
        background: hovered ? "rgba(201,169,110,0.3)" : "#C9A96E",
        border: hovered ? "1px solid #C9A96E" : "none",
        mixBlendMode: "difference",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "1.4rem 5%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: navBg ? "rgba(13,12,10,0.92)" : "transparent",
        backdropFilter: navBg ? "blur(20px)" : "none",
        borderBottom: navBg ? "1px solid rgba(201,169,110,0.15)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", letterSpacing: "2px", color: "#F5F0E8" }}>
          ÖZMEN <span style={{ color: "#C9A96E" }}>DEKORASYON</span>

        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
          className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <button key={link}
onClick={() => {
  const idMap = {
    "hizmetler": "hizmetler",
    "projeler": "projeler",
    "hakkımızda": "hakkımızda",
    "i̇letişim": "iletişim",
    "iletişim": "iletişim",
  };
  const key = link.toLowerCase();
  document.getElementById(idMap[key] || key)?.scrollIntoView({ behavior: "smooth" });
  setMenuOpen(false);
}}              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                background: "none", border: "none", cursor: "none",
                color: "rgba(245,240,232,0.55)", fontSize: ".78rem",
                letterSpacing: "2.5px", textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                transition: "color 0.2s", padding: "0.2rem 0",
              }}
              onFocus={e => e.target.style.color = "#C9A96E"}
              onBlur={e => e.target.style.color = "rgba(245,240,232,0.55)"}
              onMouseOver={e => e.target.style.color = "#C9A96E"}
              onMouseOut={e => e.target.style.color = "rgba(245,240,232,0.55)"}
            >{link}</button>
          ))}
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => scrollTo("iletişim")}
            style={{
              background: "#C9A96E", color: "#0D0C0A", border: "none",
              padding: ".6rem 1.6rem", fontSize: ".75rem",
              letterSpacing: "2px", textTransform: "uppercase",
              fontWeight: 600, cursor: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseOver={e => { e.target.style.background = "#F5F0E8"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.target.style.background = "#C9A96E"; e.target.style.transform = "translateY(0)"; }}
          >Teklif Al</button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "none", display: "none", flexDirection: "column", gap: 5 }}
          className="hamburger-btn">
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: 24, height: 1.5, background: "#F5F0E8", display: "block",
              transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1, transition: "all 0.3s" }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "#0D0C0A",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2.5rem",
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())}
              style={{ background: "none", border: "none", color: "#F5F0E8", fontSize: "2rem", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif" }}>
              {link}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
<section ref={heroRef} id="anasayfa" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
          opacity: 0.4, pointerEvents: "none",
        }} />

        {/* Animated gradient bg */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(107,79,58,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(201,169,110,0.12) 0%, transparent 50%), #0D0C0A",
          transform: `translateY(${scrollY * 0.3}px)`,
        }} />

        {/* Geometric lines */}
       <svg style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "50%", opacity: 0.06 }} viewBox="0 0 500 800" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="0" x2="500" y2="800" stroke="#C9A96E" strokeWidth="1" />
          <line x1="100" y1="0" x2="600" y2="800" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="700" y2="800" stroke="#C9A96E" strokeWidth="0.5" />
          <circle cx="400" cy="300" r="200" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <circle cx="400" cy="300" r="150" stroke="#C9A96E" strokeWidth="0.3" fill="none" />
        </svg>

        <div style={{ position: "relative", zIndex: 2, padding: "8rem 8% 6rem", width: "100%" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "1rem",
            marginBottom: "2.5rem",
            animation: "fadeUp 0.8s ease both",
          }}>
            <div style={{ width: 40, height: 1, background: "#C9A96E" }} />
            <span style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E", fontWeight: 500 }}>
              Yaşam Alanınızı Güzelleştiriyoruz
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: "-1px",
            marginBottom: "2rem",
            animation: "fadeUp 0.8s 0.15s ease both",
          }}>
            30 Yıllık Tecrübesiyle <br />
            <em style={{ color: "#C9A96E", fontStyle: "italic" }}>Tekirdağ'ın Güvenilir Firması</em>
          </h1>

          <p style={{
            fontSize: "1.05rem", lineHeight: 1.9,
            color: "rgba(245,240,232,0.5)", maxWidth: 480,
            marginBottom: "3.5rem",
            animation: "fadeUp 0.8s 0.3s ease both",
            fontWeight: 300,
          }}>
            Dekorasyon, tadilat ve iç mekan yenileme. Her projede usta işçilik, kaliteli malzeme ve zamanında teslimat.
          </p>

          <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", animation: "fadeUp 0.8s 0.45s ease both" }}>
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => scrollTo("iletişim")}
              style={{
                background: "#C9A96E", color: "#0D0C0A",
                border: "none", padding: "1rem 2.5rem",
                fontSize: ".78rem", letterSpacing: "2.5px",
                textTransform: "uppercase", fontWeight: 600,
                cursor: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.25s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.transform = "translateY(0)"; }}
            >Ücretsiz Keşif</button>
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => scrollTo("projeler")}
              style={{
                background: "transparent", color: "#F5F0E8",
                border: "1px solid rgba(245,240,232,0.2)", padding: "1rem 2.5rem",
                fontSize: ".78rem", letterSpacing: "2.5px",
                textTransform: "uppercase", fontWeight: 500,
                cursor: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.25s",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)"; e.currentTarget.style.color = "#F5F0E8"; }}
            >Projelerimiz ↓</button>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "flex", gap: "4rem", marginTop: "6rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(201,169,110,0.15)",
            flexWrap: "wrap",
            animation: "fadeUp 0.8s 0.6s ease both",
          }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", color: "#C9A96E", lineHeight: 1, fontWeight: 300 }}>{s.num}</div>
                <div style={{ fontSize: ".68rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginTop: ".4rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem",
          animation: "fadeUp 1s 1s ease both",
        }}>
          <div style={{ fontSize: ".6rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>Keşfet</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #C9A96E, transparent)" }} />
        </div>
      </section>

      {/* HİZMETLER */}
      <section id="hizmetler" style={{ padding: "8rem 8%", background: "#0D0C0A" }}>
        <AnimatedSection style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 30, height: 1, background: "#C9A96E" }} />
            <span style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E" }}>Ne Yapıyoruz</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, lineHeight: 1.15 }}>
            Uzmanlaştığımız<br /><em style={{ color: "#C9A96E", fontStyle: "italic" }}>Hizmetler</em>
          </h2>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "rgba(201,169,110,0.08)" }}>
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 0.08}>
              <div
                onMouseEnter={() => { setActiveService(i); setHovered(true); }}
                onMouseLeave={() => { setActiveService(null); setHovered(false); }}
                style={{
                  padding: "3rem 2.5rem",
                  background: activeService === i ? "rgba(201,169,110,0.07)" : "#0D0C0A",
                  transition: "background 0.35s",
                  cursor: "none",
                  position: "relative",
                  overflow: "hidden",
                }}>
                {/* Hover line */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0,
                  width: activeService === i ? "100%" : "0%",
                  height: 1, background: "#C9A96E",
                  transition: "width 0.4s ease",
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                  <span style={{ fontSize: "1.8rem", color: s.color, opacity: 0.8 }}>{s.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", color: "rgba(201,169,110,0.08)", lineHeight: 1 }}>{s.id}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, marginBottom: "1rem", color: "#F5F0E8" }}>{s.title}</h3>
                <p style={{ fontSize: ".88rem", lineHeight: 1.8, color: "rgba(245,240,232,0.45)", fontWeight: 300 }}>{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* PROJELER */}
      <section id="projeler" style={{ padding: "8rem 8%", background: "#111009" }}>
        <AnimatedSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 30, height: 1, background: "#C9A96E" }} />
                <span style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E" }}>Referanslarımız</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300 }}>
                Tamamlanan<br /><em style={{ color: "#C9A96E", fontStyle: "italic" }}>Projeler</em>
              </h2>
            </div>
            <p style={{ color: "rgba(245,240,232,0.4)", maxWidth: 320, lineHeight: 1.8, fontSize: ".9rem" }}>
              Tekirdağ ve çevresinde 280'den fazla başarılı projeyi teslim ettik.
            </p>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 260px)", gap: 6 }}>
          {PROJECTS.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.1}
              className={p.span}
              style={{ gridColumn: i === 0 ? "span 2" : "span 1", gridRow: i === 0 ? "span 2" : "span 1" }}>
              <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  height: "100%", minHeight: i === 0 ? 526 : 260,
                  background: `linear-gradient(160deg, ${p.bg.includes("stone-800") ? "#44403c, #292524" : p.bg.includes("amber-900") ? "#78350f, #451a03" : p.bg.includes("stone-700") ? "#44403c, #1c1917" : p.bg.includes("amber-800") ? "#92400e, #44403c" : "#57534e, #78350f"})`,
                  position: "relative", overflow: "hidden", cursor: "none",
                  display: "flex", alignItems: "flex-end",
                }}>
                {/* Overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,12,10,0.85) 0%, transparent 50%)" }} />
                {/* Texture */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.1,
                  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)" }} />
                <div style={{ position: "relative", padding: "1.5rem 2rem" }}>
                  <div style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase", color: "#C9A96E", marginBottom: ".5rem" }}>{p.cat} · {p.year}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: i === 0 ? "1.8rem" : "1.3rem", fontWeight: 400 }}>{p.title}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* HAKKIMIZDA */}
<section id="hakkımızda" style={{ padding: "8rem 8%", background: "#0D0C0A" }}>
  <AnimatedSection>
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ width: 30, height: 1, background: "#C9A96E" }} />
      <span style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E" }}>Biz Kimiz</span>
    </div>
    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "5rem" }}>
      Özmen Dekorasyon<br /><em style={{ color: "#C9A96E", fontStyle: "italic" }}>Hakkımızda</em>
    </h2>
  </AnimatedSection>

  {/* Hikaye */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center", marginBottom: "6rem" }}>
    <AnimatedSection>
      <div style={{ borderLeft: "2px solid #C9A96E", paddingLeft: "2rem", marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontStyle: "italic", color: "rgba(245,240,232,0.7)", lineHeight: 1.6 }}>
          "1995'ten bu yana inşaat ve dekorasyon sektöründeyiz. Her projede aynı özen, aynı kalite."
        </p>
      </div>
      <p style={{ color: "rgba(245,240,232,0.5)", lineHeight: 1.9, fontSize: ".95rem", fontWeight: 300, marginBottom: "1.5rem" }}>
        Müteahhitlik ile başladığımız yolculuğumuzda büyük hastane projeleri, konut kompleksleri ve ticari yapılar inşa ettik. Yıllar içinde edindiğimiz deneyimi A'dan Z'ye tadilat ve dekorasyon hizmetine taşıdık.
      </p>
      <p style={{ color: "rgba(245,240,232,0.5)", lineHeight: 1.9, fontSize: ".95rem", fontWeight: 300 }}>
        Bugün Tekirdağ'da her ölçekten projede — küçük bir banyo yenilemesinden komple daire tadilatına — aynı profesyonellik ve titizlikle hizmet veriyoruz.
      </p>
    </AnimatedSection>

    {/* Zaman çizelgesi */}
    <AnimatedSection delay={0.2}>
      {[
        { year: "1995", title: "Kuruluş", desc: "Müteahhitlik ve kaba inşaat işleriyle sektöre giriş." },
        { year: "2000", title: "Büyük Projeler", desc: "Hastane ve konut kompleksleri — binlerce metrekare deneyim." },
        { year: "2010", title: "Tadilat & Dekorasyon", desc: "A'dan Z'ye tadilat hizmetine geçiş, ekip genişlemesi." },
        { year: "2020", title: "Tekirdağ'ın Dekorasyon Firması", desc: "Tamamlanan birçok proje, 100% müşteri memnuniyeti." },
      ].map((t, i) => (
        <div key={t.year} style={{ display: "flex", gap: "2rem", marginBottom: "2rem", alignItems: "flex-start" }}>
          <div style={{ minWidth: 60 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#C9A96E", fontWeight: 400 }}>{t.year}</div>
          </div>
          <div style={{ paddingLeft: "1.5rem", borderLeft: "1px solid rgba(201,169,110,0.2)", flex: 1 }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", marginBottom: ".4rem" }}>{t.title}</h4>
            <p style={{ fontSize: ".85rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.7 }}>{t.desc}</p>
          </div>
        </div>
      ))}
    </AnimatedSection>
  </div>

  {/* Uzmanlık alanları */}
  <AnimatedSection>
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
      <div style={{ width: 30, height: 1, background: "#C9A96E" }} />
      <span style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E" }}>Uzmanlık Alanlarımız</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(201,169,110,0.08)", marginBottom: "6rem" }}>
      {["Tesisat", "Boya & Badana", "Sıva & Alçı", "Kaba İnşaat", "Fayans & Seramik", "Banyo Yenileme", "Alçıpan & Asma Tavan", "Zemin Kaplama"].map((alan, i) => (
        <div key={alan} style={{ padding: "1.5rem 2rem", background: "#0D0C0A", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "#C9A96E", fontSize: ".8rem" }}>✦</span>
          <span style={{ fontSize: ".9rem", color: "rgba(245,240,232,0.7)" }}>{alan}</span>
        </div>
      ))}
    </div>
  </AnimatedSection>

  {/* Hizmet bölgesi */}
  <AnimatedSection delay={0.1}>
    <div style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.15)", padding: "3rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
      <div>
        <div style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1rem" }}>Hizmet Bölgemiz</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300 }}>Tekirdağ Merkez</h3>
        <p style={{ color: "rgba(245,240,232,0.45)", marginTop: ".8rem", fontSize: ".9rem" }}>Tüm merkez mahallelerde hızlı ve güvenilir hizmet.</p>
      </div>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => scrollTo("iletişim")}
        style={{ background: "#C9A96E", color: "#0D0C0A", border: "none", padding: "1rem 2.5rem", fontSize: ".78rem", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, cursor: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s" }}
        onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseOut={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.transform = "translateY(0)"; }}
      >Teklif Al →</button>
    </div>
  </AnimatedSection>
</section>
      {/* CTA BAND */}
      <div style={{
        padding: "6rem 8%",
        background: "linear-gradient(135deg, #1a1208 0%, #2a1f0e 50%, #1a1208 100%)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,169,110,0.12) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <p style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1.5rem" }}>Projeniz Hazır mı?</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 300, marginBottom: "3rem" }}>
              Hayalinizdeki Mekânı<br /><em style={{ fontStyle: "italic", color: "#C9A96E" }}>Birlikte Yapalım</em>
            </h2>
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => scrollTo("iletişim")}
              style={{
                background: "#C9A96E", color: "#0D0C0A",
                border: "none", padding: "1.1rem 3rem",
                fontSize: ".8rem", letterSpacing: "2.5px",
                textTransform: "uppercase", fontWeight: 700,
                cursor: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.25s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.transform = "translateY(0)"; }}
            >Ücretsiz Keşif Randevusu Al →</button>
          </AnimatedSection>
        </div>
      </div>

      {/* İLETİŞİM */}
      <section id="iletişim" style={{ padding: "8rem 8%", background: "#0D0C0A", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "6rem" }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 30, height: 1, background: "#C9A96E" }} />
            <span style={{ fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E" }}>İletişim</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.2, marginBottom: "3rem" }}>
            Projeniz İçin<br /><em style={{ color: "#C9A96E", fontStyle: "italic" }}>Teklif Alın</em>
          </h2>

          {[
            { icon: "◎", label: "Konum", val: "Tekirdağ, Türkiye" },
            { icon: "◇", label: "Telefon", val: "0552 950 41 54" },
            { icon: "✦", label: "Çalışma Saatleri", val: "Haftanın Her Günü · 08:00–20:00" },
            { icon: "◈", label: "WhatsApp", val: <a href="https://wa.me/905529504154" target="_blank" rel="noopener noreferrer" style={{ color: "#F5F0E8", textDecoration: "none" }}>Hızlı yanıt için yazın →</a> },
          ].map((c) => (
            <div key={c.label} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2rem" }}>
              <div style={{
                width: 44, height: 44, border: "1px solid rgba(201,169,110,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#C9A96E", fontSize: "1rem", flexShrink: 0,
              }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: ".4rem" }}>{c.label}</div>
                <div style={{ fontSize: ".95rem", color: "#F5F0E8" }}>{c.val}</div>
              </div>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1.5rem" }}>
              <div style={{ fontSize: "3rem", color: "#C9A96E" }}>✦</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300 }}>Talebiniz Alındı</h3>
              <p style={{ color: "rgba(245,240,232,0.45)", textAlign: "center" }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
            </div>
          ) : (
              <form onSubmit={handleSubmit} action="mailto:erayozmn@gmail.com" method="GET" encType="text/plain" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                { label: "Adınız Soyadınız", key: "name", type: "text", ph: "Ad Soyad" },
                { label: "Telefon Numaranız", key: "phone", type: "tel", ph: "05XX XXX XX XX" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", display: "block", marginBottom: ".6rem" }}>{f.label}</label>
                  <input
                    type={f.type} placeholder={f.ph}
                    value={formState[f.key]}
                    onChange={e => setFormState(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: "100%", background: "rgba(245,240,232,0.04)",
                      border: "1px solid rgba(201,169,110,0.18)",
                      padding: ".9rem 1.2rem", color: "#F5F0E8",
                      fontFamily: "'DM Sans', sans-serif", fontSize: ".9rem",
                      outline: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#C9A96E"}
                    onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.18)"}
                  />
                </div>
              ))}

              <div>
                <label style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", display: "block", marginBottom: ".6rem" }}>Hizmet Türü</label>
                <select
                  value={formState.service}
                  onChange={e => setFormState(p => ({ ...p, service: e.target.value }))}
                  style={{
                    width: "100%", background: "#1a1810",
                    border: "1px solid rgba(201,169,110,0.18)",
                    padding: ".9rem 1.2rem", color: formState.service ? "#F5F0E8" : "rgba(245,240,232,0.3)",
                    fontFamily: "'DM Sans', sans-serif", fontSize: ".9rem", outline: "none",
                    appearance: "none", cursor: "none",
                  }}>
                  <option value="">Seçiniz...</option>
                  {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", display: "block", marginBottom: ".6rem" }}>Mesajınız</label>
                <textarea
                  placeholder="Projeniz hakkında kısaca bilgi verir misiniz?"
                  value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  rows={5}
                  style={{
                    width: "100%", background: "rgba(245,240,232,0.04)",
                    border: "1px solid rgba(201,169,110,0.18)",
                    padding: ".9rem 1.2rem", color: "#F5F0E8",
                    fontFamily: "'DM Sans', sans-serif", fontSize: ".9rem",
                    outline: "none", resize: "vertical", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#C9A96E"}
                  onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.18)"}
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  background: "#C9A96E", color: "#0D0C0A",
                  border: "none", padding: "1.1rem 2.5rem",
                  fontSize: ".78rem", letterSpacing: "2.5px",
                  textTransform: "uppercase", fontWeight: 700,
                  cursor: "none", fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.25s", alignSelf: "flex-start",
                  marginTop: ".5rem",
                }}
                onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.transform = "translateY(0)"; }}
              >Teklif İste →</button>
            </form>
          )}
        </AnimatedSection>
      </section>

{/* Mobil sabit butonlar */}
<div style={{
  position: "fixed", bottom: "1.5rem", right: "1.5rem",
  display: "flex", flexDirection: "column", gap: "0.8rem",
  zIndex: 999,
}}>
  <a href="tel:+905529504154"
    style={{
      width: 52, height: 52, borderRadius: "50%",
      background: "#C9A96E", display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 20px rgba(201,169,110,0.4)",
      fontSize: "1.3rem", textDecoration: "none",
    }}>📞</a>
  <a href="https://wa.me/905529504154" target="_blank" rel="noopener noreferrer"
    style={{
      width: 52, height: 52, borderRadius: "50%",
      background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
      fontSize: "1.3rem", textDecoration: "none",
    }}>💬</a>
</div>
      {/* FOOTER */}
      <footer style={{
        padding: "3rem 8%",
        borderTop: "1px solid rgba(201,169,110,0.12)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem",
        background: "#0a0908",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", letterSpacing: "2px" }}>
          ÖZMEN <span style={{ color: "#C9A96E" }}>DEKORASYON</span>

        </div>
        <p style={{ fontSize: ".75rem", color: "rgba(245,240,232,0.25)", letterSpacing: "1px" }}>
          © 2020 Özmen Dekorasyon · Tekirdağ
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l}
onClick={() => {
  const idMap = { "hakkımızda": "hakkımızda", "iletişim": "iletişim", "i̇letişim": "iletişim" };
  const key = l.toLowerCase();
  document.getElementById(idMap[key] || key)?.scrollIntoView({ behavior: "smooth" });
}}              style={{ background: "none", border: "none", color: "rgba(245,240,232,0.3)", fontSize: ".75rem", cursor: "none", letterSpacing: "1px",
                transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}
              onMouseOver={e => e.target.style.color = "#C9A96E"}
              onMouseOut={e => e.target.style.color = "rgba(245,240,232,0.3)"}
            >{l}</button>
          ))}
        </div>
      </footer>

      <style>{`
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(35px); }
    to { opacity: 1; transform: translateY(0); }
  }
  * { cursor: none !important; }

  @media (max-width: 900px) {
    * { cursor: auto !important; }

    .desktop-nav { display: none !important; }
    .hamburger-btn { display: flex !important; }

    /* Hero */
    section[id="anasayfa"] {
      grid-template-columns: 1fr !important;
    }
    section[id="anasayfa"] > div:last-of-type {
      display: none !important;
    }

    /* Genel section padding */
    section, div[style*="padding: 8rem"] {
      padding-left: 6% !important;
      padding-right: 6% !important;
      padding-top: 5rem !important;
      padding-bottom: 5rem !important;
    }

    /* Grid'leri tek kolona al */
    section[id="hizmetler"] > div:last-child,
    section[id="hakkımızda"] > div[style*="grid-template-columns: 1fr 1fr"],
    section[id="iletişim"] {
      grid-template-columns: 1fr !important;
      gap: 2.5rem !important;
    }

    /* Projeler grid */
    section[id="projeler"] > div:last-child {
      grid-template-columns: 1fr 1fr !important;
      grid-template-rows: auto !important;
    }
    section[id="projeler"] > div:last-child > div {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }
    section[id="projeler"] > div:last-child > div > div {
      min-height: 200px !important;
    }

    /* Hakkımızda zaman çizelgesi */
    section[id="hakkımızda"] > div[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }

    /* Stats bar */
    div[style*="gap: 4rem"][style*="borderTop"] {
      gap: 1.5rem !important;
    }

    /* CTA band */
    div[style*="linear-gradient(135deg"] {
      padding: 4rem 6% !important;
    }

    /* Footer */
    footer {
      flex-direction: column !important;
      text-align: center !important;
      padding: 2.5rem 6% !important;
    }
    footer > div:last-child {
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 1rem !important;
    }

    /* Hizmet bölgesi kutusu */
    div[style*="padding: 3rem 4rem"] {
      padding: 2rem !important;
      flex-direction: column !important;
    }

    /* Hero stats */
    div[style*="gap: 4rem"][style*="marginTop: 6rem"] {
      gap: 1.5rem !important;
      margin-top: 3rem !important;
    }
  }

  @media (max-width: 480px) {
    section[id="projeler"] > div:last-child {
      grid-template-columns: 1fr !important;
    }
    section[id="projeler"] > div:last-child > div > div {
      min-height: 180px !important;
    }
  }
`}</style>
    </div>
  );
}
