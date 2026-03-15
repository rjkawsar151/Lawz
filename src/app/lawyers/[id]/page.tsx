'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { lawyers, reviews, posts } from '@/data/mockData';
import { MapPin, Landmark, Calendar, Star, Clock, ClipboardList, Building2, Video, Diamond, MessageSquare, Heart, Share2, CheckCircle2, Flag, Search, Menu, X } from 'lucide-react';


function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 80, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: 1320, width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>L</div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#0F172A', letterSpacing: '-0.5px' }}>LAWZ</span>
                    </Link>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
                        {[{ label: 'Home', href: '/' }, { label: 'Find Lawyers', href: '/find-lawyers' }, { label: 'Community', href: '/community' }, { label: 'Resources', href: '/resources' }].map(item => (
                            <Link key={item.href} href={item.href} style={{ fontSize: 15, fontWeight: 500, color: '#475569' }}>{item.label}</Link>
                        ))}
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
                        <Link href="/auth/login" style={{ padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>Sign In</Link>
                        <Link href="/auth/register-lawyer" style={{ padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>Join as Lawyer</Link>
                    </div>
                    <div className="mobile-only" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
                        <Link href="/find-lawyers" style={{ color: '#0F172A', display: 'flex' }}><Search size={22} /></Link>
                        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9', color: '#0F172A', border: 'none' }}>
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
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

export default function LawyerProfilePage() {
    const params = useParams();
    const id = Number(params.id);
    const lawyer = lawyers.find(l => l.id === id) || lawyers[0];
    const lawyerReviews = reviews.filter(r => r.lawyerId === lawyer.id);
    const lawyerPosts = posts.filter(p => p.authorId === lawyer.id);
    const similarLawyers = lawyers.filter(l => l.id !== lawyer.id && l.practiceAreas.some(a => lawyer.practiceAreas.includes(a))).slice(0, 3);
    const [activeTab, setActiveTab] = useState('about');
    const [showAllBio, setShowAllBio] = useState(false);

    const availSlots = [
        { day: 'Today', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
        { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '3:00 PM', '5:00 PM'] },
        { day: 'Wed', slots: ['10:00 AM', '1:00 PM'] },
        { day: 'Thu', slots: ['9:00 AM', '12:00 PM', '3:00 PM'] },
        { day: 'Fri', slots: ['11:00 AM', '2:00 PM', '4:00 PM'] },
    ];

    return (
        <>
            <Header />
            <main style={{ paddingTop: 80, minHeight: '100vh', background: '#F8FAFC' }}>
                {/* Profile Hero */}
                <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1D4ED8 55%, #06B6D4 100%)', padding: '48px 24px 80px' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                        <Link href="/find-lawyers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>← Back to directory</Link>
                        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <img src={lawyer.photo} alt={lawyer.name} style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)', objectFit: 'cover' }} />
                            <div style={{ flex: 1, minWidth: 280 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#fff' }}>{lawyer.name}</h1>
                                    {lawyer.verified && <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: 'rgba(16,185,129,0.2)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.3)' }}><CheckCircle2 size={14} /> Verified</span>}
                                    {lawyer.featured && <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: 'rgba(245,158,11,0.2)', color: '#FCD34D' }}><Star size={14} fill="#FCD34D" /> Featured</span>}
                                </div>
                                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>{lawyer.title} · {lawyer.designation}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}><MapPin size={16} /> {lawyer.city}, {lawyer.country}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}><Landmark size={16} /> {lawyer.court}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}><Calendar size={16} /> {lawyer.experience} years experience</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                    {lawyer.practiceAreas.map(pa => (
                                        <span key={pa} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>{pa}</span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Star size={16} fill="#FCD34D" color="#FCD34D" />
                                        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{lawyer.rating}</span>
                                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>({lawyer.reviewCount} reviews)</span>
                                    </div>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}><Clock size={16} /> Response: {lawyer.responseTime}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}><ClipboardList size={16} /> {lawyer.consultationsCompleted} consultations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ maxWidth: 1320, margin: '-48px auto 0', padding: '0 24px 48px', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {/* Main Content */}
                        <div style={{ flex: '1 1 600px', minWidth: 320 }}>
                            {/* Tabs */}
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, marginBottom: 20, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', overflowX: 'auto' }}>
                                    {['about', 'reviews', 'posts', 'availability'].map(tab => (
                                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                                            padding: '16px 24px', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                                            color: activeTab === tab ? '#1D4ED8' : '#64748B',
                                            borderBottom: activeTab === tab ? '2px solid #1D4ED8' : '2px solid transparent',
                                            transition: 'all 0.2s', textTransform: 'capitalize',
                                        }}>{tab}</button>
                                    ))}
                                </div>

                                <div style={{ padding: 24 }}>
                                    {activeTab === 'about' && (
                                        <div>
                                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>About</h3>
                                            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, marginBottom: 8 }}>
                                                {showAllBio ? lawyer.bio : lawyer.bio.slice(0, 200) + (lawyer.bio.length > 200 ? '…' : '')}
                                            </p>
                                            {lawyer.bio.length > 200 && (
                                                <button onClick={() => setShowAllBio(!showAllBio)} style={{ fontSize: 14, fontWeight: 600, color: '#1D4ED8' }}>
                                                    {showAllBio ? 'Show less' : 'Read more'}
                                                </button>
                                            )}

                                            <div style={{ marginTop: 32 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Practice Areas</h3>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                    {lawyer.practiceAreas.map(pa => (
                                                        <span key={pa} style={{ padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500, background: '#EEF2FF', color: '#3730A3' }}>{pa}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 32 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Education & Credentials</h3>
                                                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8 }}>{lawyer.education}</p>
                                                <p style={{ fontSize: 14, color: '#475569', marginTop: 8 }}>Bar/License: <strong>{lawyer.barNumber}</strong></p>
                                            </div>

                                            <div style={{ marginTop: 32 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Languages</h3>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                    {lawyer.languages.map(lang => (
                                                        <span key={lang} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }}>{lang}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 32 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Fees</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                                                    <div style={{ padding: 20, borderRadius: 16, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                                        <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Visiting Consultation</p>
                                                        <p style={{ fontSize: 24, fontWeight: 700, color: '#0F172A' }}>৳{lawyer.visitingCost.toLocaleString()}</p>
                                                    </div>
                                                    <div style={{ padding: 20, borderRadius: 16, background: '#EEF2FF', border: '1px solid #DBEAFE' }}>
                                                        <p style={{ fontSize: 12, color: '#1D4ED8', marginBottom: 4 }}>Online Consultation</p>
                                                        <p style={{ fontSize: 24, fontWeight: 700, color: '#1D4ED8' }}>৳{lawyer.onlineCost.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <p style={{ fontSize: 48, fontWeight: 800, color: '#0F172A' }}>{lawyer.rating}</p>
                                                    <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 4 }}>
                                                        {[1, 2, 3, 4, 5].map(s => <span key={s}><Star size={18} fill={s <= Math.round(lawyer.rating) ? '#F59E0B' : '#E2E8F0'} color={s <= Math.round(lawyer.rating) ? '#F59E0B' : '#E2E8F0'} /></span>)}
                                                    </div>
                                                    <p style={{ fontSize: 13, color: '#64748B' }}>{lawyer.reviewCount} reviews</p>
                                                </div>
                                            </div>
                                            {lawyerReviews.length > 0 ? lawyerReviews.map(r => (
                                                <div key={r.id} style={{ padding: '20px 0', borderBottom: '1px solid #F1F5F9' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#3730A3' }}>{r.userName.charAt(0)}</div>
                                                            <div>
                                                                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{r.userName}</p>
                                                                <p style={{ fontSize: 12, color: '#64748B' }}>{r.type} · {r.date}</p>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 2 }}>
                                                            {[1, 2, 3, 4, 5].map(s => <span key={s}><Star size={14} fill={s <= r.rating ? '#F59E0B' : '#E2E8F0'} color={s <= r.rating ? '#F59E0B' : '#E2E8F0'} /></span>)}
                                                        </div>
                                                    </div>
                                                    <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{r.text}</p>
                                                </div>
                                            )) : <p style={{ fontSize: 14, color: '#64748B', textAlign: 'center', padding: 40 }}>No reviews yet</p>}
                                        </div>
                                    )}

                                    {activeTab === 'posts' && (
                                        <div>
                                            {lawyerPosts.length > 0 ? lawyerPosts.map(p => (
                                                <div key={p.id} style={{ padding: '20px 0', borderBottom: '1px solid #F1F5F9' }}>
                                                    <p style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>{p.timestamp} · {p.category}</p>
                                                    <p className="line-clamp-3" style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, marginBottom: 8 }}>{p.text}</p>
                                                    <div style={{ display: 'flex', gap: 16 }}>
                                                        <span style={{ fontSize: 13, color: '#64748B' }}>👏 {p.reactions.clap}</span>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#64748B' }}><MessageSquare size={14} /> {p.commentCount}</span>
                                                    </div>
                                                </div>
                                            )) : <p style={{ fontSize: 14, color: '#64748B', textAlign: 'center', padding: 40 }}>No posts yet</p>}
                                        </div>
                                    )}

                                    {activeTab === 'availability' && (
                                        <div>
                                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Available Slots</h3>
                                            <div style={{ display: 'grid', gap: 16 }}>
                                                {availSlots.map(day => (
                                                    <div key={day.day}>
                                                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 8 }}>{day.day}</p>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                            {day.slots.map(slot => (
                                                                <button key={slot} className="btn-press" style={{
                                                                    padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 500,
                                                                    border: '1px solid #E2E8F0', color: '#475569', background: '#F8FAFC',
                                                                    transition: 'all 0.2s',
                                                                }}>{slot}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Similar Lawyers */}
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 24 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Similar Lawyers</h3>
                                <div style={{ display: 'grid', gap: 16 }}>
                                    {similarLawyers.map(sl => (
                                        <Link href={`/lawyers/${sl.id}`} key={sl.id} style={{ display: 'flex', gap: 16, padding: 16, borderRadius: 16, border: '1px solid #E2E8F0', transition: 'all 0.2s' }}>
                                            <img src={sl.photo} alt={sl.name} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                                            <div style={{ flex: 1 }}>
                                                <p style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{sl.name} {sl.verified && <CheckCircle2 size={14} color="#1D4ED8" />}</p>
                                                <p style={{ fontSize: 12, color: '#64748B' }}>{sl.practiceAreas[0]} · {sl.experience} yrs</p>
                                                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#F59E0B' }}><Star size={12} fill="#F59E0B" color="#F59E0B" /> {sl.rating}</span>
                                                    <span style={{ fontSize: 12, color: '#1D4ED8' }}>৳{sl.onlineCost} online</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Consultation Card */}
                        <div style={{ width: 360, flexShrink: 0 }} className="profile-sidebar">
                            <div className="shadow-premium-lg" style={{ background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #E2E8F0', position: 'sticky', top: 104 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>Book Consultation</h3>
                                <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                                    <div style={{ padding: 16, borderRadius: 16, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B', marginBottom: 4 }}><Building2 size={14} /> Visiting Consultation</p>
                                        <p style={{ fontSize: 22, fontWeight: 700, color: '#0F172A' }}>৳{lawyer.visitingCost.toLocaleString()}</p>
                                    </div>
                                    <div style={{ padding: 16, borderRadius: 16, background: '#EEF2FF', border: '1px solid #DBEAFE' }}>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#1D4ED8', marginBottom: 4 }}><Video size={14} /> Online Consultation</p>
                                        <p style={{ fontSize: 22, fontWeight: 700, color: '#1D4ED8' }}>৳{lawyer.onlineCost.toLocaleString()}</p>
                                    </div>
                                </div>
                                {lawyer.onlineCost <= 1500 && (
                                    <div style={{ padding: '8px 12px', borderRadius: 12, background: '#D1FAE5', textAlign: 'center', marginBottom: 16 }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#065F46' }}><Diamond size={14} fill="#065F46" color="#065F46" /> Affordable consultation</span>
                                    </div>
                                )}
                                <Link href={`/booking?lawyer=${lawyer.id}`} className="btn-press" style={{
                                    display: 'block', padding: '16px', borderRadius: 14, fontSize: 15, fontWeight: 600,
                                    textAlign: 'center', color: '#fff', background: '#1D4ED8',
                                    boxShadow: '0 4px 12px rgba(29,78,216,0.3)', marginBottom: 12,
                                }}>Book Now</Link>
                                <button className="btn-press" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    width: '100%', padding: '14px', borderRadius: 14, fontSize: 14, fontWeight: 600,
                                    color: '#475569', border: '1px solid #E2E8F0', marginBottom: 12,
                                }}><MessageSquare size={16} /> Message</button>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button className="btn-press" style={{ flex: 1, padding: '12px', borderRadius: 14, fontSize: 13, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Heart size={16} /> Save</button>
                                    <button className="btn-press" style={{ flex: 1, padding: '12px', borderRadius: 14, fontSize: 13, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Share2 size={16} /> Share</button>
                                </div>

                                {/* Trust Panel */}
                                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #E2E8F0' }}>
                                    <p style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12 }}>Trust & Verification</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: '#64748B' }}>Verified License</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontWeight: 600 }}><CheckCircle2 size={14} /> Verified</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: '#64748B' }}>Admin Approved</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontWeight: 600 }}><CheckCircle2 size={14} /> Approved</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: '#64748B' }}>Profile Completion</span>
                                            <span style={{ color: '#0F172A', fontWeight: 600 }}>{lawyer.profileCompletion}%</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: '#64748B' }}>Member Since</span>
                                            <span style={{ color: '#0F172A', fontWeight: 600 }}>{lawyer.joinedDate}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: '#64748B' }}>Last Active</span>
                                            <span style={{ color: '#0F172A', fontWeight: 600 }}>{lawyer.lastActive}</span>
                                        </div>
                                    </div>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#EF4444', fontWeight: 500, marginTop: 16 }}><Flag size={14} /> Report Profile</button>
                                </div>
                                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 16, lineHeight: 1.6 }}>Information shown on this page is provided by the lawyer and verified by platform review where applicable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer style={{ background: '#0F172A', color: '#fff', padding: '32px 24px' }}>
                <div style={{ maxWidth: 1320, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748B' }}>© 2025 LAWZ. All rights reserved.</p>
                </div>
            </footer>
            <style jsx>{`@media (max-width: 900px) { .profile-sidebar { width: 100% !important; } }`}</style>
        </>
    );
}
