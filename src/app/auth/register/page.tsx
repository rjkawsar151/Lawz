'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });

    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            <div className="auth-left-panel" style={{ flex: '1 1 50%', background: 'linear-gradient(135deg, #0F172A 0%, #1D4ED8 55%, #06B6D4 100%)', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'absolute', top: 32, left: 32 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#fff' }}>LAWZ</span>
                </Link>
                <div style={{ maxWidth: 440 }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Join LAWZ today</h1>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Create your free account to find lawyers, book consultations, and join the legal community.</p>
                </div>
            </div>
            <div style={{ flex: '1 1 50%', background: '#fff', padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 420 }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Create account</h2>
                    <p style={{ fontSize: 15, color: '#64748B', marginBottom: 32 }}>Start your legal journey with LAWZ</p>
                    <form onSubmit={e => { e.preventDefault(); router.push('/'); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Full Name</label>
                            <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, color: '#0F172A', background: '#F8FAFC' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Email address</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="name@example.com" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, color: '#0F172A', background: '#F8FAFC' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Phone number</label>
                            <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+880-XXXX-XXXXXX" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, color: '#0F172A', background: '#F8FAFC' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Password</label>
                            <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Create a strong password" style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, color: '#0F172A', background: '#F8FAFC' }} />
                        </div>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#475569' }}>
                            <input type="checkbox" style={{ accentColor: '#1D4ED8', width: 16, height: 16, marginTop: 2 }} />
                            <span>I agree to the <a href="#" style={{ color: '#1D4ED8', fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: '#1D4ED8', fontWeight: 600 }}>Privacy Policy</a></span>
                        </label>
                        <button type="submit" className="btn-press" style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 16, fontWeight: 600, color: '#fff', background: '#1D4ED8', boxShadow: '0 4px 12px rgba(29,78,216,0.3)', marginTop: 8 }}>Create Account</button>
                    </form>
                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <p style={{ fontSize: 14, color: '#64748B' }}>Already have an account? <Link href="/auth/login" style={{ fontWeight: 600, color: '#1D4ED8' }}>Sign in</Link></p>
                        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 12 }}>Are you a lawyer? <Link href="/auth/register-lawyer" style={{ fontWeight: 600, color: '#1D4ED8' }}>Apply here</Link></p>
                    </div>
                </div>
            </div>
            <style jsx>{`@media (max-width: 768px) { .auth-left-panel { display: none !important; } }`}</style>
        </div>
    );
}
