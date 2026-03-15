'use client';
import { useState } from 'react';
import Link from 'next/link';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <>
            <header style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000, height: 80, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: 1320, width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>L</div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#0F172A', letterSpacing: '-0.5px' }}>LAWZ</span>
                    </Link>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
                        {[{ label: 'Home', href: '/' }, { label: 'Find Lawyers', href: '/find-lawyers' }, { label: 'Community', href: '/community' }, { label: 'Resources', href: '/resources' }].map(item => (
                            <Link key={item.href} href={item.href} style={{ fontSize: 15, fontWeight: 500, color: item.href === '/resources' ? '#1D4ED8' : '#475569' }}>{item.label}</Link>
                        ))}
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
                        <Link href="/auth/login" style={{ padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>Sign In</Link>
                    </div>
                    <button className="mobile-only" onClick={() => setMobileOpen(!mobileOpen)} style={{ width: 44, height: 44, borderRadius: 12, display: 'none', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <span style={{ width: 20, height: 2, background: '#0F172A', borderRadius: 2 }} /><span style={{ width: 20, height: 2, background: '#0F172A', borderRadius: 2 }} /><span style={{ width: 20, height: 2, background: '#0F172A', borderRadius: 2 }} />
                        </div>
                    </button>
                </div>
            </header>
        </>
    );
}

function Footer() {
    return (
        <footer style={{ background: '#0F172A', color: '#fff', padding: '48px 24px 24px' }}>
            <div style={{ maxWidth: 1320, margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#64748B' }}>© 2025 LAWZ. All rights reserved.</p>
            </div>
        </footer>
    );
}

const resources = [
    { id: 1, title: 'Know Your Rights: Arrests & Bail', category: 'Guides', readTime: '5 min read', desc: 'A comprehensive guide on your fundamental rights during an arrest in Bangladesh and how the bail process works.' },
    { id: 2, title: 'Property Registration Demystified', category: 'Articles', readTime: '8 min read', desc: 'Step-by-step breakdown of property registration laws, required documents, and common pitfalls to avoid.' },
    { id: 3, title: 'Family Law & Divorce Procedures', category: 'Guides', readTime: '10 min read', desc: 'Information on civil family law, marriage registration, and the legal procedures surrounding divorce.' },
    { id: 4, title: 'Startup Legal Checklist', category: 'Checklists', readTime: '3 min read', desc: 'A quick checklist of legal requirements, registrations, and licenses needed for new startups in Bangladesh.' },
    { id: 5, title: 'Cyber Crimes Act 101', category: 'Articles', readTime: '6 min read', desc: 'Understanding the Digital Security Act and what constitutes cybercrime under the current legal framework.' },
    { id: 6, title: 'Labor Law: Employee Rights', category: 'Guides', readTime: '7 min read', desc: 'Your rights regarding working hours, overtime, termination, and workplace safety under the Bangladesh Labor Act.' },
];

export default function ResourcesPage() {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Guides', 'Articles', 'Checklists', 'Forms'];
    const filtered = filter === 'All' ? resources : resources.filter(r => r.category === filter);

    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
                <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1D4ED8 55%, #06B6D4 100%)', padding: '80px 24px' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto', textAlign: 'center' }}>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Legal Resources & Guides</h1>
                        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', maxWidth: 640, margin: '0 auto 32px' }}>Empowering you with knowledge. Explore free guides, articles, and checklists written by verified legal experts.</p>
                        <div style={{ maxWidth: 540, margin: '0 auto', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>🔍</span>
                            <input placeholder="Search resources..." style={{ width: '100%', padding: '16px 20px 16px 52px', borderRadius: 16, border: 'none', fontSize: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: 1320, margin: '-24px auto 0', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>
                    {/* Categories */}
                    <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 16, display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 40, border: '1px solid #E2E8F0' }}>
                        {categories.map(c => (
                            <button key={c} onClick={() => setFilter(c)} className="btn-press" style={{
                                padding: '10px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                                background: filter === c ? '#1D4ED8' : '#F8FAFC',
                                color: filter === c ? '#fff' : '#475569',
                                border: filter === c ? 'none' : '1px solid #E2E8F0',
                                transition: 'all 0.2s',
                            }}>{c}</button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
                        {filtered.map(r => (
                            <div key={r.id} className="shadow-premium card-hover" style={{ background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <span style={{ padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#EEF2FF', color: '#1D4ED8' }}>{r.category}</span>
                                    <span style={{ fontSize: 12, color: '#64748B' }}>{r.readTime}</span>
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12, lineHeight: 1.4 }}>{r.title}</h3>
                                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{r.desc}</p>
                                <Link href={`/resources/${r.id}`} className="btn-press" style={{ padding: '12px', borderRadius: 14, fontSize: 14, fontWeight: 600, textAlign: 'center', color: '#1D4ED8', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>Read Article →</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <style jsx>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-only { display: flex !important; } }`}</style>
        </>
    );
}
