'use client';
import { useState } from 'react';
import Link from 'next/link';
import { practiceAreas, courts } from '@/data/mockData';
import { Camera, Lightbulb, FileText, FileBadge, ClipboardCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const steps = ['Account', 'Professional', 'Consultation', 'Verification', 'Review'];

export default function RegisterLawyerPage() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', title: '', designation: '', experience: '',
        selectedAreas: [] as string[], court: '', city: '', country: 'Bangladesh', bio: '',
        languages: ['Bengali'], visitingCost: '', onlineCost: '', consultationTypes: ['In-person', 'Online'],
        barNumber: '', termsAccepted: false,
    });

    const update = (key: string, value: unknown) => setFormData(prev => ({ ...prev, [key]: value }));

    const toggleArea = (area: string) => {
        const areas = formData.selectedAreas;
        update('selectedAreas', areas.includes(area) ? areas.filter(a => a !== area) : [...areas, area]);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            {/* Top bar */}
            <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#0F172A' }}>LAWZ</span>
                </Link>
                <span style={{ fontSize: 13, color: '#64748B' }}>Step {step + 1} of {steps.length}</span>
            </div>

            {/* Progress */}
            <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '20px 24px' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {steps.map((s, i) => (
                            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%', fontSize: 13, fontWeight: 600,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: i <= step ? '#1D4ED8' : '#E2E8F0',
                                    color: i <= step ? '#fff' : '#94A3B8',
                                    transition: 'all 0.3s',
                                }}>{i < step ? '✓' : i + 1}</div>
                                <span style={{ fontSize: 11, fontWeight: 500, color: i <= step ? '#1D4ED8' : '#94A3B8', textAlign: 'center' }}>{s}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
                        {steps.map((_, i) => (
                            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#1D4ED8' : '#E2E8F0', transition: 'background 0.3s' }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px' }}>
                <div className="shadow-premium animate-fadeIn" style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #E2E8F0' }}>
                    {step === 0 && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Account Basics</h2>
                            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Create your LAWZ lawyer account</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Full Name *</label>
                                    <input value={formData.name} onChange={e => update('name', e.target.value)} placeholder="Adv. Full Name" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Email *</label>
                                    <input type="email" value={formData.email} onChange={e => update('email', e.target.value)} placeholder="name@example.com" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Phone *</label>
                                    <input type="tel" value={formData.phone} onChange={e => update('phone', e.target.value)} placeholder="+880-XXXX-XXXXXX" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Password *</label>
                                    <input type="password" value={formData.password} onChange={e => update('password', e.target.value)} placeholder="Create a strong password" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                </div>
                                <div style={{ padding: 16, borderRadius: 14, background: '#F0FDF4', border: '1px solid #D1FAE5', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Camera size={18} color="#065F46" />
                                    <p style={{ fontSize: 13, color: '#065F46' }}>You can upload a profile photo after your account is created</p>
                                </div>
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Professional Details</h2>
                            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Tell us about your legal practice</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Title</label>
                                        <select value={formData.title} onChange={e => update('title', e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }}>
                                            <option value="">Select title</option>
                                            <option>Advocate</option><option>Senior Advocate</option><option>Barrister</option><option>Attorney</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Experience (years)</label>
                                        <input type="number" value={formData.experience} onChange={e => update('experience', e.target.value)} placeholder="e.g. 10" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Designation</label>
                                    <input value={formData.designation} onChange={e => update('designation', e.target.value)} placeholder="e.g. Family Law Specialist" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Practice Areas *</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {practiceAreas.map(pa => (
                                            <button key={pa.id} type="button" onClick={() => toggleArea(pa.name)} className="btn-press" style={{
                                                padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                                                background: formData.selectedAreas.includes(pa.name) ? '#1D4ED8' : '#F8FAFC',
                                                color: formData.selectedAreas.includes(pa.name) ? '#fff' : '#475569',
                                                border: `1px solid ${formData.selectedAreas.includes(pa.name) ? '#1D4ED8' : '#E2E8F0'}`,
                                                transition: 'all 0.2s',
                                            }}>{pa.name}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Court / Working Area</label>
                                    <select value={formData.court} onChange={e => update('court', e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }}>
                                        <option value="">Select court</option>
                                        {courts.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>City</label>
                                        <input value={formData.city} onChange={e => update('city', e.target.value)} placeholder="e.g. Dhaka" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Country</label>
                                        <input value={formData.country} onChange={e => update('country', e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Short Bio</label>
                                    <textarea value={formData.bio} onChange={e => update('bio', e.target.value)} placeholder="Write a brief professional bio…" rows={4} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC', resize: 'vertical' }} />
                                </div>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Consultation Setup</h2>
                            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Set your fees and availability</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Visiting Cost (৳)</label>
                                        <input type="number" value={formData.visitingCost} onChange={e => update('visitingCost', e.target.value)} placeholder="e.g. 2000" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Online Cost (৳)</label>
                                        <input type="number" value={formData.onlineCost} onChange={e => update('onlineCost', e.target.value)} placeholder="e.g. 1500" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Consultation Types</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {['In-person', 'Online Video', 'Phone', 'Chat'].map(t => (
                                            <button key={t} type="button" className="btn-press" style={{
                                                padding: '10px 16px', borderRadius: 14, fontSize: 13, fontWeight: 500,
                                                background: formData.consultationTypes.includes(t) ? '#EEF2FF' : '#F8FAFC',
                                                color: formData.consultationTypes.includes(t) ? '#1D4ED8' : '#475569',
                                                border: `1px solid ${formData.consultationTypes.includes(t) ? '#DBEAFE' : '#E2E8F0'}`,
                                            }}>{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ padding: 16, borderRadius: 14, background: '#FFFBEB', border: '1px solid #FEF3C7', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <Lightbulb size={18} color="#92400E" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <p style={{ fontSize: 13, color: '#92400E' }}>Tip: Competitive pricing attracts more clients. You can always adjust your fees later.</p>
                                </div>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Verification</h2>
                            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Verify your credentials for the verified badge</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Bar Registration / License Number *</label>
                                    <input value={formData.barNumber} onChange={e => update('barNumber', e.target.value)} placeholder="e.g. BD-SC-2008-4521" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, background: '#F8FAFC' }} />
                                </div>
                                <div style={{ padding: 20, borderRadius: 16, border: '2px dashed #E2E8F0', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: '#94A3B8' }}><FileText size={32} /></div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>Upload ID Verification</p>
                                    <p style={{ fontSize: 12, color: '#64748B' }}>National ID, Passport, or Government ID</p>
                                    <button className="btn-press" style={{ marginTop: 12, padding: '8px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, color: '#1D4ED8', background: '#EEF2FF' }}>Choose File</button>
                                </div>
                                <div style={{ padding: 20, borderRadius: 16, border: '2px dashed #E2E8F0', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: '#94A3B8' }}><FileBadge size={32} /></div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>Upload Certificate / Chamber Proof</p>
                                    <p style={{ fontSize: 12, color: '#64748B' }}>Bar council certificate, chamber registration, or similar</p>
                                    <button className="btn-press" style={{ marginTop: 12, padding: '8px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, color: '#1D4ED8', background: '#EEF2FF' }}>Choose File</button>
                                </div>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#475569' }}>
                                    <input type="checkbox" checked={formData.termsAccepted} onChange={e => update('termsAccepted', e.target.checked)} style={{ accentColor: '#1D4ED8', width: 16, height: 16, marginTop: 2 }} />
                                    <span>I confirm that all information provided is accurate. I agree to the <a href="#" style={{ color: '#1D4ED8', fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: '#1D4ED8', fontWeight: 600 }}>Professional Guidelines</a>.</span>
                                </label>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Review & Submit</h2>
                            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Review your information before submitting</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    { label: 'Name', value: formData.name || 'Not provided' },
                                    { label: 'Email', value: formData.email || 'Not provided' },
                                    { label: 'Phone', value: formData.phone || 'Not provided' },
                                    { label: 'Title', value: formData.title || 'Not provided' },
                                    { label: 'Designation', value: formData.designation || 'Not provided' },
                                    { label: 'Experience', value: formData.experience ? `${formData.experience} years` : 'Not provided' },
                                    { label: 'Practice Areas', value: formData.selectedAreas.join(', ') || 'Not selected' },
                                    { label: 'Court', value: formData.court || 'Not selected' },
                                    { label: 'Location', value: `${formData.city || '—'}, ${formData.country}` },
                                    { label: 'Visiting Cost', value: formData.visitingCost ? `৳${formData.visitingCost}` : 'Not set' },
                                    { label: 'Online Cost', value: formData.onlineCost ? `৳${formData.onlineCost}` : 'Not set' },
                                    { label: 'Bar Number', value: formData.barNumber || 'Not provided' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                                        <span style={{ fontSize: 13, color: '#64748B' }}>{item.label}</span>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 24, padding: 16, borderRadius: 14, background: '#EEF2FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <ClipboardCheck size={20} color="#1E40AF" style={{ flexShrink: 0, marginTop: 2 }} />
                                <p style={{ fontSize: 13, color: '#1E40AF', lineHeight: 1.6 }}>After submission, our team will review your application. You&apos;ll receive email updates on your approval status. This typically takes 1–3 business days.</p>
                            </div>
                        </>
                    )}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #E2E8F0' }}>
                        {step > 0 ? (
                            <button onClick={() => setStep(step - 1)} className="btn-press" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}><ArrowLeft size={16} /> Back</button>
                        ) : <div />}
                        {step < 4 ? (
                            <button onClick={() => setStep(step + 1)} className="btn-press" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#1D4ED8', boxShadow: '0 4px 12px rgba(29,78,216,0.3)' }}>Continue <ArrowRight size={16} /></button>
                        ) : (
                            <Link href="/auth/application-status" className="btn-press" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#10B981', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>Submit Application</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
