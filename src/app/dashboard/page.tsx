'use client';
import { useState } from 'react';
import Link from 'next/link';
import { lawyers, bookings, posts } from '@/data/mockData';

import { BarChart2, Calendar, Heart, MessageSquare, FileText, Star, Bell, Settings, User, LogOut } from 'lucide-react';

const sidebarItems = [
    { icon: <BarChart2 size={18} />, label: 'Overview', key: 'overview' },
    { icon: <Calendar size={18} />, label: 'Bookings', key: 'bookings' },
    { icon: <Heart size={18} />, label: 'Saved Lawyers', key: 'saved' },
    { icon: <MessageSquare size={18} />, label: 'Messages', key: 'messages' },
    { icon: <FileText size={18} />, label: 'Community Posts', key: 'posts' },
    { icon: <Star size={18} />, label: 'Reviews', key: 'reviews' },
    { icon: <Bell size={18} />, label: 'Notifications', key: 'notifications' },
    { icon: <Settings size={18} />, label: 'Settings', key: 'settings' },
];

export default function UserDashboard() {
    const [activeSection, setActiveSection] = useState('overview');
    const savedLawyers = lawyers.slice(0, 5);
    const userBookings = bookings.slice(0, 5);

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex' }}>
            {/* Sidebar */}
            <aside style={{ width: 260, background: '#fff', borderRight: '1px solid #E2E8F0', padding: '24px 16px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', marginBottom: 32 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#0F172A' }}>LAWZ</span>
                </Link>
                {/* User info */}
                <div style={{ padding: '16px', borderRadius: 16, background: '#F8FAFC', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}><User size={20} /></div>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Rahim Uddin</p>
                        <p style={{ fontSize: 12, color: '#64748B' }}>Member</p>
                    </div>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    {sidebarItems.map(item => (
                        <button key={item.key} onClick={() => setActiveSection(item.key)} style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 12px', borderRadius: 12,
                            fontSize: 14, fontWeight: 500, textAlign: 'left', width: '100%',
                            color: activeSection === item.key ? '#1D4ED8' : '#475569',
                            background: activeSection === item.key ? '#EEF2FF' : 'transparent',
                            transition: 'all 0.2s',
                        }}>{item.icon} {item.label}</button>
                    ))}
                </nav>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#EF4444', marginTop: 'auto' }}><LogOut size={18} /> Sign Out</Link>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
                <div style={{ maxWidth: 1000 }}>
                    {activeSection === 'overview' && (
                        <>
                            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Welcome back, Rahim</h1>
                            <p style={{ fontSize: 15, color: '#64748B', marginBottom: 32 }}>Here&apos;s an overview of your activity</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
                                {[
                                    { icon: <Calendar size={20} />, label: 'Upcoming', value: '3', desc: 'Consultations', color: '#1D4ED8', bg: '#EEF2FF' },
                                    { icon: <Heart size={20} />, label: 'Saved', value: '5', desc: 'Lawyers', color: '#EC4899', bg: '#FDF2F8' },
                                    { icon: <MessageSquare size={20} />, label: 'Community', value: '12', desc: 'Posts & comments', color: '#06B6D4', bg: '#CFFAFE' },
                                    { icon: <Bell size={20} />, label: 'New', value: '7', desc: 'Notifications', color: '#F59E0B', bg: '#FEF3C7' },
                                ].map(c => (
                                    <div key={c.label} className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 20, border: '1px solid #E2E8F0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 12, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>{c.icon}</div>
                                            <span style={{ fontSize: 13, fontWeight: 500, color: '#64748B' }}>{c.label}</span>
                                        </div>
                                        <p style={{ fontSize: 28, fontWeight: 700, color: '#0F172A' }}>{c.value}</p>
                                        <p style={{ fontSize: 12, color: '#64748B' }}>{c.desc}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Recent Bookings */}
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0', marginBottom: 24 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Upcoming Consultations</h3>
                                {userBookings.filter(b => b.status !== 'completed').slice(0, 3).map(b => {
                                    const l = lawyers.find(la => la.id === b.lawyerId)!;
                                    return (
                                        <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
                                            <img src={l.photo} alt={l.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{l.name}</p>
                                                <p style={{ fontSize: 12, color: '#64748B' }}>{b.date} · {b.time} · {b.type}</p>
                                            </div>
                                            <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: b.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7', color: b.status === 'confirmed' ? '#065F46' : '#92400E' }}>{b.status}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {activeSection === 'bookings' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Your Bookings</h2>
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                            {['Lawyer', 'Date', 'Time', 'Type', 'Fee', 'Status'].map(h => (
                                                <th key={h} style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#64748B', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map(b => {
                                            const l = lawyers.find(la => la.id === b.lawyerId)!;
                                            return (
                                                <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <img src={l.photo} alt={l.name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                                                            <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{l.name}</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{b.date}</td>
                                                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{b.time}</td>
                                                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{b.type}</td>
                                                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>৳{b.fee}</td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <span style={{
                                                            padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                                                            background: b.status === 'completed' ? '#D1FAE5' : b.status === 'confirmed' ? '#DBEAFE' : '#FEF3C7',
                                                            color: b.status === 'completed' ? '#065F46' : b.status === 'confirmed' ? '#1D4ED8' : '#92400E',
                                                        }}>{b.status}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeSection === 'saved' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Saved Lawyers</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                                {savedLawyers.map(l => (
                                    <div key={l.id} className="shadow-premium card-hover" style={{ background: '#fff', borderRadius: 20, padding: 20, border: '1px solid #E2E8F0' }}>
                                        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                                            <img src={l.photo} alt={l.name} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                                            <div>
                                                <p style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{l.name} {l.verified && '✓'}</p>
                                                <p style={{ fontSize: 12, color: '#64748B' }}>{l.practiceAreas[0]} · {l.experience} yrs</p>
                                                <p style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 600 }}>৳{l.onlineCost} online</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <Link href={`/lawyers/${l.id}`} className="btn-press" style={{ flex: 1, padding: '10px', borderRadius: 12, fontSize: 12, fontWeight: 600, textAlign: 'center', color: '#1D4ED8', background: '#EEF2FF' }}>View Profile</Link>
                                            <Link href={`/booking?lawyer=${l.id}`} className="btn-press" style={{ flex: 1, padding: '10px', borderRadius: 12, fontSize: 12, fontWeight: 600, textAlign: 'center', color: '#fff', background: '#1D4ED8' }}>Book</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeSection === 'messages' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Messages</h2>
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, border: '1px solid #E2E8F0', display: 'flex', height: 500 }}>
                                <div style={{ width: 280, borderRight: '1px solid #E2E8F0', overflowY: 'auto' }}>
                                    {lawyers.slice(0, 4).map(l => (
                                        <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}>
                                            <img src={l.photo} alt={l.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</p>
                                                <p style={{ fontSize: 12, color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Thank you for the consultation…</p>
                                            </div>
                                            <span style={{ fontSize: 11, color: '#94A3B8' }}>2h</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: 16, borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <img src={lawyers[0].photo} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                                        <div><p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{lawyers[0].name}</p><p style={{ fontSize: 11, color: '#10B981' }}>Online</p></div>
                                    </div>
                                    <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 12 }}>
                                        <div style={{ alignSelf: 'flex-start', maxWidth: '70%', padding: '10px 16px', borderRadius: '16px 16px 16px 4px', background: '#F1F5F9', fontSize: 14, color: '#334155' }}>Hello! I received your booking request for the criminal defense consultation.</div>
                                        <div style={{ alignSelf: 'flex-end', maxWidth: '70%', padding: '10px 16px', borderRadius: '16px 16px 4px 16px', background: '#1D4ED8', fontSize: 14, color: '#fff' }}>Thank you! Can we discuss the case details?</div>
                                        <div style={{ alignSelf: 'flex-start', maxWidth: '70%', padding: '10px 16px', borderRadius: '16px 16px 16px 4px', background: '#F1F5F9', fontSize: 14, color: '#334155' }}>Of course. We can go over everything during the consultation. See you on the 15th!</div>
                                    </div>
                                    <div style={{ padding: 16, borderTop: '1px solid #E2E8F0', display: 'flex', gap: 8 }}>
                                        <input placeholder="Type a message…" style={{ flex: 1, padding: '12px 16px', borderRadius: 14, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                        <button className="btn-press" style={{ padding: '12px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {(activeSection === 'posts' || activeSection === 'reviews' || activeSection === 'notifications' || activeSection === 'settings') && (
                        <div style={{ textAlign: 'center', padding: 80 }}>
                            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', color: '#94A3B8' }}>{
                                activeSection === 'posts' ? <FileText size={64} /> : activeSection === 'reviews' ? <Star size={64} /> : activeSection === 'notifications' ? <Bell size={64} /> : <Settings size={64} />
                            }</div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 8, textTransform: 'capitalize' }}>{activeSection}</h3>
                            <p style={{ fontSize: 15, color: '#64748B' }}>This section is being built. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
