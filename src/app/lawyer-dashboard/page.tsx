'use client';
import { useState } from 'react';
import Link from 'next/link';
import { bookings, lawyers, reviews, posts } from '@/data/mockData';

import { BarChart2, User, CheckCircle2, Calendar, MessageSquare, FileText, Star, Wallet, LineChart, Settings, Eye } from 'lucide-react';

const sidebarItems = [
    { icon: <BarChart2 size={18} />, label: 'Overview', key: 'overview' },
    { icon: <User size={18} />, label: 'Profile', key: 'profile' },
    { icon: <CheckCircle2 size={18} />, label: 'Verification', key: 'verification' },
    { icon: <Calendar size={18} />, label: 'Bookings', key: 'bookings' },
    { icon: <MessageSquare size={18} />, label: 'Messages', key: 'messages' },
    { icon: <FileText size={18} />, label: 'Posts', key: 'posts' },
    { icon: <Star size={18} />, label: 'Reviews', key: 'reviews' },
    { icon: <Wallet size={18} />, label: 'Earnings', key: 'earnings' },
    { icon: <LineChart size={18} />, label: 'Analytics', key: 'analytics' },
    { icon: <Settings size={18} />, label: 'Settings', key: 'settings' },
];

export default function LawyerDashboard() {
    const [activeSection, setActiveSection] = useState('overview');
    const lawyer = lawyers[0]; // Mock: first lawyer
    const myBookings = bookings.filter(b => b.lawyerId === lawyer.id);
    const myReviews = reviews.filter(r => r.lawyerId === lawyer.id);
    const myPosts = posts.filter(p => p.authorId === lawyer.id);

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex' }}>
            <aside style={{ width: 260, background: '#fff', borderRight: '1px solid #E2E8F0', padding: '24px 16px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', marginBottom: 32 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#0F172A' }}>LAWZ</span>
                </Link>
                <div style={{ padding: 16, borderRadius: 16, background: '#F8FAFC', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={lawyer.photo} alt={lawyer.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{lawyer.name}</p>
                        <p style={{ fontSize: 12, color: '#1D4ED8' }}>✓ Verified Lawyer</p>
                    </div>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    {sidebarItems.map(item => (
                        <button key={item.key} onClick={() => setActiveSection(item.key)} style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '12px', borderRadius: 12,
                            fontSize: 14, fontWeight: 500, textAlign: 'left', width: '100%',
                            color: activeSection === item.key ? '#1D4ED8' : '#475569',
                            background: activeSection === item.key ? '#EEF2FF' : 'transparent',
                        }}>{item.icon} {item.label}</button>
                    ))}
                </nav>
            </aside>

            <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
                <div style={{ maxWidth: 1000 }}>
                    {activeSection === 'overview' && (
                        <>
                            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 32 }}>Dashboard Overview</h1>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                                {[
                                    { icon: <Eye size={20} />, label: 'Profile Views', value: '1,247', change: '+12%', color: '#1D4ED8', bg: '#EEF2FF' },
                                    { icon: <Calendar size={20} />, label: 'Bookings', value: String(myBookings.length), change: '+3', color: '#10B981', bg: '#D1FAE5' },
                                    { icon: <Star size={20} />, label: 'Rating', value: String(lawyer.rating), change: `${lawyer.reviewCount} reviews`, color: '#F59E0B', bg: '#FEF3C7' },
                                    { icon: <Wallet size={20} />, label: 'Earnings', value: '৳47,500', change: 'This month', color: '#06B6D4', bg: '#CFFAFE' },
                                    { icon: <MessageSquare size={20} />, label: 'Messages', value: '23', change: '5 unread', color: '#8B5CF6', bg: '#EDE9FE' },
                                    { icon: <FileText size={20} />, label: 'Posts', value: String(myPosts.length), change: 'Published', color: '#EC4899', bg: '#FDF2F8' },
                                ].map(c => (
                                    <div key={c.label} className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 20, border: '1px solid #E2E8F0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>{c.icon}</div>
                                            <span style={{ fontSize: 12, color: '#64748B' }}>{c.label}</span>
                                        </div>
                                        <p style={{ fontSize: 24, fontWeight: 700, color: '#0F172A' }}>{c.value}</p>
                                        <p style={{ fontSize: 12, color: c.color, fontWeight: 500 }}>{c.change}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Upcoming Sessions */}
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Upcoming Sessions</h3>
                                {myBookings.filter(b => b.status !== 'completed').map(b => (
                                    <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{b.notes}</p>
                                            <p style={{ fontSize: 12, color: '#64748B' }}>{b.date} · {b.time} · {b.type}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: b.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7', color: b.status === 'confirmed' ? '#065F46' : '#92400E' }}>{b.status}</span>
                                            <button className="btn-press" style={{ padding: '6px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, color: '#1D4ED8', background: '#EEF2FF' }}>View</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeSection === 'verification' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Verification Status</h2>
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0' }}>
                                <div style={{ padding: 20, borderRadius: 16, background: '#D1FAE5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><CheckCircle2 size={24} /></div>
                                    <div>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#065F46' }}>Verified & Approved</p>
                                        <p style={{ fontSize: 13, color: '#047857' }}>Your profile is live and visible to the public</p>
                                    </div>
                                </div>
                                {[
                                    { label: 'Bar Registration', status: 'Verified', value: lawyer.barNumber },
                                    { label: 'ID Verification', status: 'Verified', value: 'National ID uploaded' },
                                    { label: 'Certificate Proof', status: 'Verified', value: 'Bar council certificate' },
                                    { label: 'Profile Completion', status: `${lawyer.profileCompletion}%`, value: 'Almost complete' },
                                ].map(v => (
                                    <div key={v.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{v.label}</p>
                                            <p style={{ fontSize: 12, color: '#64748B' }}>{v.value}</p>
                                        </div>
                                        <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>{v.status}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeSection === 'analytics' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Analytics</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                                {[
                                    { title: 'Profile Views', data: [{ label: 'This week', val: 187 }, { label: 'Last week', val: 165 }, { label: 'This month', val: 1247 }] },
                                    { title: 'Booking Funnel', data: [{ label: 'Profile visits', val: 1247 }, { label: 'Book clicked', val: 342 }, { label: 'Completed', val: 89 }] },
                                    { title: 'Top Practice Areas', data: [{ label: 'Criminal Law', val: 456 }, { label: 'Civil Litigation', val: 312 }, { label: 'Corporate', val: 189 }] },
                                    { title: 'Post Engagement', data: [{ label: 'Total reactions', val: 1823 }, { label: 'Comments', val: 456 }, { label: 'Shares', val: 234 }] },
                                ].map(card => (
                                    <div key={card.title} className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>{card.title}</h4>
                                        {card.data.map(d => (
                                            <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                                                <span style={{ fontSize: 13, color: '#64748B' }}>{d.label}</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{d.val.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeSection === 'reviews' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Your Reviews</h2>
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: 16, borderRadius: 16, background: '#F8FAFC' }}>
                                    <p style={{ fontSize: 36, fontWeight: 800, color: '#0F172A' }}>{lawyer.rating}</p>
                                    <div>
                                        <div style={{ display: 'flex', gap: 2 }}>{[1, 2, 3, 4, 5].map(s => <span key={s}><Star size={18} fill={s <= Math.round(lawyer.rating) ? '#F59E0B' : '#E2E8F0'} color={s <= Math.round(lawyer.rating) ? '#F59E0B' : '#E2E8F0'} /></span>)}</div>
                                        <p style={{ fontSize: 13, color: '#64748B' }}>{lawyer.reviewCount} total reviews</p>
                                    </div>
                                </div>
                                {myReviews.map(r => (
                                    <div key={r.id} style={{ padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#3730A3' }}>{r.userName.charAt(0)}</div>
                                                <div>
                                                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{r.userName}</p>
                                                    <p style={{ fontSize: 11, color: '#64748B' }}>{r.type} · {r.date}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 2 }}>{[1, 2, 3, 4, 5].map(s => <span key={s}><Star size={12} fill={s <= r.rating ? '#F59E0B' : '#E2E8F0'} color={s <= r.rating ? '#F59E0B' : '#E2E8F0'} /></span>)}</div>
                                        </div>
                                        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{r.text}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {['profile', 'bookings', 'messages', 'posts', 'earnings', 'settings'].includes(activeSection) && !['reviews', 'verification', 'analytics', 'overview'].includes(activeSection) && (
                        <div style={{ textAlign: 'center', padding: 80 }}>
                            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', color: '#94A3B8' }}>{sidebarItems.find(i => i.key === activeSection)?.icon}</div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 8, textTransform: 'capitalize' }}>{activeSection}</h3>
                            <p style={{ fontSize: 15, color: '#64748B' }}>This section will be available soon.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
