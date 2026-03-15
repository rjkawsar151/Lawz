'use client';
import { useState } from 'react';
import Link from 'next/link';
import { lawyers, bookings, posts } from '@/data/mockData';

import { BarChart2, CheckCircle2, Users, FileText, Flag, Tags, Star, Wallet, LineChart, Settings, Scale, ClipboardList, Calendar, AlertTriangle, MessageSquare, MoreVertical, Search } from 'lucide-react';

const sidebarItems = [
    { icon: <BarChart2 size={18} />, label: 'Overview', key: 'overview' },
    { icon: <CheckCircle2 size={18} />, label: 'Lawyer Approvals', key: 'approvals' },
    { icon: <Users size={18} />, label: 'User Management', key: 'users' },
    { icon: <FileText size={18} />, label: 'Content Moderation', key: 'moderation' },
    { icon: <Flag size={18} />, label: 'Reports', key: 'reports' },
    { icon: <Tags size={18} />, label: 'Categories', key: 'categories' },
    { icon: <Star size={18} />, label: 'Featured', key: 'featured' },
    { icon: <Wallet size={18} />, label: 'Payments', key: 'payments' },
    { icon: <LineChart size={18} />, label: 'Analytics', key: 'analytics' },
    { icon: <Settings size={18} />, label: 'Settings', key: 'settings' },
];

const pendingApprovals = [
    { id: 101, name: 'Adv. Rezaul Karim', area: 'Tax Law', country: 'Bangladesh', date: '2025-01-10', status: 'pending', photo: 'https://ui-avatars.com/api/?name=Rezaul+Karim&background=7C3AED&color=fff&size=200' },
    { id: 102, name: 'Adv. Sharmin Akhter', area: 'Family Law', country: 'Bangladesh', date: '2025-01-11', status: 'in_review', photo: 'https://ui-avatars.com/api/?name=Sharmin+Akhter&background=EC4899&color=fff&size=200' },
    { id: 103, name: 'Adv. Faruk Hossain', area: 'Criminal Law', country: 'Bangladesh', date: '2025-01-12', status: 'changes_requested', photo: 'https://ui-avatars.com/api/?name=Faruk+Hossain&background=F59E0B&color=fff&size=200' },
];

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex' }}>
            <aside style={{ width: 260, background: '#0F172A', padding: '24px 16px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', marginBottom: 32 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#fff' }}>LAWZ Admin</span>
                </Link>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    {sidebarItems.map(item => (
                        <button key={item.key} onClick={() => setActiveSection(item.key)} style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '12px', borderRadius: 12,
                            fontSize: 14, fontWeight: 500, textAlign: 'left', width: '100%',
                            color: activeSection === item.key ? '#fff' : '#94A3B8',
                            background: activeSection === item.key ? 'rgba(29,78,216,0.3)' : 'transparent',
                        }}>{item.icon} {item.label}
                            {item.key === 'approvals' && <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#EF4444', color: '#fff' }}>3</span>}
                            {item.key === 'reports' && <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#F59E0B', color: '#fff' }}>5</span>}
                        </button>
                    ))}
                </nav>
            </aside>

            <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
                <div style={{ maxWidth: 1100 }}>
                    {activeSection === 'overview' && (
                        <>
                            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 32 }}>Admin Overview</h1>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                                {[
                                    { icon: <Users size={20} />, label: 'Total Users', value: '8,432', change: '+156 this month', color: '#1D4ED8', bg: '#EEF2FF' },
                                    { icon: <Scale size={20} />, label: 'Total Lawyers', value: '2,547', change: '+42 this month', color: '#10B981', bg: '#D1FAE5' },
                                    { icon: <ClipboardList size={20} />, label: 'Pending Approvals', value: '3', change: 'Needs attention', color: '#EF4444', bg: '#FEE2E2' },
                                    { icon: <Calendar size={20} />, label: 'Total Bookings', value: '12,893', change: '+834 this month', color: '#06B6D4', bg: '#CFFAFE' },
                                    { icon: <Wallet size={20} />, label: 'Revenue', value: '৳2.4M', change: '+18% growth', color: '#F59E0B', bg: '#FEF3C7' },
                                    { icon: <MessageSquare size={20} />, label: 'Feed Posts', value: '4,567', change: '+312 this week', color: '#8B5CF6', bg: '#EDE9FE' },
                                ].map(c => (
                                    <div key={c.label} className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 20, border: '1px solid #E2E8F0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{c.icon}</div>
                                            <span style={{ fontSize: 12, color: '#64748B' }}>{c.label}</span>
                                        </div>
                                        <p style={{ fontSize: 24, fontWeight: 700, color: '#0F172A' }}>{c.value}</p>
                                        <p style={{ fontSize: 12, color: c.color, fontWeight: 500 }}>{c.change}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Pending Approvals Preview */}
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0', marginBottom: 24 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Pending Lawyer Approvals</h3>
                                    <button onClick={() => setActiveSection('approvals')} style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8' }}>View all →</button>
                                </div>
                                {pendingApprovals.map(a => (
                                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
                                        <img src={a.photo} alt={a.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{a.name}</p>
                                            <p style={{ fontSize: 12, color: '#64748B' }}>{a.area} · {a.country} · Submitted {a.date}</p>
                                        </div>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                                            background: a.status === 'pending' ? '#FEF3C7' : a.status === 'in_review' ? '#DBEAFE' : '#FEE2E2',
                                            color: a.status === 'pending' ? '#92400E' : a.status === 'in_review' ? '#1D4ED8' : '#DC2626',
                                        }}>{a.status.replace('_', ' ')}</span>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#fff', background: '#10B981' }}>Approve</button>
                                            <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#EF4444', border: '1px solid #FCA5A5' }}>Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Recent Activity */}
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Recent Activity</h3>
                                {[
                                    { time: '2 min ago', text: 'New lawyer application from Adv. Rezaul Karim', icon: <ClipboardList size={18} color="#0F172A" /> },
                                    { time: '15 min ago', text: 'Post flagged for review in Community', icon: <Flag size={18} color="#EF4444" /> },
                                    { time: '1 hour ago', text: 'Adv. Sabrina Chowdhury approved and published', icon: <CheckCircle2 size={18} color="#10B981" /> },
                                    { time: '3 hours ago', text: 'User report: fake profile complaint', icon: <AlertTriangle size={18} color="#F59E0B" /> },
                                    { time: '5 hours ago', text: 'New booking payment processed (৳5,000)', icon: <Wallet size={18} color="#1D4ED8" /> },
                                ].map((a, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                                        <span style={{ fontSize: 16 }}>{a.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 13, color: '#334155' }}>{a.text}</p>
                                            <p style={{ fontSize: 11, color: '#94A3B8' }}>{a.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeSection === 'approvals' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Lawyer Approval Queue</h2>
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                            {['Applicant', 'Practice Area', 'Country', 'Submitted', 'Status', 'Actions'].map(h => (
                                                <th key={h} style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#64748B', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingApprovals.map(a => (
                                            <tr key={a.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                <td style={{ padding: '14px 16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <img src={a.photo} alt={a.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{a.name}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{a.area}</td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{a.country}</td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{a.date}</td>
                                                <td style={{ padding: '14px 16px' }}>
                                                    <span style={{
                                                        padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                                                        background: a.status === 'pending' ? '#FEF3C7' : a.status === 'in_review' ? '#DBEAFE' : '#FEE2E2',
                                                        color: a.status === 'pending' ? '#92400E' : a.status === 'in_review' ? '#1D4ED8' : '#DC2626',
                                                    }}>{a.status.replace('_', ' ')}</span>
                                                </td>
                                                <td style={{ padding: '14px 16px' }}>
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#fff', background: '#10B981' }}>Approve</button>
                                                        <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#F59E0B', border: '1px solid #FCD34D' }}>Changes</button>
                                                        <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#EF4444', border: '1px solid #FCA5A5' }}>Reject</button>
                                                        <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#1D4ED8', background: '#EEF2FF' }}>View</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeSection === 'analytics' && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Platform Analytics</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                                {[
                                    { title: 'User Growth', data: [{ label: 'Total users', val: '8,432' }, { label: 'New this month', val: '156' }, { label: 'Active today', val: '2,341' }] },
                                    { title: 'Lawyer Stats', data: [{ label: 'Total lawyers', val: '2,547' }, { label: 'Verified', val: '2,198' }, { label: 'Approval rate', val: '94%' }] },
                                    { title: 'Booking Volume', data: [{ label: 'Total bookings', val: '12,893' }, { label: 'Completed', val: '10,456' }, { label: 'Conversion rate', val: '27%' }] },
                                    { title: 'Revenue', data: [{ label: 'Total revenue', val: '৳2.4M' }, { label: 'This month', val: '৳342K' }, { label: 'Growth', val: '+18%' }] },
                                    { title: 'Top Searched', data: [{ label: 'Criminal Law', val: '3,456' }, { label: 'Family Law', val: '2,891' }, { label: 'Property', val: '2,134' }] },
                                    { title: 'Community', data: [{ label: 'Total posts', val: '4,567' }, { label: 'Active discussions', val: '234' }, { label: 'Reports handled', val: '45' }] },
                                ].map(card => (
                                    <div key={card.title} className="shadow-premium" style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>{card.title}</h4>
                                        {card.data.map(d => (
                                            <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                                                <span style={{ fontSize: 13, color: '#64748B' }}>{d.label}</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{d.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeSection === 'reports' && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A' }}>Community Reports</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '8px 16px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                    <Search size={16} color="#64748B" />
                                    <input placeholder="Search reports..." style={{ border: 'none', outline: 'none', fontSize: 13, width: 200 }} />
                                </div>
                            </div>
                            <div className="shadow-premium" style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                            {['Reported Post/User', 'Reason', 'Reported By', 'Date', 'Status', 'Actions'].map(h => (
                                                <th key={h} style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#64748B', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { id: 1, target: 'Guest User (Post)', reason: 'Inappropriate content', reporter: 'John Doe', date: '2 hrs ago', status: 'Pending' },
                                            { id: 2, target: 'Adv. M. Islam (Profile)', reason: 'Fake credentials suspected', reporter: 'Anonymous', date: '1 day ago', status: 'Investigating' },
                                            { id: 3, target: 'Sarah K. (Comment)', reason: 'Spam/Advertising', reporter: 'Jane Smith', date: '2 days ago', status: 'Resolved' },
                                        ].map(r => (
                                            <tr key={r.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{r.target}</td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{r.reason}</td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{r.reporter}</td>
                                                <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{r.date}</td>
                                                <td style={{ padding: '14px 16px' }}>
                                                    <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: r.status === 'Resolved' ? '#D1FAE5' : r.status === 'Pending' ? '#FEE2E2' : '#FEF3C7', color: r.status === 'Resolved' ? '#065F46' : r.status === 'Pending' ? '#DC2626' : '#92400E' }}>{r.status}</span>
                                                </td>
                                                <td style={{ padding: '14px 16px' }}>
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#1D4ED8', background: '#EEF2FF' }}>Review</button>
                                                        <button className="btn-press" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#EF4444', border: '1px solid #FCA5A5' }}>Remove</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {!['overview', 'approvals', 'analytics', 'reports'].includes(activeSection) && (
                        <div style={{ textAlign: 'center', padding: 80 }}>
                            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', color: '#94A3B8' }}>{sidebarItems.find(i => i.key === activeSection)?.icon}</div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 8, textTransform: 'capitalize' }}>{activeSection.replace('_', ' ')}</h3>
                            <p style={{ fontSize: 15, color: '#64748B' }}>Admin {activeSection} section coming soon.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
