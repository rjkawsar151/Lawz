'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { lawyers, practiceAreas, courts } from '@/data/mockData';
import { Search, SlidersHorizontal, MapPin, Star, Clock, CheckCircle2, Heart, Menu, X } from 'lucide-react';

/* Shared Header/Footer - reusing from main page inline */
function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <>
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 80,
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{ maxWidth: 1320, width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>L</div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#0F172A', letterSpacing: '-0.5px' }}>LAWZ</span>
                    </Link>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
                        {[{ label: 'Home', href: '/' }, { label: 'Find Lawyers', href: '/find-lawyers' }, { label: 'Community', href: '/community' }, { label: 'Resources', href: '/resources' }].map(item => (
                            <Link key={item.href} href={item.href} style={{ fontSize: 15, fontWeight: 500, color: item.href === '/find-lawyers' ? '#1D4ED8' : '#475569' }}>{item.label}</Link>
                        ))}
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
                        <Link href="/auth/login" style={{ padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>Sign In</Link>
                        <Link href="/auth/register-lawyer" style={{ padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>Join as Lawyer</Link>
                    </div>
                    <button className="mobile-only" onClick={() => setMobileOpen(!mobileOpen)} style={{ width: 44, height: 44, borderRadius: 12, display: 'none', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9', color: '#0F172A' }}>
                        <Menu size={24} />
                    </button>
                </div>
            </header>
            {mobileOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '85%', maxWidth: 360, height: '100%', background: '#fff', padding: '96px 24px 24px', animation: 'slideIn 0.3s ease-out' }} onClick={e => e.stopPropagation()}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[{ label: 'Home', href: '/' }, { label: 'Find Lawyers', href: '/find-lawyers' }, { label: 'Community', href: '/community' }, { label: 'Resources', href: '/resources' }].map(item => (
                                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ padding: '14px 16px', borderRadius: 14, fontSize: 16, fontWeight: 500, color: '#0F172A', display: 'block' }}>{item.label}</Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
            <style jsx>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-only { display: flex !important; } }`}</style>
        </>
    );
}

function Footer() {
    return (
        <footer style={{ background: '#0F172A', color: '#fff', padding: '48px 24px 24px' }}>
            <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff' }}>L</div>
                        <span style={{ fontWeight: 800, fontSize: 18, fontFamily: 'var(--font-heading)' }}>LAWZ</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#64748B', maxWidth: 260 }}>Law Within Reach</p>
                </div>
                <p style={{ fontSize: 12, color: '#475569' }}>© 2025 LAWZ. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default function FindLawyersPage() {
    const [search, setSearch] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedCourt, setSelectedCourt] = useState('');
    const [sortBy, setSortBy] = useState('relevance');
    const [showFilters, setShowFilters] = useState(false);
    const [maxFee, setMaxFee] = useState(10000);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [availableToday, setAvailableToday] = useState(false);
    const [experienceMin, setExperienceMin] = useState(0);

    const filteredLawyers = useMemo(() => {
        let result = [...lawyers];
        if (search) {
            const s = search.toLowerCase();
            result = result.filter(l =>
                l.name.toLowerCase().includes(s) ||
                l.practiceAreas.some(a => a.toLowerCase().includes(s)) ||
                l.court.toLowerCase().includes(s) ||
                l.city.toLowerCase().includes(s)
            );
        }
        if (selectedArea) result = result.filter(l => l.practiceAreas.includes(selectedArea));
        if (selectedCourt) result = result.filter(l => l.court === selectedCourt);
        if (verifiedOnly) result = result.filter(l => l.verified);
        if (availableToday) result = result.filter(l => l.availableToday);
        if (experienceMin > 0) result = result.filter(l => l.experience >= experienceMin);
        result = result.filter(l => l.onlineCost <= maxFee);

        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.onlineCost - b.onlineCost); break;
            case 'price-high': result.sort((a, b) => b.onlineCost - a.onlineCost); break;
            case 'experience': result.sort((a, b) => b.experience - a.experience); break;
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
        }
        return result;
    }, [search, selectedArea, selectedCourt, sortBy, maxFee, verifiedOnly, availableToday, experienceMin]);

    const activeFilters = [
        selectedArea && { label: selectedArea, clear: () => setSelectedArea('') },
        selectedCourt && { label: selectedCourt, clear: () => setSelectedCourt('') },
        verifiedOnly && { label: 'Verified only', clear: () => setVerifiedOnly(false) },
        availableToday && { label: 'Available today', clear: () => setAvailableToday(false) },
        experienceMin > 0 && { label: `${experienceMin}+ years`, clear: () => setExperienceMin(0) },
        maxFee < 10000 && { label: `Max ৳${maxFee}`, clear: () => setMaxFee(10000) },
    ].filter(Boolean) as { label: string; clear: () => void }[];

    return (
        <>
            <Header />
            <main style={{ paddingTop: 80, minHeight: '100vh', background: '#F8FAFC' }}>
                {/* Page Header */}
                <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '32px 24px' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Find Lawyers</h1>
                        <p style={{ fontSize: 15, color: '#64748B', maxWidth: 600 }}>Search verified lawyers by practice area, court, experience, location, fee, language, and consultation type.</p>
                    </div>
                </div>

                {/* Search + Controls */}
                <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '16px 24px' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', borderRadius: 16, padding: '0 16px', border: '1px solid #E2E8F0', height: 52 }}>
                            <Search size={18} color="#64748B" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, practice area, court, city…" style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14, color: '#0F172A', height: '100%' }} />
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)} className="btn-press" style={{
                            padding: '0 20px', height: 52, borderRadius: 16, fontSize: 14, fontWeight: 600,
                            color: showFilters ? '#fff' : '#475569',
                            background: showFilters ? '#1D4ED8' : '#F8FAFC',
                            border: showFilters ? 'none' : '1px solid #E2E8F0',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            <SlidersHorizontal size={18} /> Filters
                        </button>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                            padding: '0 16px', height: 52, borderRadius: 16, fontSize: 14,
                            border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#475569',
                            cursor: 'pointer', minWidth: 160,
                        }}>
                            <option value="relevance">Sort: Relevance</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="experience">Most Experienced</option>
                            <option value="rating">Highest Rated</option>
                            <option value="reviews">Most Reviewed</option>
                        </select>
                        <span style={{ fontSize: 14, color: '#64748B', whiteSpace: 'nowrap' }}>{filteredLawyers.length} lawyers found</span>
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div style={{ maxWidth: 1320, margin: '12px auto 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {activeFilters.map(f => (
                                <span key={f.label} style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                                    background: '#EEF2FF', color: '#3730A3',
                                }}>
                                    {f.label}
                                    <button onClick={f.clear} style={{ fontSize: 14, color: '#3730A3', lineHeight: 1 }}>×</button>
                                </span>
                            ))}
                            <button onClick={() => { setSelectedArea(''); setSelectedCourt(''); setVerifiedOnly(false); setAvailableToday(false); setExperienceMin(0); setMaxFee(10000); }} style={{ fontSize: 12, fontWeight: 500, color: '#EF4444' }}>Clear all</button>
                        </div>
                    )}
                </div>

                <div style={{ maxWidth: 1320, margin: '0 auto', padding: '24px', display: 'flex', gap: 24 }}>
                    {/* Filter Sidebar (Desktop) */}
                    <aside style={{
                        width: 280, flexShrink: 0,
                        display: showFilters ? 'block' : 'none',
                    }} className="filter-sidebar">
                        <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #E2E8F0', position: 'sticky', top: 104 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>Filters</h3>

                            {/* Practice Area */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Practice Area</label>
                                <select value={selectedArea} onChange={e => setSelectedArea(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13, color: '#0F172A', background: '#F8FAFC' }}>
                                    <option value="">All areas</option>
                                    {practiceAreas.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                                </select>
                            </div>

                            {/* Court */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Court</label>
                                <select value={selectedCourt} onChange={e => setSelectedCourt(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13, color: '#0F172A', background: '#F8FAFC' }}>
                                    <option value="">All courts</option>
                                    {courts.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>

                            {/* Experience */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Min Experience: {experienceMin} years</label>
                                <input type="range" min={0} max={25} value={experienceMin} onChange={e => setExperienceMin(Number(e.target.value))} style={{ width: '100%', accentColor: '#1D4ED8' }} />
                            </div>

                            {/* Max Fee */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Max Online Fee: ৳{maxFee.toLocaleString()}</label>
                                <input type="range" min={500} max={10000} step={500} value={maxFee} onChange={e => setMaxFee(Number(e.target.value))} style={{ width: '100%', accentColor: '#1D4ED8' }} />
                            </div>

                            {/* Toggles */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: '#475569', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} style={{ accentColor: '#1D4ED8', width: 18, height: 18 }} />
                                    Verified only
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: '#475569', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={availableToday} onChange={e => setAvailableToday(e.target.checked)} style={{ accentColor: '#1D4ED8', width: 18, height: 18 }} />
                                    Available today
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {filteredLawyers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', color: '#CBD5E1' }}>
                                    <Search size={64} />
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>No lawyers found</h3>
                                <p style={{ fontSize: 15, color: '#64748B', marginBottom: 24 }}>Try adjusting your filters or search terms</p>
                                <button onClick={() => { setSearch(''); setSelectedArea(''); setSelectedCourt(''); setVerifiedOnly(false); setAvailableToday(false); setExperienceMin(0); setMaxFee(10000); }} className="btn-press" style={{
                                    padding: '12px 24px', borderRadius: 14, fontSize: 14, fontWeight: 600,
                                    color: '#fff', background: '#1D4ED8',
                                }}>Clear all filters</button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
                                {filteredLawyers.map(l => (
                                    <div key={l.id} className="card-hover shadow-premium" style={{
                                        background: '#fff', borderRadius: 24, padding: 24,
                                        border: '1px solid #E2E8F0',
                                    }}>
                                        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                                            <img src={l.photo} alt={l.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #DBEAFE' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{l.name}</h3>
                                                    {l.verified && <CheckCircle2 size={16} color="#1D4ED8" fill="#DBEAFE" />}
                                                    {l.featured && <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: '#FEF3C7', color: '#92400E' }}>Featured</span>}
                                                </div>
                                                <p style={{ fontSize: 13, color: '#475569', marginBottom: 4 }}>{l.title} · {l.designation}</p>
                                                <p style={{ fontSize: 12, color: '#64748B' }}>{l.experience} years · {l.city}, {l.country}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                                            {l.practiceAreas.map(pa => (
                                                <span key={pa} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: '#EEF2FF', color: '#3730A3' }}>{pa}</span>
                                            ))}
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: '#F0FDF4', color: '#166534' }}><MapPin size={12} /> {l.court}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '12px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                                                <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{l.rating}</span>
                                                <span style={{ fontSize: 12, color: '#64748B' }}>({l.reviewCount})</span>
                                            </div>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748B' }}><Clock size={12} /> {l.responseTime}</span>
                                            {l.availableToday && <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>Available today</span>}
                                        </div>
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
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <Link href={`/lawyers/${l.id}`} className="btn-press" style={{ flex: 1, padding: '12px 0', borderRadius: 14, fontSize: 13, fontWeight: 600, textAlign: 'center', color: '#1D4ED8', background: '#EEF2FF' }}>View Profile</Link>
                                            <Link href={`/booking?lawyer=${l.id}`} className="btn-press" style={{ flex: 1, padding: '12px 0', borderRadius: 14, fontSize: 13, fontWeight: 600, textAlign: 'center', color: '#fff', background: '#1D4ED8' }}>Book Now</Link>
                                            <button className="btn-press" style={{ width: 44, height: 44, borderRadius: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', flexShrink: 0 }}>
                                                <Heart size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
          .filter-sidebar { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; background: rgba(15,23,42,0.5) !important; z-index: 1001 !important; width: 100% !important; }
        }
      `}</style>
        </>
    );
}
