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
  { title: "Merkez Rezidans", cat: "Komple Tadilat", year: "2024", bg: "#44403c, #292524", big: true },
  { title: "Süleymanpaşa Villa", cat: "İç Dekorasyon", year: "2024", bg: "#78350f, #451a03", big: false },
  { title: "Barbaros Dairesi", cat: "Banyo & Mutfak", year: "2023", bg: "#44403c, #1c1917", big: false },
  { title: "Kapaklı Konut", cat: "Zemin Kaplama", year: "2023", bg: "#92400e, #44403c", big: false },
  { title: "Çorlu Ofis", cat: "Ticari Tadilat", year: "2023", bg: "#57534e, #78350f", big: false },
];

const STATS = [
  { num: "30+", label: "Yıl Deneyim" },
  { num: "300+", label: "Tamamlanan Proje" },
  { num: "100%", label: "Müşteri Memnuniyeti" },
  { num: "12", label: "Uzman Ekip" },
];

const TRUST_ITEMS = [
  { icon: "✔", title: "Ücretsiz Keşif", desc: "Projenizi yerinde inceliyoruz" },
  { icon: "✔", title: "Zamanında Teslim", desc: "Söz verilen tarihte teslim" },
  { icon: "✔", title: "Usta İşçilik", desc: "30+ yıllık deneyimli ekip" },
  { icon: "✔", title: "Kaliteli Malzeme", desc: "Garantili, birinci sınıf ürünler" },
];

const BEFORE_AFTER = [
  { title: "Salon Yenileme", desc: "Komple iç mekan dönüşümü", beforeBg: "#2a2520", afterBg: "#5c4033" },
  { title: "Banyo Tadilat", desc: "Modern banyo yenileme", beforeBg: "#1c1917", afterBg: "#78350f" },
  { title: "Mutfak Dekorasyon", desc: "Mutfak yenileme projesi", beforeBg: "#292524", afterBg: "#44403c" },
];

const REVIEWS = [
  { name: "Ahmet Y.", text: "Evimizin tadilatını yaptılar, çok memnun kaldık. İşçilikleri gerçekten kaliteli.", stars: 5 },
  { name: "Fatma K.", text: "Zamanında teslim ettiler, fiyat performans çok iyi. Kesinlikle tavsiye ederim.", stars: 5 },
  { name: "Mehmet S.", text: "Banyomuzun tadilatını yaptırdık, sonuç muhteşem. Teşekkürler Özmen Dekorasyon!", stars: 5 },
  { name: "Ayşe T.", text: "Profesyonel ekip, temiz çalışma. Her şey söylendiği gibi oldu.", stars: 5 },
];

const EXPERTISE = ["Tesisat", "Boya & Badana", "Sıva & Alçı", "Kaba İnşaat", "Fayans & Seramik", "Banyo Yenileme", "Alçıpan & Asma Tavan", "Zemin Kaplama"];

const TIMELINE = [
  { year: "1995", title: "Kuruluş", desc: "Müteahhitlik ve kaba inşaat işleriyle sektöre giriş." },
  { year: "2000", title: "Büyük Projeler", desc: "Hastane ve konut kompleksleri — binlerce metrekare deneyim." },
  { year: "2010", title: "Tadilat & Dekorasyon", desc: "A'dan Z'ye tadilat hizmetine geçiş, ekip genişlemesi." },
  { year: "2020", title: "Tekirdağ'ın Firması", desc: "300+ tamamlanan proje, %100 müşteri memnuniyeti." },
];

const G = "#C9A96E";
const BG = "#0D0C0A";
const BG2 = "#111009";

const inputStyle = {
  width: "100%",
  background: "rgba(245,240,232,0.04)",
  border: "1px solid rgba(201,169,110,0.2)",
  padding: "0.85rem 1rem",
  color: "#F5F0E8",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "16px",
  outline: "none",
  borderRadius: 0,
  transition: "border-color 0.2s",
  WebkitAppearance: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: ".6rem",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "rgba(245,240,232,0.35)",
  display: "block",
  marginBottom: ".45rem",
};

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return { pos, hovered, setHovered };
}

function useInView(threshold = 0.1) {
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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;
  return (
    <div ref={ref} className={className} style={{
      opacity: isMobile ? 1 : (inView ? 1 : 0),
      transform: isMobile ? "none" : (inView ? "translateY(0)" : "translateY(28px)"),
      transition: isMobile ? "none" : `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const scrollY = useScrollY();
  const { pos, hovered, setHovered } = useCursor();
  const [activeService, setActiveService] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", phone: "", city: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const navBg = scrollY > 60;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = `🏠 Yeni Teklif Talebi!\n\n👤 Ad Soyad: ${formState.name}\n📞 Telefon: ${formState.phone}\n📍 İl/İlçe: ${formState.city}\n🔧 Hizmet: ${formState.service}\n💬 Mesaj: ${formState.message}`;
    await fetch(`https://api.telegram.org/bot8474339486:AAHN9_XiLt7UlvQOUknSIfsXTYBMcq9zC6E/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: 7782912534, text }),
    });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormState({ name: "", phone: "", city: "", service: "", message: "" }); }, 3500);
  };

  const scrollTo = (id) => {
    const map = { "hizmetler": "hizmetler", "projeler": "projeler", "hakkımızda": "hakkımızda", "i̇letişim": "iletişim", "iletişim": "iletişim" };
    document.getElementById(map[id.toLowerCase()] || id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: BG, color: "#F5F0E8", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={{ display: "none" }}>Özmen Dekorasyon olarak Tekirdağ, Çorlu, Çerkezköy ve çevresinde iç mekan dekorasyon, anahtar teslim tadilat ve yenileme hizmetleri sunuyoruz.</div>

      {/* Custom Cursor */}
      <div className="custom-cursor" style={{ position: "fixed", zIndex: 9999, pointerEvents: "none", left: pos.x, top: pos.y, transform: "translate(-50%,-50%)", transition: "width .2s,height .2s", width: hovered ? 44 : 10, height: hovered ? 44 : 10, borderRadius: "50%", background: hovered ? "rgba(201,169,110,0.25)" : G, border: hovered ? `1px solid ${G}` : "none", mixBlendMode: "difference" }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "1.1rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", background: navBg ? "rgba(13,12,10,0.95)" : "transparent", backdropFilter: navBg ? "blur(20px)" : "none", borderBottom: navBg ? "1px solid rgba(201,169,110,0.12)" : "none", transition: "all .4s ease" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", letterSpacing: "2px" }}>
          ÖZMEN <span style={{ color: G }}>DEKORASYON</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
              style={{ background: "none", border: "none", cursor: "none", color: "rgba(245,240,232,0.55)", fontSize: ".73rem", letterSpacing: "2.5px", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, transition: "color .2s" }}
              onMouseOver={e => e.target.style.color = G} onMouseOut={e => e.target.style.color = "rgba(245,240,232,0.55)"}
            >{l}</button>
          ))}
          <button onClick={() => scrollTo("iletişim")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{ background: G, color: BG, border: "none", padding: ".52rem 1.3rem", fontSize: ".72rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, cursor: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .2s" }}
            onMouseOver={e => { e.target.style.background = "#F5F0E8"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.target.style.background = G; e.target.style.transform = "translateY(0)"; }}
          >Teklif Al</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn"
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: "8px 6px" }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ width: 22, height: 1.5, background: "#F5F0E8", display: "block", transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none", opacity: menuOpen && i===1 ? 0 : 1, transition: "all .3s" }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: BG, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1.8rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ background: "none", border: "none", color: "#F5F0E8", fontSize: "1.8rem", cursor: "pointer", fontFamily: "'Cormorant Garamond',serif", padding: ".4rem 2rem", minHeight: 52 }}>
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo("iletişim")}
            style={{ background: G, color: BG, border: "none", padding: "1rem 2.5rem", fontSize: ".88rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, marginTop: ".8rem", letterSpacing: "2px", textTransform: "uppercase", minHeight: 52 }}>
            Teklif Al
          </button>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section id="anasayfa" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
<div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,12,10,0.82) 0%, rgba(26,18,8,0.75) 40%, rgba(42,31,14,0.70) 70%, rgba(13,12,10,0.88) 100%)" }} />        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 60% 40%,rgba(201,169,110,0.13) 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 20% 80%,rgba(107,79,58,0.16) 0%,transparent 50%)", transform: `translateY(${scrollY * 0.12}px)` }} />
        <svg className="hero-svg" style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "55%", opacity: 0.04 }} viewBox="0 0 500 800" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="0" x2="500" y2="800" stroke={G} strokeWidth="1" />
          <line x1="100" y1="0" x2="600" y2="800" stroke={G} strokeWidth="0.5" />
          <circle cx="400" cy="300" r="250" stroke={G} strokeWidth="0.5" fill="none" />
          <circle cx="400" cy="300" r="160" stroke={G} strokeWidth="0.3" fill="none" />
        </svg>

        <div className="hero-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
          {/* Sol metin */}
          <div className="hero-content" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "7.5rem 5% 5rem 8%" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".8rem", marginBottom: "1rem", animation: "fadeUp .8s ease both" }}>
              <div style={{ width: 32, height: 1, background: G, flexShrink: 0 }} />
              <span style={{ fontSize: ".65rem", letterSpacing: "2.5px", textTransform: "uppercase", color: G, fontWeight: 500 }}>Tekirdağ'ın Güvenilir Dekorasyon Firması</span>
            </div>
            <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,4.5vw,5rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-.5px", marginBottom: "1rem", animation: "fadeUp .8s .15s ease both" }}>
              Hayalinizdeki<br />Mekânları<br />
              <em style={{ color: G, fontStyle: "italic" }}>Ustalıkla<br className="mobile-br" />Dönüştürüyoruz</em>
            </h1>
            <p style={{ fontSize: ".78rem", color: G, letterSpacing: "1px", marginBottom: "1rem", animation: "fadeUp .8s .25s ease both", fontWeight: 500 }}>
              30+ Yıllık Ustalık · 300+ Proje · Tekirdağ
            </p>
            <p style={{ fontSize: ".92rem", lineHeight: 1.8, color: "rgba(245,240,232,0.48)", maxWidth: 400, marginBottom: "2.2rem", animation: "fadeUp .8s .3s ease both", fontWeight: 300 }}>
              Dekorasyon, tadilat ve iç mekan yenileme. Her projede usta işçilik, kaliteli malzeme ve zamanında teslimat.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp .8s .45s ease both" }}>
              <button className="btn-primary" onClick={() => scrollTo("iletişim")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                style={{ background: G, color: BG, border: "none", padding: "1rem 1.8rem", fontSize: ".75rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, cursor: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .25s", whiteSpace: "nowrap", minHeight: 52 }}
                onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseOut={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = "translateY(0)"; }}
              >Ücretsiz Keşif Talep Et</button>
              <button className="btn-secondary" onClick={() => scrollTo("projeler")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                style={{ background: "transparent", color: "#F5F0E8", border: "1px solid rgba(245,240,232,0.2)", padding: "1rem 1.8rem", fontSize: ".75rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500, cursor: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .25s", whiteSpace: "nowrap", minHeight: 52 }}
                onMouseOver={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)"; e.currentTarget.style.color = "#F5F0E8"; }}
              >Projelerimiz ↓</button>
            </div>

            {/* Stats — 2x2 mobilde */}
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem", marginTop: "3rem", paddingTop: "2.2rem", borderTop: "1px solid rgba(201,169,110,0.14)", animation: "fadeUp .8s .6s ease both" }}>
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.7rem,2.5vw,2.4rem)", color: G, lineHeight: 1, fontWeight: 300 }}>{s.num}</div>
                  <div style={{ fontSize: ".58rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(245,240,232,0.38)", marginTop: ".35rem", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ kart paneli */}
          <div className="hero-cards" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "7.5rem 8% 5rem 4%", animation: "fadeUp .8s .3s ease both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%", maxWidth: 430 }}>
              <div style={{ gridColumn: "span 2", background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.17)", padding: "1.7rem" }}>
                <div style={{ fontSize: ".58rem", letterSpacing: "2px", textTransform: "uppercase", color: G, marginBottom: ".7rem" }}>Son Proje · 2024</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 300, marginBottom: ".5rem" }}>Merkez Rezidans</div>
                <div style={{ fontSize: ".78rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.65 }}>Komple iç mekan yenileme. 180m² daire, 3 hafta teslim.</div>
                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: ".6rem" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: `linear-gradient(135deg,${G},#8B6347)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", color: BG, fontWeight: 700 }}>✓</div>
                  <span style={{ fontSize: ".68rem", color: "rgba(245,240,232,0.38)" }}>Tamamlandı · Müşteri memnun</span>
                </div>
              </div>
              {[{ icon: "◈", title: "Boya & Dekor", sub: "80+ proje" }, { icon: "⬡", title: "Banyo & Mutfak", sub: "100+ proje" }].map((c, i) => (
                <div key={i} style={{ background: i === 0 ? "rgba(255,255,255,0.02)" : "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.09)", padding: "1.2rem" }}>
                  <div style={{ fontSize: "1.4rem", color: G, marginBottom: ".5rem" }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: ".88rem", marginBottom: ".25rem" }}>{c.title}</div>
                  <div style={{ fontSize: ".65rem", color: "rgba(245,240,232,0.32)" }}>{c.sub}</div>
                </div>
              ))}
              <div style={{ gridColumn: "span 2", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,169,110,0.07)", padding: ".9rem 1.3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: ".58rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.28)", marginBottom: ".25rem" }}>Müşteri Değerlendirmesi</div>
                  <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: G, fontSize: ".82rem" }}>★</span>)}</div>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", color: G, fontWeight: 300 }}>5.0</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "1.8rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".4rem", zIndex: 2, animation: "fadeUp 1s 1s ease both" }}>
          <div style={{ fontSize: ".55rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,0.28)" }}>Keşfet</div>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom,${G},transparent)` }} />
        </div>
      </section>

      {/* ═══ GÜVEN BANDI ═══ */}
      <section style={{ padding: "3.5rem 6%", background: BG2, borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <AnimatedSection>
          <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(201,169,110,0.08)" }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".9rem", padding: "1.4rem 1.2rem", background: BG2 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", color: BG, fontWeight: 700, fontSize: ".78rem", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: ".95rem", marginBottom: ".2rem", fontWeight: 400 }}>{item.title}</h4>
                  <p style={{ fontSize: ".75rem", color: "rgba(245,240,232,0.43)", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ═══ HİZMETLER ═══ */}
      <section id="hizmetler" style={{ padding: "5.5rem 6%", background: BG }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: 26, height: 1, background: G }} />
            <span style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G }}>Ne Yapıyoruz</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4.5vw,3.6rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "2.8rem" }}>
            Uzmanlaştığımız<br /><em style={{ color: G, fontStyle: "italic" }}>Hizmetler</em>
          </h2>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1px", background: "rgba(201,169,110,0.08)" }}>
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 0.06}>
              <div onMouseEnter={() => { setActiveService(i); setHovered(true); }} onMouseLeave={() => { setActiveService(null); setHovered(false); }}
                style={{ padding: "2.2rem 1.8rem", background: activeService === i ? "rgba(201,169,110,0.06)" : BG, transition: "background .3s", cursor: "none", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, width: activeService === i ? "100%" : "0%", height: 1, background: G, transition: "width .4s ease" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.3rem" }}>
                  <span style={{ fontSize: "1.5rem", color: s.color, opacity: .85 }}>{s.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.8rem", color: "rgba(201,169,110,0.07)", lineHeight: 1 }}>{s.id}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 400, marginBottom: ".7rem" }}>{s.title}</h3>
                <p style={{ fontSize: ".84rem", lineHeight: 1.7, color: "rgba(245,240,232,0.43)", fontWeight: 300 }}>{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ PROJELER ═══ */}
      <section id="projeler" style={{ padding: "5.5rem 6%", background: BG2 }}>
        <AnimatedSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.8rem", flexWrap: "wrap", gap: "1.2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: 26, height: 1, background: G }} />
                <span style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G }}>Referanslarımız</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4.5vw,3.6rem)", fontWeight: 300 }}>
                Tamamlanan<br /><em style={{ color: G, fontStyle: "italic" }}>Projeler</em>
              </h2>
            </div>
            <p style={{ color: "rgba(245,240,232,0.38)", maxWidth: 280, lineHeight: 1.7, fontSize: ".86rem" }}>300'den fazla başarılı proje tamamlandı.</p>
          </div>
        </AnimatedSection>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "repeat(2,230px)", gap: 4 }}>
          {PROJECTS.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.07} style={{ gridColumn: i === 0 ? "span 2" : "span 1", gridRow: i === 0 ? "span 2" : "span 1" }}>
              <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                style={{ height: "100%", minHeight: i === 0 ? 464 : 230, background: `linear-gradient(160deg,${p.bg})`, position: "relative", overflow: "hidden", cursor: "none", display: "flex", alignItems: "flex-end" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,12,10,.9) 0%,transparent 55%)" }} />
                <div style={{ position: "relative", padding: "1rem 1.4rem" }}>
                  <div style={{ fontSize: ".58rem", letterSpacing: "2px", textTransform: "uppercase", color: G, marginBottom: ".35rem" }}>{p.cat} · {p.year}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: i === 0 ? "1.5rem" : "1.1rem", fontWeight: 400 }}>{p.title}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ ÖNCE / SONRA ═══ */}
      <section style={{ padding: "5.5rem 6%", background: BG }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: 26, height: 1, background: G }} />
            <span style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G }}>Dönüşüm</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4.5vw,3.6rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "2.8rem" }}>
            Dönüşüm<br /><em style={{ color: G, fontStyle: "italic" }}>Projelerimiz</em>
          </h2>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.2rem" }}>
          {BEFORE_AFTER.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div style={{ border: "1px solid rgba(201,169,110,0.11)", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", background: `linear-gradient(160deg,${p.beforeBg},#1a1612)`, overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.5),transparent 60%)" }} />
                    <div style={{ position: "absolute", top: ".6rem", left: ".6rem", background: "rgba(0,0,0,.65)", border: "1px solid rgba(245,240,232,.18)", padding: ".2rem .5rem", fontSize: ".58rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,.65)" }}>ÖNCE</div>
                  </div>
                  <div style={{ position: "relative", aspectRatio: "4/3", background: `linear-gradient(160deg,${p.afterBg},#3d2b1a)`, overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.3),transparent 60%)" }} />
                    <div style={{ position: "absolute", top: ".6rem", left: ".6rem", background: "rgba(0,0,0,.5)", border: `1px solid ${G}`, padding: ".2rem .5rem", fontSize: ".58rem", letterSpacing: "2px", textTransform: "uppercase", color: G }}>SONRA</div>
                  </div>
                </div>
                <div style={{ padding: "1.1rem 1.4rem", background: "rgba(201,169,110,0.03)" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", marginBottom: ".35rem" }}>{p.title}</h3>
                  <p style={{ fontSize: ".78rem", color: "rgba(245,240,232,0.43)" }}>{p.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "1.2rem", fontSize: ".72rem", color: "rgba(245,240,232,0.22)", fontStyle: "italic" }}>* Fotoğraflar yakında eklenecektir.</p>
      </section>

      {/* ═══ MÜŞTERİ YORUMLARI ═══ */}
      <section style={{ padding: "5.5rem 6%", background: BG2 }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: 26, height: 1, background: G }} />
            <span style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G }}>Referanslar</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4.5vw,3.6rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "2.8rem" }}>
            Müşterilerimiz<br /><em style={{ color: G, fontStyle: "italic" }}>Ne Diyor?</em>
          </h2>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1rem" }}>
          {REVIEWS.map((r, i) => (
            <AnimatedSection key={i} delay={i * 0.07}>
              <div style={{ padding: "1.4rem", background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.1)", height: "100%" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: ".9rem" }}>
                  {[...Array(r.stars)].map((_,j) => <span key={j} style={{ color: G, fontSize: ".88rem" }}>★</span>)}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontStyle: "italic", color: "rgba(245,240,232,.7)", lineHeight: 1.6, marginBottom: "1rem" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: ".9rem" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${G},#6B4F3A)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", fontWeight: 600, color: BG, flexShrink: 0 }}>{r.name[0]}</div>
                  <span style={{ fontSize: ".78rem", color: "rgba(245,240,232,0.48)" }}>{r.name}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ HAKKIMIZDA ═══ */}
      <section id="hakkımızda" style={{ padding: "5.5rem 6%", background: BG }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: 26, height: 1, background: G }} />
            <span style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G }}>Biz Kimiz</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4.5vw,3.6rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "3.5rem" }}>
            Özmen Dekorasyon<br /><em style={{ color: G, fontStyle: "italic" }}>Hakkımızda</em>
          </h2>
        </AnimatedSection>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4.5rem", marginBottom: "4rem", alignItems: "start" }}>
          <AnimatedSection>
            <div style={{ borderLeft: `2px solid ${G}`, paddingLeft: "1.4rem", marginBottom: "1.8rem" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontStyle: "italic", color: "rgba(245,240,232,.68)", lineHeight: 1.6 }}>
                "1995'ten bu yana inşaat ve dekorasyon sektöründeyiz. Her projede aynı özen, aynı kalite."
              </p>
            </div>
            <p style={{ color: "rgba(245,240,232,.48)", lineHeight: 1.82, fontSize: ".88rem", fontWeight: 300, marginBottom: "1rem" }}>
              Müteahhitlik ile başladığımız yolculuğumuzda büyük hastane projeleri, konut kompleksleri ve ticari yapılar inşa ettik.
            </p>
            <p style={{ color: "rgba(245,240,232,.48)", lineHeight: 1.82, fontSize: ".88rem", fontWeight: 300 }}>
              Bugün Tekirdağ'da her ölçekten projede — küçük bir banyo yenilemesinden komple daire tadilatına — aynı profesyonellik ile hizmet veriyoruz.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            {TIMELINE.map((t) => (
              <div key={t.year} style={{ display: "flex", gap: "1.3rem", marginBottom: "1.6rem", alignItems: "flex-start" }}>
                <div style={{ minWidth: 48, fontFamily: "'Cormorant Garamond',serif", fontSize: ".95rem", color: G, fontWeight: 400, paddingTop: ".12rem", flexShrink: 0 }}>{t.year}</div>
                <div style={{ flex: 1, paddingLeft: "1.1rem", borderLeft: "1px solid rgba(201,169,110,0.16)" }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", marginBottom: ".28rem", fontWeight: 400 }}>{t.title}</h4>
                  <p style={{ fontSize: ".8rem", color: "rgba(245,240,232,.38)", lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 26, height: 1, background: G }} />
            <span style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G }}>Uzmanlık Alanlarımız</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "1px", background: "rgba(201,169,110,0.08)", marginBottom: "3.5rem" }}>
            {EXPERTISE.map(alan => (
              <div key={alan} style={{ padding: "1.1rem 1.4rem", background: BG, display: "flex", alignItems: "center", gap: ".7rem" }}>
                <span style={{ color: G, fontSize: ".72rem" }}>✦</span>
                <span style={{ fontSize: ".86rem", color: "rgba(245,240,232,.68)" }}>{alan}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="region-box" style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.13)", padding: "2.2rem 2.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ fontSize: ".62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: G, marginBottom: ".7rem" }}>Hizmet Bölgemiz</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 300 }}>Tekirdağ Merkez</h3>
              <p style={{ color: "rgba(245,240,232,.43)", marginTop: ".5rem", fontSize: ".84rem" }}>Tüm merkez mahallelerde hızlı ve güvenilir hizmet.</p>
            </div>
            <button onClick={() => scrollTo("iletişim")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
              style={{ background: G, color: BG, border: "none", padding: ".9rem 1.8rem", fontSize: ".73rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, cursor: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .25s", minHeight: 48 }}
              onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = "translateY(0)"; }}
            >Teklif Al →</button>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══ CTA BAND ═══ */}
      <div style={{ padding: "5rem 6%", background: "linear-gradient(135deg,#1a1208 0%,#2a1f0e 50%,#1a1208 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%,rgba(201,169,110,.09) 0%,transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <p style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G, marginBottom: "1rem" }}>Projeniz Hazır mı?</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5.5vw,4.2rem)", fontWeight: 300, marginBottom: "2.2rem" }}>
              Hayalinizdeki Mekânı<br /><em style={{ fontStyle: "italic", color: G }}>Birlikte Yapalım</em>
            </h2>
            <button onClick={() => scrollTo("iletişim")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
              style={{ background: G, color: BG, border: "none", padding: "1rem 2.5rem", fontSize: ".76rem", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, cursor: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .25s", minHeight: 52 }}
              onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = "translateY(0)"; }}
            >Ücretsiz Keşif Randevusu Al →</button>
          </AnimatedSection>
        </div>
      </div>

      {/* ═══ İLETİŞİM ═══ */}
      <section id="iletişim" style={{ padding: "5.5rem 6%", background: BG }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "4.5rem" }}>
          <AnimatedSection>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 26, height: 1, background: G }} />
              <span style={{ fontSize: ".62rem", letterSpacing: "3px", textTransform: "uppercase", color: G }}>İletişim</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.8vw,3rem)", fontWeight: 300, lineHeight: 1.2, marginBottom: "1rem" }}>
              Ücretsiz Keşif<br /><em style={{ color: G, fontStyle: "italic" }}>Talep Formu</em>
            </h2>
            <p style={{ color: "rgba(245,240,232,.43)", lineHeight: 1.75, fontSize: ".86rem", marginBottom: "1.8rem" }}>
              Uzman ekibimiz mekânınızı inceleyerek en doğru çözümü ve fiyat teklifini sunar.
            </p>
            {[
              { icon: "◎", label: "Konum", val: "Tekirdağ, Türkiye" },
              { icon: "◇", label: "Telefon", val: "0552 950 41 54" },
              { icon: "✦", label: "Çalışma Saatleri", val: "Her Gün · 08:00–20:00" },
              { icon: "◈", label: "WhatsApp", val: <a href="https://wa.me/905529504154" target="_blank" rel="noopener noreferrer" style={{ color: "#F5F0E8", textDecoration: "none" }}>Hızlı yanıt için yazın →</a> },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                <div style={{ width: 38, height: 38, border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: G, fontSize: ".9rem", flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: ".58rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,232,.28)", marginBottom: ".3rem" }}>{c.label}</div>
                  <div style={{ fontSize: ".88rem", color: "#F5F0E8" }}>{c.val}</div>
                </div>
              </div>
            ))}
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 380, gap: "1.1rem" }}>
                <div style={{ fontSize: "2.5rem", color: G }}>✦</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 300 }}>Talebiniz Alındı</h3>
                <p style={{ color: "rgba(245,240,232,.43)", textAlign: "center", fontSize: ".88rem" }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
                {[
                  { label: "Adınız Soyadınız", key: "name", type: "text", ph: "Ad Soyad" },
                  { label: "Telefon Numaranız", key: "phone", type: "tel", ph: "05XX XXX XX XX" },
                  { label: "İl / İlçe", key: "city", type: "text", ph: "Tekirdağ Merkez" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={formState[f.key]}
                      onChange={e => setFormState(p => ({ ...p, [f.key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = G}
                      onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.2)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Hizmet Türü</label>
                  <select value={formState.service} onChange={e => setFormState(p => ({ ...p, service: e.target.value }))}
                    style={{ ...inputStyle, background: "#1a1810", color: formState.service ? "#F5F0E8" : "rgba(245,240,232,.38)", appearance: "none" }}>
                    <option value="">Seçiniz...</option>
                    {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Mesajınız</label>
                  <textarea placeholder="Projeniz hakkında kısaca bilgi verir misiniz?" value={formState.message}
                    onChange={e => setFormState(p => ({ ...p, message: e.target.value }))} rows={4}
                    style={{ ...inputStyle, resize: "vertical", minHeight: 96 }}
                    onFocus={e => e.target.style.borderColor = G}
                    onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.2)"}
                  />
                </div>
                <button type="submit" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                  style={{ background: G, color: BG, border: "none", padding: "1rem 1.8rem", fontSize: ".75rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, cursor: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .25s", width: "100%", marginTop: ".3rem", minHeight: 52 }}
                  onMouseOver={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = "translateY(0)"; }}
                >Ücretsiz Keşif Talep Et →</button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FLOATING BUTONLAR ═══ */}
      <div style={{ position: "fixed", bottom: "1.1rem", right: "1.1rem", display: "flex", flexDirection: "column", gap: ".5rem", zIndex: 998 }}>
        <a href="tel:+905529504154"
          style={{ width: 44, height: 44, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(201,169,110,0.25)", fontSize: "1.1rem", textDecoration: "none", transition: "transform .2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        >📞</a>
        <a href="https://wa.me/905529504154" target="_blank" rel="noopener noreferrer"
          style={{ width: 44, height: 44, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(37,211,102,0.22)", fontSize: "1.1rem", textDecoration: "none", transition: "transform .2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        >💬</a>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#0a0908", borderTop: "1px solid rgba(201,169,110,0.1)", padding: "3.5rem 6% 1.8rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", letterSpacing: "2px", marginBottom: ".7rem" }}>
              ÖZMEN <span style={{ color: G }}>DEKORASYON</span>
            </div>
            <p style={{ fontSize: ".77rem", color: "rgba(245,240,232,.33)", lineHeight: 1.75 }}>
              Tekirdağ'da iç mekan dekorasyon, anahtar teslim tadilat ve yenileme hizmetleri.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: ".6rem", letterSpacing: "2px", textTransform: "uppercase", color: G, marginBottom: ".9rem" }}>Hizmetler</h4>
            {["İç Mekan Tadilat", "Boya & Dekorasyon", "Banyo & Mutfak", "Zemin & Parke", "Alçıpan & Tavan"].map(h => (
              <div key={h} style={{ fontSize: ".76rem", color: "rgba(245,240,232,.35)", marginBottom: ".45rem", lineHeight: 1.5 }}>{h}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: ".6rem", letterSpacing: "2px", textTransform: "uppercase", color: G, marginBottom: ".9rem" }}>Hizmet Bölgelerimiz</h4>
            {["Tekirdağ Merkez", "Çorlu", "Çerkezköy", "Marmara Ereğlisi", "Süleymanpaşa"].map(b => (
              <div key={b} style={{ fontSize: ".76rem", color: "rgba(245,240,232,.35)", marginBottom: ".45rem" }}>{b}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: ".6rem", letterSpacing: "2px", textTransform: "uppercase", color: G, marginBottom: ".9rem" }}>İletişim</h4>
            {["📞 0552 950 41 54", "📍 Tekirdağ, Türkiye", "🕐 Her gün 08:00–20:00"].map(c => (
              <div key={c} style={{ fontSize: ".76rem", color: "rgba(245,240,232,.35)", marginBottom: ".45rem" }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(201,169,110,0.07)", paddingTop: "1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: ".8rem" }}>
          <p style={{ fontSize: ".7rem", color: "rgba(245,240,232,.18)" }}>© 2025 Özmen Dekorasyon · Tekirdağ</p>
          <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{ background: "none", border: "none", color: "rgba(245,240,232,.28)", fontSize: ".7rem", cursor: "pointer", letterSpacing: "1px", transition: "color .2s", fontFamily: "'DM Sans',sans-serif", padding: ".4rem 0", minHeight: 40 }}
                onMouseOver={e => e.target.style.color = G} onMouseOut={e => e.target.style.color = "rgba(245,240,232,.28)"}
              >{l}</button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        /* Desktop cursor */
        .custom-cursor { display: block; }
        * { cursor: none !important; }

        /* ──────── TABLET / MOBILE ──────── */
        @media (max-width: 900px) {
          * { cursor: auto !important; }
          .custom-cursor { display: none !important; }
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .hero-svg { display: none !important; }
          .hero-cards { display: none !important; }
          .mobile-br { display: inline; }

          /* Hero */
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-content { padding: 6.5rem 6% 4rem !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns button, .btn-primary, .btn-secondary { width: 100% !important; text-align: center !important; }

          /* Stats 2×2 */
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: .9rem !important; margin-top: 2rem !important; }

          /* Güven bandı 2 kolon */
          .trust-grid { grid-template-columns: repeat(2,1fr) !important; }

          /* Projeler */
          .projects-grid { grid-template-columns: repeat(2,1fr) !important; grid-template-rows: auto !important; gap: 3px !important; }
          .projects-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; }
          .projects-grid > div > div { min-height: 170px !important; }

          /* Hakkımızda */
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }

          /* İletişim */
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }

          /* Footer */
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 1.8rem !important; }

          /* Bölge kutusu */
          .region-box { flex-direction: column !important; padding: 1.8rem 1.5rem !important; }
          .region-box button { width: 100% !important; }

          /* Section padding normalize */
          section { padding-top: 4rem !important; padding-bottom: 4rem !important; padding-left: 5% !important; padding-right: 5% !important; }
        }

        /* ──────── KÜÇÜK MOBİL ──────── */
        @media (max-width: 480px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .trust-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .stats-grid { gap: .7rem !important; }
          section { padding-left: 4.5% !important; padding-right: 4.5% !important; }
        }

        @media (max-width: 360px) {
          section { padding-left: 4% !important; padding-right: 4% !important; }
          .hero-content { padding-left: 4% !important; padding-right: 4% !important; }
        }

        /* Form normalizasyon — iOS zoom engeli */
        input, select, textarea {
          -webkit-appearance: none;
          border-radius: 0 !important;
          font-size: 16px !important;
        }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.3); }
        option { background: #1a1810; color: #F5F0E8; }

        /* Lazy loading placeholder */
        [class^="project-img-"] { transition: opacity .3s; }
      `}</style>
    </div>
  );
}
