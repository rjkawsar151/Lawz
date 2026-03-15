'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, Heart, BarChart2, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            {/* Left panel */}
            <div className="auth-left-panel" style={{ flex: '1 1 50%', background: 'linear-gradient(135deg, #0F172A 0%, #1D4ED8 55%, #06B6D4 100%)', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48, position: 'absolute', top: 32, left: 32 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>L</div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#fff' }}>LAWZ</span>
                </Link>
                <div style={{ maxWidth: 440 }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>Welcome back to LAWZ</h1>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 32 }}>Access your consultations, saved lawyers, community posts, and manage your legal journey.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { icon: <CheckCircle2 size={16} />, text: 'Access your bookings & consultations' },
                            { icon: <MessageSquare size={16} />, text: 'Continue community conversations' },
                            { icon: <Heart size={16} />, text: 'View saved and followed lawyers' },
                            { icon: <BarChart2 size={16} />, text: 'Track your legal journey' }
                        ].map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                                <span style={{ color: '#fff' }}>{f.icon}</span> {f.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel - Form */}
            <div style={{ flex: '1 1 50%', background: '#fff', padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 420 }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Sign in</h2>
                    <p style={{ fontSize: 15, color: '#64748B', marginBottom: 32 }}>Enter your credentials to access your account</p>

                    <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Email address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" style={{
                                width: '100%', padding: '14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, color: '#0F172A',
                                background: '#F8FAFC', transition: 'border-color 0.2s',
                            }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" style={{
                                    width: '100%', padding: '14px 48px 14px 16px', borderRadius: 16, border: '1px solid #E2E8F0', fontSize: 14, color: '#0F172A',
                                    background: '#F8FAFC',
                                }} />
                                <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ accentColor: '#1D4ED8', width: 16, height: 16 }} /> Remember me
                            </label>
                            <a href="#" style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8' }}>Forgot password?</a>
                        </div>
                        <button type="submit" className="btn-press" style={{
                            width: '100%', padding: '16px', borderRadius: 14, fontSize: 16, fontWeight: 600,
                            color: '#fff', background: '#1D4ED8', boxShadow: '0 4px 12px rgba(29,78,216,0.3)',
                            transition: 'all 0.2s', marginTop: 8,
                        }}>Sign In</button>
                    </form>

                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
                        <p style={{ fontSize: 14, color: '#64748B' }}>Don&apos;t have an account? <Link href="/auth/register" style={{ fontWeight: 600, color: '#1D4ED8' }}>Create account</Link></p>
                        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 12 }}>Are you a lawyer? <Link href="/auth/register-lawyer" style={{ fontWeight: 600, color: '#1D4ED8' }}>Apply here</Link></p>
                    </div>
                </div>
            </div>
            <style jsx>{`@media (max-width: 768px) { .auth-left-panel { display: none !important; } }`}</style>
        </div>
    );
}
