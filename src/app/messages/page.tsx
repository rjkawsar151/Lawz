'use client';
import { useState } from 'react';
import Link from 'next/link';
import { lawyers } from '@/data/mockData';
import { Search, Calendar, Paperclip, ArrowUp, MessageSquare } from 'lucide-react';

export default function Messages() {
    const [activeChat, setActiveChat] = useState<number | null>(lawyers[0].id);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
            <header style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#0F172A' }}>LAWZ</span>
                </Link>
                <div style={{ display: 'flex', gap: 16 }}>
                    <Link href="/dashboard" style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>Dashboard</Link>
                </div>
            </header>

            <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                {/* Chat List */}
                <div style={{ width: 340, background: '#fff', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: 20, borderBottom: '1px solid #F1F5F9' }}>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Messages</h1>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', display: 'flex', alignItems: 'center' }}><Search size={16} /></span>
                            <input placeholder="Search conversations..." style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13, background: '#F8FAFC' }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {lawyers.slice(0, 8).map((l, i) => (
                            <div key={l.id} onClick={() => setActiveChat(l.id)} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: 16, cursor: 'pointer',
                                background: activeChat === l.id ? '#EEF2FF' : '#fff',
                                borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s',
                            }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={l.photo} alt={l.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                                    {i < 3 && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', background: '#10B981', border: '2px solid #fff' }} />}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</p>
                                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{i === 0 ? 'Just now' : `${i + 1}h`}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: i < 2 ? '#1D4ED8' : '#64748B', fontWeight: i < 2 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {i === 0 ? 'Are we still on for tomorrow?' : 'Here is the document draft you requested…'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                {activeChat ? (() => {
                    const lawyer = lawyers.find(l => l.id === activeChat)!;
                    return (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
                            <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <img src={lawyer.photo} alt={lawyer.name} style={{ width: 44, height: 44, borderRadius: '50%' }} />
                                    <div>
                                        <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{lawyer.name}</p>
                                        <p style={{ fontSize: 12, color: '#10B981', fontWeight: 500 }}>Online</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <Link href={`/lawyers/${lawyer.id}`} className="btn-press" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>Profile</Link>
                                    <button className="btn-press" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}><Calendar size={14} /> Book Consultation</button>
                                </div>
                            </div>

                            <div style={{ flex: 1, padding: 32, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ textAlign: 'center', margin: '24px 0' }}>
                                    <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#E2E8F0', color: '#64748B' }}>Today</span>
                                </div>
                                <div style={{ alignSelf: 'center', padding: 16, borderRadius: 16, background: '#FFFBEB', border: '1px solid #FEF3C7', width: '100%', maxWidth: 500, marginBottom: 16 }}>
                                    <p style={{ fontSize: 13, color: '#92400E', textAlign: 'center', lineHeight: 1.6 }}>Do not share sensitive personal information (passwords, banking details) in chat. Official consultation fees should be paid through the LAWZ platform.</p>
                                </div>
                                <div className="animate-slideUp" style={{ alignSelf: 'flex-end', maxWidth: '70%', padding: '14px 20px', borderRadius: '20px 20px 4px 20px', background: '#1D4ED8', color: '#fff' }}>
                                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>Hello Adv. {lawyer.name.split(' ')[1]}, I have a question regarding the property registration we discussed.</p>
                                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textAlign: 'right', marginTop: 4 }}>10:42 AM</p>
                                </div>
                                <div className="animate-slideUp" style={{ alignSelf: 'flex-start', maxWidth: '70%', padding: '14px 20px', borderRadius: '20px 20px 20px 4px', background: '#fff', border: '1px solid #E2E8F0', color: '#0F172A', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>Hi there! Yes, please let me know what doubt you have. We can quickly clarify it here or during your consultation tomorrow.</p>
                                    <p style={{ fontSize: 10, color: '#94A3B8', textAlign: 'right', marginTop: 4 }}>10:45 AM</p>
                                </div>
                                <div className="animate-slideUp" style={{ alignSelf: 'flex-end', maxWidth: '70%', padding: '14px 20px', borderRadius: '20px 20px 4px 20px', background: '#1D4ED8', color: '#fff' }}>
                                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>Are we still on for tomorrow? I am getting the documents ready.</p>
                                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textAlign: 'right', marginTop: 4 }}>10:46 AM</p>
                                </div>
                            </div>

                            <div style={{ padding: 24, background: '#fff', borderTop: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <button style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}><Paperclip size={20} /></button>
                                    <input placeholder="Type your message here..." style={{ flex: 1, padding: '14px 20px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                    <button className="btn-press" style={{ width: 44, height: 44, borderRadius: 12, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><ArrowUp size={20} /></button>
                                </div>
                            </div>
                        </div>
                    );
                })() : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', color: '#94A3B8' }}><MessageSquare size={48} /></div>
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Select a conversation</h2>
                            <p style={{ fontSize: 14, color: '#64748B' }}>Choose from your existing conversations or start a new one.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
