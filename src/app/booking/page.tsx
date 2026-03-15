'use client';
import { useState } from 'react';
import Link from 'next/link';
import { lawyers } from '@/data/mockData';
import { Video, Building2, Phone, CheckCircle, Star } from 'lucide-react';

export default function BookingPage() {
    const [step, setStep] = useState(0);
    const [consultationType, setConsultationType] = useState('online');
    const [selectedDate, setSelectedDate] = useState('2025-01-20');
    const [selectedTime, setSelectedTime] = useState('');
    const [caseNote, setCaseNote] = useState('');
    const lawyer = lawyers[0]; // Mock: first lawyer

    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    const fee = consultationType === 'online' ? lawyer.onlineCost : lawyer.visitingCost;

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <header style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#0F172A' }}>LAWZ</span>
                </Link>
                <span style={{ fontSize: 13, color: '#64748B' }}>Book Consultation</span>
            </header>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {/* Left - Form */}
                <div style={{ flex: '1 1 480px' }}>
                    <div className="shadow-premium animate-fadeIn" style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #E2E8F0' }}>
                        {step === 0 && (
                            <>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Choose Consultation Type</h2>
                                <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
                                    {[
                                        { key: 'online', icon: <Video size={28} />, label: 'Online Video', desc: 'Connect via secure video call', fee: lawyer.onlineCost },
                                        { key: 'in-person', icon: <Building2 size={28} />, label: 'In-Person Visit', desc: `Visit at ${lawyer.city} office`, fee: lawyer.visitingCost },
                                        { key: 'phone', icon: <Phone size={28} />, label: 'Phone Call', desc: 'Quick phone consultation', fee: lawyer.onlineCost },
                                    ].map(t => (
                                        <button key={t.key} onClick={() => setConsultationType(t.key)} className="btn-press" style={{
                                            display: 'flex', alignItems: 'center', gap: 16, padding: 20, borderRadius: 16,
                                            border: consultationType === t.key ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                                            background: consultationType === t.key ? '#EEF2FF' : '#fff', textAlign: 'left',
                                        }}>
                                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>{t.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{t.label}</p>
                                                <p style={{ fontSize: 12, color: '#64748B' }}>{t.desc}</p>
                                            </div>
                                            <span style={{ fontSize: 16, fontWeight: 700, color: '#1D4ED8' }}>৳{t.fee.toLocaleString()}</span>
                                        </button>
                                    ))}
                                </div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Select Date</h3>
                                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, color: '#0F172A', background: '#F8FAFC', marginBottom: 24 }} />
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Select Time</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
                                    {timeSlots.map(t => (
                                        <button key={t} onClick={() => setSelectedTime(t)} className="btn-press" style={{
                                            padding: '12px', borderRadius: 12, fontSize: 13, fontWeight: 500,
                                            border: selectedTime === t ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                                            background: selectedTime === t ? '#EEF2FF' : '#F8FAFC',
                                            color: selectedTime === t ? '#1D4ED8' : '#475569',
                                        }}>{t}</button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(1)} className="btn-press" style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 15, fontWeight: 600, color: '#fff', background: '#1D4ED8', boxShadow: '0 4px 12px rgba(29,78,216,0.3)' }}>Continue →</button>
                            </>
                        )}
                        {step === 1 && (
                            <>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Case Details</h2>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Describe your case or question</label>
                                    <textarea value={caseNote} onChange={e => setCaseNote(e.target.value)} placeholder="Briefly explain what you need help with…" rows={5} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC', resize: 'vertical', marginBottom: 24 }} />
                                </div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button onClick={() => setStep(0)} className="btn-press" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>← Back</button>
                                    <button onClick={() => setStep(2)} className="btn-press" style={{ flex: 1, padding: '14px', borderRadius: 14, fontSize: 15, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>Review & Pay →</button>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Confirm & Pay</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                                    {[
                                        { label: 'Lawyer', value: lawyer.name },
                                        { label: 'Type', value: consultationType },
                                        { label: 'Date', value: selectedDate },
                                        { label: 'Time', value: selectedTime || 'Not selected' },
                                        { label: 'Consultation Fee', value: `৳${fee.toLocaleString()}` },
                                        { label: 'Platform Fee', value: '৳50' },
                                    ].map(r => (
                                        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                                            <span style={{ fontSize: 14, color: '#64748B' }}>{r.label}</span>
                                            <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{r.value}</span>
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                                        <span style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Total</span>
                                        <span style={{ fontSize: 18, fontWeight: 700, color: '#1D4ED8' }}>৳{(fee + 50).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button onClick={() => setStep(1)} className="btn-press" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>← Back</button>
                                    <button onClick={() => setStep(3)} className="btn-press" style={{ flex: 1, padding: '16px', borderRadius: 14, fontSize: 15, fontWeight: 600, color: '#fff', background: '#10B981', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>Pay & Confirm</button>
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <div className="animate-scaleIn" style={{ textAlign: 'center', padding: 24 }}>
                                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', margin: '0 auto 24px' }}>
                                    <CheckCircle size={40} />
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Booking Confirmed!</h2>
                                <p style={{ fontSize: 15, color: '#64748B', marginBottom: 32 }}>Your consultation with {lawyer.name} has been booked. You&apos;ll receive a confirmation email shortly.</p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <Link href="/dashboard" className="btn-press" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>View in Dashboard</Link>
                                    <Link href="/find-lawyers" className="btn-press" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>Browse Lawyers</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right - Lawyer Summary */}
                <div style={{ width: 320, flexShrink: 0 }}>
                    <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #E2E8F0', position: 'sticky', top: 80 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #F1F5F9' }}>
                            <img src={lawyer.photo} alt={lawyer.name} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                            <div>
                                <p style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{lawyer.name}</p>
                                <p style={{ fontSize: 12, color: '#64748B' }}>{lawyer.practiceAreas[0]}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                                    <span style={{ fontSize: 12, fontWeight: 600 }}>{lawyer.rating}</span>
                                    <span style={{ fontSize: 11, color: '#64748B' }}>({lawyer.reviewCount})</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: '#64748B' }}>Visiting Fee</span>
                                <span style={{ fontWeight: 600 }}>৳{lawyer.visitingCost.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: '#64748B' }}>Online Fee</span>
                                <span style={{ fontWeight: 600, color: '#1D4ED8' }}>৳{lawyer.onlineCost.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: '#64748B' }}>Response Time</span>
                                <span style={{ fontWeight: 600 }}>{lawyer.responseTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
