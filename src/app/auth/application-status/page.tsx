'use client';
import Link from 'next/link';

export default function ApplicationStatusPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div className="shadow-premium-lg animate-scaleIn" style={{ maxWidth: 560, width: '100%', background: '#fff', borderRadius: 28, padding: 48, textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>📋</div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Application Under Review</h1>
                <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, marginBottom: 32 }}>Thank you for applying to LAWZ! Our team is reviewing your credentials and documents. We&apos;ll notify you via email once the review is complete.</p>

                {/* Timeline */}
                <div style={{ textAlign: 'left', marginBottom: 32 }}>
                    {[
                        { status: 'done', label: 'Application Submitted', desc: 'Your profile has been received', icon: '✅' },
                        { status: 'active', label: 'Under Review', desc: 'Admin is verifying your credentials', icon: '🔍' },
                        { status: 'pending', label: 'Documents Verification', desc: 'License and ID verification', icon: '📄' },
                        { status: 'pending', label: 'Approval', desc: 'Your profile goes live on LAWZ', icon: '🎉' },
                    ].map((step, i) => (
                        <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 3 ? 24 : 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: '50%', fontSize: 16,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: step.status === 'done' ? '#D1FAE5' : step.status === 'active' ? '#DBEAFE' : '#F1F5F9',
                                    border: step.status === 'active' ? '2px solid #1D4ED8' : 'none',
                                }}>{step.icon}</div>
                                {i < 3 && <div style={{ width: 2, height: 24, background: step.status === 'done' ? '#10B981' : '#E2E8F0' }} />}
                            </div>
                            <div>
                                <p style={{ fontSize: 14, fontWeight: 600, color: step.status === 'pending' ? '#94A3B8' : '#0F172A' }}>{step.label}</p>
                                <p style={{ fontSize: 12, color: '#64748B' }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ padding: 16, borderRadius: 14, background: '#FFFBEB', border: '1px solid #FEF3C7', marginBottom: 24 }}>
                    <p style={{ fontSize: 13, color: '#92400E' }}>⏱ Typical review time: 1–3 business days</p>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <Link href="/" className="btn-press" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>Go Home</Link>
                    <Link href="/community" className="btn-press" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>Browse Community</Link>
                </div>
            </div>
        </div>
    );
}
