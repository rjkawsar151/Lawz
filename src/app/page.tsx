'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { lawyers, practiceAreas, posts } from '@/data/mockData';
import { Search, Calendar, Star, Sparkles, CheckCircle2, Diamond, MessageSquare, Video, ShieldCheck, Lock, Wallet, Users, Globe, Eye, BarChart3, Trophy, MapPin, Clock, Heart, Menu, X, Gavel, Scale, FileText, Briefcase, Home, Banknote, HardHat, Shield, Plane, Landmark, Lightbulb } from 'lucide-react';
import CountUp from '@/components/CountUp';

/* ======= HEADER ======= */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: 80,
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
          transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div style={{
          maxWidth: 1320, width: '100%', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: scrolled ? 'linear-gradient(135deg, #1D4ED8, #06B6D4)' : 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18,
              color: scrolled ? '#fff' : '#fff',
            }}>L</div>
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24,
              color: scrolled ? '#0F172A' : '#fff', letterSpacing: '-0.5px',
            }}>LAWZ</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{
            display: 'flex', alignItems: 'center', gap: 32,
          }} className="desktop-nav">
            {[
              { label: 'Home', href: '/' },
              { label: 'Find Lawyers', href: '/find-lawyers' },
              { label: 'Community', href: '/community' },
              { label: 'Resources', href: '/resources' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                fontSize: 15, fontWeight: 500,
                color: scrolled ? '#475569' : 'rgba(255,255,255,0.85)',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = scrolled ? '#1D4ED8' : '#fff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = scrolled ? '#475569' : 'rgba(255,255,255,0.85)'}
              >{item.label}</Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
            <Link href="/auth/login" style={{
              padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600,
              color: scrolled ? '#475569' : '#fff',
              border: scrolled ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.2s',
            }}>Sign In</Link>
            <Link href="/auth/register-lawyer" style={{
              padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600,
              color: '#fff', background: '#1D4ED8',
              transition: 'all 0.2s',
            }}>Join as Lawyer</Link>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-only" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
            <Link href="/find-lawyers" style={{ color: scrolled ? '#0F172A' : '#fff', display: 'flex' }}>
              <Search size={22} />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 44, height: 44, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: scrolled ? '#F1F5F9' : 'rgba(255,255,255,0.1)',
                color: scrolled ? '#0F172A' : '#fff', border: 'none'
              }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
          background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)',
        }} onClick={() => setMobileOpen(false)}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '85%', maxWidth: 360, height: '100%',
            background: '#fff', padding: '96px 24px 24px',
            animation: 'slideIn 0.3s ease-out',
          }} onClick={e => e.stopPropagation()}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Find Lawyers', href: '/find-lawyers' },
                { label: 'Community', href: '/community' },
                { label: 'Resources', href: '/resources' },
              ].map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{
                  padding: '14px 16px', borderRadius: 14, fontSize: 16, fontWeight: 500,
                  color: '#0F172A', display: 'block',
                }}>{item.label}</Link>
              ))}
            </nav>
            <div style={{ borderTop: '1px solid #E2E8F0', margin: '16px 0', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/auth/login" style={{
                padding: '14px 20px', borderRadius: 14, fontSize: 15, fontWeight: 600, textAlign: 'center',
                color: '#475569', border: '1px solid #E2E8F0', display: 'block',
              }}>Sign In</Link>
              <Link href="/auth/register-lawyer" style={{
                padding: '14px 20px', borderRadius: 14, fontSize: 15, fontWeight: 600, textAlign: 'center',
                color: '#fff', background: '#1D4ED8', display: 'block',
              }}>Join as Lawyer</Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ======= FOOTER ======= */
function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#fff', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Company */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: '#fff',
              }}>L</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20 }}>LAWZ</span>
            </div>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, maxWidth: 260 }}>
              Law Within Reach. Find verified lawyers, book affordable consultations, and join the legal community.
            </p>
          </div>
          {/* Platform */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, color: '#94A3B8' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Find Lawyers', 'Community', 'Book Consultation', 'Resources', 'Pricing'].map(s => (
                <a key={s} href="#" style={{ fontSize: 14, color: '#CBD5E1', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#CBD5E1'}
                >{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, color: '#94A3B8' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['About', 'Careers', 'Press', 'Contact', 'Blog'].map(s => (
                <a key={s} href="#" style={{ fontSize: 14, color: '#CBD5E1', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#CBD5E1'}
                >{s}</a>
              ))}
            </div>
          </div>
          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, color: '#94A3B8' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Disclaimer', 'Accessibility'].map(s => (
                <a key={s} href="#" style={{ fontSize: 14, color: '#CBD5E1', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#CBD5E1'}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1E293B', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <p style={{ fontSize: 13, color: '#64748B' }}>© 2025 LAWZ. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={14} /> Bangladesh</span>
            <span style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={14} /> English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ======= HERO SECTION ======= */
function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const featured = lawyers.filter(l => l.featured).slice(0, 3);

  const handleSearch = (q?: string) => {
    const query = q || search;
    if (query.trim()) {
      router.push(`/find-lawyers?s=${encodeURIComponent(query)}`);
    } else {
      router.push('/find-lawyers');
    }
  };

  return (
    <section className="hero-gradient" style={{ minHeight: '100vh', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(6,182,212,0.08)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(29,78,216,0.1)', filter: 'blur(80px)' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 24px 96px', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {/* Left Column */}
        <div style={{ flex: '1 1 540px', minWidth: 320 }}>
          <div className="animate-fadeIn" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 999, padding: '8px 16px', marginBottom: 24,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Trusted legal help, made easier</span>
          </div>

          <h1 className="animate-slideUp" style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700, lineHeight: 1.15, color: '#fff', marginBottom: 24,
          }}>
            Find the right lawyer.{' '}
            <span style={{ color: '#06B6D4' }}>Book affordable consultations.</span>{' '}
            Join the legal community.
          </h1>

          <p className="animate-slideUp" style={{
            fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 560,
            animationDelay: '0.1s',
          }}>
            LAWZ helps people discover verified lawyers, compare fees, search by court or legal department, and get fast consultations online or in person.
          </p>

          <div className="animate-slideUp" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40, animationDelay: '0.2s' }}>
            <button onClick={() => handleSearch()} className="btn-press" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600,
              color: '#0F172A', background: '#fff', border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
            }}>
              <Search size={18} /> Find a Lawyer
            </button>
            <Link href="/auth/register-lawyer" className="btn-press" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600,
              color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.2s',
            }}>
              <Scale size={18} /> Join as Lawyer
            </Link>
          </div>

          {/* Trust Points */}
          <div className="animate-slideUp" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, animationDelay: '0.3s' }}>
            {[
              { icon: <CheckCircle2 size={18} color="#10B981" />, text: 'Verified lawyers' },
              { icon: <Diamond size={18} color="#06B6D4" />, text: 'Transparent fees' },
              { icon: <Video size={18} color="#3B82F6" />, text: 'Online & in-person' },
              { icon: <MessageSquare size={18} color="#8B5CF6" />, text: 'Community insights' },
            ].map(tp => (
              <div key={tp.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{tp.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{tp.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Search Module */}
        <div style={{ flex: '1 1 420px', minWidth: 320, maxWidth: 520 }} className="animate-scaleIn">
          <div className="glass" style={{
            borderRadius: 28, padding: 28, border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            {/* Search Field */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#F8FAFC', borderRadius: 16, padding: '14px 16px',
              border: '1px solid #E2E8F0', marginBottom: 16,
            }}>
              <Search size={18} color="#64748B" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search lawyer, practice area, court…"
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  fontSize: 14, color: '#0F172A', outline: 'none',
                }}
              />
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {['Family Law', 'Criminal', 'Property', 'Corporate', 'High Court', 'Budget Consult'].map(c => (
                <span key={c} onClick={() => handleSearch(c)} style={{
                  padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                  background: '#EEF2FF', color: '#3730A3', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>{c}</span>
              ))}
            </div>

            {/* Featured Lawyers Preview */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Featured Lawyers</p>
              {featured.map(l => (
                <div key={l.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <img src={l.photo} alt={l.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {l.name} {l.verified && <CheckCircle2 size={14} color="#1D4ED8" fill="#DBEAFE" />}
                    </p>
                    <p style={{ fontSize: 12, color: '#64748B' }}>{l.practiceAreas[0]} · {l.experience} yrs</p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#10B981' }}>৳{l.onlineCost}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              {[
                { end: 10000, suffix: '+', label: 'Consultations' },
                { end: 2500, suffix: '+', label: 'Verified lawyers' },
                { end: 98, suffix: '%', label: 'Profile quality' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', flex: 1 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#1D4ED8' }}>
                    <CountUp end={s.end} suffix={s.suffix} duration={2500} />
                  </p>
                  <p style={{ fontSize: 11, color: '#64748B' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======= TRUST BAR ======= */
function TrustBar() {
  return (
    <section style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '24px 24px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32 }}>
        {[
          { icon: <ShieldCheck size={20} color="#10B981" />, text: 'Verified professionals' },
          { icon: <Lock size={20} color="#3B82F6" />, text: 'Secure booking' },
          { icon: <Wallet size={20} color="#8B5CF6" />, text: 'Transparent fees' },
          { icon: <Users size={20} color="#F59E0B" />, text: 'Community moderation' },
          { icon: <Star size={20} color="#F43F5E" fill="#F43F5E" />, text: 'Real user reviews' },
        ].map(t => (
          <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{t.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>{t.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ======= PRACTICE AREAS ======= */
function PracticeAreasSection() {
  return (
    <section style={{ padding: '96px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Explore</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F172A', marginTop: 8 }}>Practice Areas</h2>
          <p style={{ fontSize: 16, color: '#64748B', marginTop: 12, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>Find lawyers specialized in your area of need</p>
        </div>
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {practiceAreas.map(pa => {
            const iconsMap: any = { Users, Gavel, FileText, Briefcase, Home, Banknote, HardHat, Shield, Plane, Landmark, Lightbulb, ShieldCheck };
            const Icon = iconsMap[pa.icon] || Scale;
            return (
              <Link href="/find-lawyers" key={pa.id} className="card-hover shadow-premium" style={{
                background: '#fff', borderRadius: 24, padding: 24,
                border: '1px solid #E2E8F0', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 12,
                textDecoration: 'none',
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0F172A' }}>{pa.name}</h3>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{pa.description}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>{pa.count} lawyers →</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}

/* ======= HOW IT WORKS ======= */
function HowItWorksSection() {
  const steps = [
    { num: '01', icon: <Search size={32} color="#1D4ED8" />, title: 'Search & Compare', desc: 'Search verified lawyers by practice area, court, location, fees, and experience. Compare profiles side by side to find your best match.' },
    { num: '02', icon: <Calendar size={32} color="#1D4ED8" />, title: 'Book Consultation', desc: 'Choose between in-person or online consultations. Pick a time slot, add your case details, and book securely on the platform.' },
    { num: '03', icon: <Sparkles size={32} color="#1D4ED8" />, title: 'Get Help Confidently', desc: 'Receive expert legal guidance from verified professionals. Leave a review, ask follow-ups, and join the legal community.' },
  ];
  return (
    <section style={{ padding: '96px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Simple process</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F172A', marginTop: 8 }}>How LAWZ Works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {steps.map(s => (
            <div key={s.num} className="card-hover shadow-premium" style={{
              background: '#fff', borderRadius: 24, padding: 32,
              border: '1px solid #E2E8F0', position: 'relative',
            }}>
              <span style={{ position: 'absolute', top: 20, right: 24, fontSize: 48, fontWeight: 800, color: '#F1F5F9', fontFamily: 'var(--font-heading)' }}>{s.num}</span>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======= FEATURED LAWYERS ======= */
function FeaturedLawyersSection() {
  const featured = lawyers.filter(l => l.featured || l.rating >= 4.7).slice(0, 6);
  return (
    <section style={{ padding: '96px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Top Rated</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F172A', marginTop: 8 }}>Featured Verified Lawyers</h2>
          </div>
          <Link href="/find-lawyers" style={{ fontSize: 14, fontWeight: 600, color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: 4 }}>
            View all lawyers →
          </Link>
        </div>
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
          {featured.map(l => (
            <LawyerCard key={l.id} lawyer={l} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======= LAWYER CARD ======= */
function LawyerCard({ lawyer: l }: { lawyer: typeof lawyers[0] }) {
  return (
    <div className="card-hover shadow-premium" style={{
      background: '#fff', borderRadius: 24, padding: 24,
      border: '1px solid #E2E8F0',
    }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <img src={l.photo} alt={l.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #DBEAFE' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{l.name}</h3>
            {l.verified && <CheckCircle2 size={16} color="#1D4ED8" fill="#DBEAFE" />}
          </div>
          <p style={{ fontSize: 13, color: '#475569', marginBottom: 4 }}>{l.title} · {l.designation}</p>
          <p style={{ fontSize: 12, color: '#64748B' }}>{l.experience} years · {l.city}, {l.country}</p>
        </div>
      </div>

      {/* Practice areas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {l.practiceAreas.map(pa => (
          <span key={pa} style={{
            padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500,
            background: '#EEF2FF', color: '#3730A3',
          }}>{pa}</span>
        ))}
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500,
          background: '#F0FDF4', color: '#166534',
        }}><MapPin size={12} /> {l.court}</span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '12px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{l.rating}</span>
          <span style={{ fontSize: 12, color: '#64748B' }}>({l.reviewCount})</span>
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748B' }}><Clock size={12} /> {l.responseTime}</span>
        {l.availableToday && <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>Available today</span>}
      </div>

      {/* Fees */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 11, color: '#64748B' }}>Visiting</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>৳{l.visitingCost.toLocaleString()}</p>
        </div>
        <div style={{ width: 1, background: '#E2E8F0' }} />
        <div>
          <p style={{ fontSize: 11, color: '#64748B' }}>Online</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#1D4ED8' }}>৳{l.onlineCost.toLocaleString()}</p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Link href={`/lawyers/${l.id}`} className="btn-press" style={{
          flex: 1, padding: '12px 0', borderRadius: 14, fontSize: 13, fontWeight: 600,
          textAlign: 'center', color: '#1D4ED8', background: '#EEF2FF',
          transition: 'all 0.2s',
        }}>View Profile</Link>
        <Link href={`/booking?lawyer=${l.id}`} className="btn-press" style={{
          flex: 1, padding: '12px 0', borderRadius: 14, fontSize: 13, fontWeight: 600,
          textAlign: 'center', color: '#fff', background: '#1D4ED8',
          transition: 'all 0.2s',
        }}>Book Now</Link>
        <button className="btn-press" style={{
          width: 44, height: 44, borderRadius: 14,
          border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#64748B', transition: 'all 0.2s', flexShrink: 0,
        }}><Heart size={18} /></button>
      </div>
    </div>
  );
}

/* ======= BUDGET SECTION ======= */
function BudgetSection() {
  const budgetLawyers = lawyers.filter(l => l.onlineCost <= 1500).slice(0, 4);
  return (
    <section style={{ padding: '96px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: '#D1FAE5', color: '#065F46', marginBottom: 16,
          }}><Diamond size={16} fill="#10B981" color="#10B981" /> Starting from ৳800</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F172A', marginTop: 8 }}>Budget-Friendly Consultations</h2>
          <p style={{ fontSize: 16, color: '#64748B', marginTop: 12, maxWidth: 520, margin: '12px auto 0' }}>Quality legal help doesn&apos;t have to be expensive. Compare consultation fees and find lawyers that fit your budget.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {budgetLawyers.map(l => (
            <Link href={`/lawyers/${l.id}`} key={l.id} className="card-hover shadow-premium" style={{
              background: '#fff', borderRadius: 24, padding: 24,
              border: '1px solid #E2E8F0', textDecoration: 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <img src={l.photo} alt={l.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{l.name}</p>
                  <p style={{ fontSize: 12, color: '#64748B' }}>{l.practiceAreas[0]}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1, padding: '12px', borderRadius: 14, background: '#F8FAFC', textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#64748B' }}>Online</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#10B981' }}>৳{l.onlineCost}</p>
                </div>
                <div style={{ flex: 1, padding: '12px', borderRadius: 14, background: '#F8FAFC', textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#64748B' }}>Visiting</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>৳{l.visitingCost}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{l.rating}</span>
                <span style={{ fontSize: 12, color: '#64748B' }}>· {l.reviewCount} reviews</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======= COMMUNITY PREVIEW ======= */
function CommunityPreview() {
  const recentPosts = posts.slice(0, 3);
  return (
    <section style={{ padding: '96px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Community</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F172A', marginTop: 8 }}>Latest from the Community</h2>
          </div>
          <Link href="/community" style={{ fontSize: 14, fontWeight: 600, color: '#1D4ED8' }}>View all posts →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
          {recentPosts.map(p => (
            <div key={p.id} className="card-hover shadow-premium" style={{
              background: '#fff', borderRadius: 24, padding: 24,
              border: '1px solid #E2E8F0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img src={p.authorPhoto} alt={p.authorName} style={{ width: 44, height: 44, borderRadius: '50%' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{p.authorName}</span>
                    {p.authorType === 'verified-lawyer' && (
                      <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: '#DBEAFE', color: '#1D4ED8' }}>Verified Lawyer</span>
                    )}
                  </div>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{p.timestamp} · {p.category}</span>
                </div>
              </div>
              <p className="line-clamp-3" style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, marginBottom: 16 }}>{p.text}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {p.tags.map(t => <span key={t} style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 500 }}>{t}</span>)}
              </div>
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>👏 {p.reactions.clap}</span>
                  <span style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}><MessageSquare size={14} /> {p.commentCount}</span>
                  <span style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>🔗 {p.shareCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======= FOR LAWYERS SECTION ======= */
function ForLawyersSection() {
  return (
    <section style={{ padding: '96px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="hero-gradient" style={{ borderRadius: 28, padding: 'clamp(32px, 5vw, 64px)', display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em' }}>For lawyers</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, color: '#fff', marginTop: 12, marginBottom: 20 }}>Grow your practice with LAWZ</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 32 }}>Join thousands of lawyers building their digital presence. Get verified, manage bookings, engage with the community, and expand your reach.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { icon: <Eye size={18} color="#06B6D4" />, text: 'Profile visibility' },
                { icon: <Calendar size={18} color="#06B6D4" />, text: 'Booking management' },
                { icon: <MessageSquare size={18} color="#06B6D4" />, text: 'Community reach' },
                { icon: <CheckCircle2 size={18} color="#06B6D4" />, text: 'Verified badge' },
                { icon: <BarChart3 size={18} color="#06B6D4" />, text: 'Analytics dashboard' },
                { icon: <Trophy size={18} color="#06B6D4" />, text: 'Professional branding' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{b.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{b.text}</span>
                </div>
              ))}
            </div>
            <Link href="/auth/register-lawyer" className="btn-press" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600,
              color: '#0F172A', background: '#fff',
            }}>Apply as Lawyer →</Link>
          </div>
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: 32,
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center', color: '#fff' }}><Scale size={48} /></div>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 4 }}><CountUp end={2500} suffix='+' duration={2000} /></p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Lawyers already on LAWZ</p>
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: -8 }}>
                {lawyers.slice(0, 5).map((l, i) => (
                  <img key={l.id} src={l.photo} alt="" style={{
                    width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
                    marginLeft: i > 0 ? -8 : 0,
                  }} />
                ))}
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', marginLeft: -8,
                  background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, color: '#fff',
                }}>+2.5k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======= CTA SECTION ======= */
function CTASection() {
  return (
    <section style={{ padding: '96px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Ready to get started?</h2>
        <p style={{ fontSize: 16, color: '#64748B', marginBottom: 32 }}>Join LAWZ today and experience legal help made simple, transparent, and accessible.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/find-lawyers" className="btn-press" style={{
            padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600,
            color: '#fff', background: '#1D4ED8', boxShadow: '0 4px 12px rgba(29,78,216,0.3)',
          }}>Find a Lawyer</Link>
          <Link href="/auth/register" className="btn-press" style={{
            padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600,
            color: '#475569', background: '#fff', border: '1px solid #E2E8F0',
          }}>Create Account</Link>
        </div>
      </div>
    </section>
  );
}

/* ======= MAIN PAGE ======= */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <PracticeAreasSection />
        <HowItWorksSection />
        <FeaturedLawyersSection />
        <BudgetSection />
        <CommunityPreview />
        <ForLawyersSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
