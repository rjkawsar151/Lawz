export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyItems: 'center', textAlign: 'center' }}>
            <div style={{ maxWidth: 640, margin: '0 auto', padding: 48 }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 120, fontWeight: 800, color: '#1D4ED8', lineHeight: 1, marginBottom: 24, letterSpacing: '-0.05em' }}>404</h1>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Page not found</h2>
                <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, marginBottom: 40 }}>The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to the right path.</p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <a href="/" className="btn-press" style={{ padding: '16px 32px', borderRadius: 16, fontSize: 16, fontWeight: 600, color: '#fff', background: '#1D4ED8', boxShadow: '0 4px 12px rgba(29,78,216,0.3)', textDecoration: 'none' }}>Go Home</a>
                    <a href="/find-lawyers" className="btn-press" style={{ padding: '16px 32px', borderRadius: 16, fontSize: 16, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0', background: '#fff', textDecoration: 'none' }}>Find Lawyers</a>
                </div>
            </div>
        </div>
    );
}
