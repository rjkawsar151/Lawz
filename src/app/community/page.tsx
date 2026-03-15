'use client';
import { useState } from 'react';
import Link from 'next/link';
import { posts as initialPosts, lawyers } from '@/data/mockData';
import { Image as ImageIcon, Tag, MapPin, MessageSquare, Share2, Bookmark, MoreHorizontal, User, Menu, X } from 'lucide-react';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 80, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: 1320, width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>L</div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#0F172A', letterSpacing: '-0.5px' }}>LAWZ</span>
                    </Link>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
                        {[{ label: 'Home', href: '/' }, { label: 'Find Lawyers', href: '/find-lawyers' }, { label: 'Community', href: '/community' }, { label: 'Resources', href: '/resources' }].map(item => (
                            <Link key={item.href} href={item.href} style={{ fontSize: 15, fontWeight: 500, color: item.href === '/community' ? '#1D4ED8' : '#475569' }}>{item.label}</Link>
                        ))}
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
                        <Link href="/auth/login" style={{ padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#475569', border: '1px solid #E2E8F0' }}>Sign In</Link>
                        <Link href="/auth/register-lawyer" style={{ padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>Join as Lawyer</Link>
                    </div>
                    <button className="mobile-only" onClick={() => setMobileOpen(!mobileOpen)} style={{ width: 44, height: 44, borderRadius: 12, display: 'none', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9', color: '#0F172A' }}>
                        <Menu size={24} />
                    </button>
                </div>
            </header>
            {mobileOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, background: 'rgba(15,23,42,0.5)' }} onClick={() => setMobileOpen(false)}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '85%', maxWidth: 360, height: '100%', background: '#fff', padding: '96px 24px 24px', animation: 'slideIn 0.3s ease-out' }} onClick={e => e.stopPropagation()}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[{ label: 'Home', href: '/' }, { label: 'Find Lawyers', href: '/find-lawyers' }, { label: 'Community', href: '/community' }, { label: 'Resources', href: '/resources' }].map(item => (
                                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ padding: '14px 16px', borderRadius: 14, fontSize: 16, fontWeight: 500, color: '#0F172A', display: 'block' }}>{item.label}</Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
            <style jsx>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-only { display: flex !important; } }`}</style>
        </>
    );
}

const reactions = ['👏', '🤔', '😢', '😮', '💡'];
const categories = ['All', 'Criminal Law', 'Family Law', 'Corporate Law', 'Property Law', 'Cyber Law', 'Labor Law', 'Immigration', 'Consumer Rights', 'Constitutional Law'];
const trending = ['#KnowYourRights', '#LegalTips', '#CriminalLaw', '#FamilyLaw', '#StartupLaw', '#CyberLaw', '#LaborRights', '#Immigration'];

export default function CommunityPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [feedPosts, setFeedPosts] = useState(initialPosts);
    const [newPostText, setNewPostText] = useState('');
    const [postReactions, setPostReactions] = useState<Record<number, string[]>>({});

    // New interaction states
    const [imageFile, setImageFile] = useState<string | null>(null);
    const [selectedPostTags, setSelectedPostTags] = useState<string[]>([]);
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');

    const handleReaction = (postId: number, emoji: string) => {
        setPostReactions(prev => {
            const existing = prev[postId] || [];
            if (existing.includes(emoji)) return { ...prev, [postId]: existing.filter(e => e !== emoji) };
            return { ...prev, [postId]: [...existing, emoji] };
        });
    };

    const handlePost = () => {
        if (!newPostText.trim() && !imageFile) return;
        const newPost: any = {
            id: Date.now(),
            authorId: 999,
            authorName: 'Guest User',
            authorPhoto: 'https://ui-avatars.com/api/?name=Guest+User&background=F1F5F9&color=64748B',
            authorType: 'user',
            timestamp: 'Just now',
            category: selectedCategory === 'All' ? 'General' : selectedCategory,
            country: 'Bangladesh',
            text: newPostText,
            tags: selectedPostTags,
            reactions: { clap: 0, interesting: 0, wow: 0 },
            commentCount: 0,
            shareCount: 0,
        };
        setFeedPosts([newPost, ...feedPosts]);
        setNewPostText('');
        setImageFile(null);
        setSelectedPostTags([]);
    };

    const handleImageUpload = () => {
        // Mock image upload
        setImageFile('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800');
    };

    const toggleTag = (tag: string) => {
        setSelectedPostTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const handleDelete = (postId: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            setFeedPosts(prev => prev.filter(p => p.id !== postId));
        }
        setMenuOpenId(null);
    };

    const handleReport = (postId: number) => {
        alert('Post has been reported to admins.');
        setMenuOpenId(null);
    };

    const startEditing = (post: any) => {
        setEditingPostId(post.id);
        setEditingText(post.text);
        setMenuOpenId(null);
    };

    const saveEdit = () => {
        if (!editingText.trim()) return;
        setFeedPosts(prev => prev.map(p => p.id === editingPostId ? { ...p, text: editingText } : p));
        setEditingPostId(null);
    };

    const filteredPosts = selectedCategory === 'All' ? feedPosts : feedPosts.filter(p => p.category === selectedCategory);
    const topLawyers = lawyers.filter(l => l.featured || l.rating >= 4.8).slice(0, 5);

    return (
        <>
            <Header />
            <main style={{ paddingTop: 80, minHeight: '100vh', background: '#F8FAFC' }}>
                <div style={{ maxWidth: 1320, margin: '0 auto', padding: '24px', display: 'flex', gap: 24 }}>
                    {/* Left Sidebar */}
                    <aside style={{ width: 240, flexShrink: 0 }} className="community-sidebar-left">
                        <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 20, border: '1px solid #E2E8F0', position: 'sticky', top: 104, marginBottom: 20 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Categories</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {categories.map(c => (
                                    <button key={c} onClick={() => setSelectedCategory(c)} style={{
                                        padding: '8px 12px', borderRadius: 12, fontSize: 13, fontWeight: 500, textAlign: 'left',
                                        color: selectedCategory === c ? '#1D4ED8' : '#475569',
                                        background: selectedCategory === c ? '#EEF2FF' : 'transparent',
                                        transition: 'all 0.2s',
                                    }}>{c}</button>
                                ))}
                            </div>
                        </div>
                        <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 20, border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Trending</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {trending.map(t => (
                                    <span key={t} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: '#F8FAFC', color: '#1D4ED8', border: '1px solid #E2E8F0', cursor: 'pointer' }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Feed */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Composer */}
                        <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 20, border: '1px solid #E2E8F0', marginBottom: 20, display: 'flex', gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8', flexShrink: 0 }}>
                                <User size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <textarea value={newPostText} onChange={e => setNewPostText(e.target.value)} placeholder="Share a legal update, question, or insight…" style={{ width: '100%', background: '#F8FAFC', borderRadius: 16, padding: '12px 16px', border: '1px solid #E2E8F0', marginBottom: 12, resize: 'none', fontSize: 14, color: '#0F172A', outline: 'none' }} rows={2} />
                                {imageFile && (
                                    <div style={{ position: 'relative', marginBottom: 12 }}>
                                        <img src={imageFile} alt="Upload preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 16 }} />
                                        <button onClick={() => setImageFile(null)} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '50%', padding: 4 }}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                {selectedPostTags.length > 0 && (
                                    <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                                        {selectedPostTags.map(tag => (
                                            <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: '#EEF2FF', color: '#1D4ED8', fontSize: 12, fontWeight: 500 }}>
                                                {tag} <X size={12} cursor="pointer" onClick={() => toggleTag(tag)} />
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                    <button onClick={handleImageUpload} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: imageFile ? '#1D4ED8' : '#64748B' }}>
                                        <ImageIcon size={16} /> Image
                                    </button>
                                    <button onClick={() => toggleTag('#LegalHelp')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: selectedPostTags.includes('#LegalHelp') ? '#1D4ED8' : '#64748B' }}>
                                        <Tag size={16} /> Tag
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#64748B' }}>
                                        <MapPin size={16} /> Location
                                    </button>
                                    <button onClick={handlePost} className="btn-press" style={{ marginLeft: 'auto', padding: '8px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, color: '#fff', background: newPostText.trim() || imageFile ? '#1D4ED8' : '#94A3B8', cursor: newPostText.trim() || imageFile ? 'pointer' : 'not-allowed' }}>Post</button>
                                </div>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {filteredPosts.map(p => (
                                <article key={p.id} className="shadow-premium card-hover" style={{ background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #E2E8F0' }}>
                                    {/* Author */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <img src={p.authorPhoto} alt={p.authorName} style={{ width: 44, height: 44, borderRadius: '50%' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{p.authorName}</span>
                                                {p.authorType === 'verified-lawyer' && <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: '#DBEAFE', color: '#1D4ED8' }}>Verified Lawyer</span>}
                                                {p.authorType === 'user' && <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: '#F1F5F9', color: '#64748B' }}>Member</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <span style={{ fontSize: 12, color: '#64748B' }}>{p.timestamp}</span>
                                                <span style={{ fontSize: 12, color: '#94A3B8' }}>·</span>
                                                <span style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 500 }}>{p.category}</span>
                                                {p.country && <><span style={{ fontSize: 12, color: '#94A3B8' }}>·</span><span style={{ fontSize: 12, color: '#64748B' }}>🌍 {p.country}</span></>}
                                            </div>
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <button onClick={() => setMenuOpenId(menuOpenId === p.id ? null : p.id)} style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                                                <MoreHorizontal size={20} />
                                            </button>
                                            {menuOpenId === p.id && (
                                                <div className="shadow-premium" style={{ position: 'absolute', right: 0, top: 40, background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', width: 140, zIndex: 10, padding: 6 }}>
                                                    {p.authorId === 999 ? (
                                                        <>
                                                            <button onClick={() => startEditing(p)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 13, color: '#0F172A', borderRadius: 8, transition: 'background 0.2s' }} className="card-hover">Edit Post</button>
                                                            <button onClick={() => handleDelete(p.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 13, color: '#EF4444', borderRadius: 8, transition: 'background 0.2s' }} className="card-hover">Delete Post</button>
                                                        </>
                                                    ) : (
                                                        <button onClick={() => handleReport(p.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: 13, color: '#EF4444', borderRadius: 8, transition: 'background 0.2s' }} className="card-hover">Report Post</button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Post badges */}
                                    {'isQuestion' in p && p.isQuestion && (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 999, background: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 600, marginBottom: 12 }}>❓ Question</div>
                                    )}
                                    {'isEvent' in p && p.isEvent && (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 999, background: '#DBEAFE', color: '#1D4ED8', fontSize: 12, fontWeight: 600, marginBottom: 12 }}>📅 Event</div>
                                    )}

                                    {/* Content */}
                                    {editingPostId === p.id ? (
                                        <div style={{ marginBottom: 16 }}>
                                            <textarea value={editingText} onChange={e => setEditingText(e.target.value)} style={{ width: '100%', background: '#F8FAFC', borderRadius: 12, padding: '12px', border: '1px solid #E2E8F0', resize: 'none', fontSize: 14, color: '#0F172A', outline: 'none' }} rows={3} />
                                            <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                                                <button onClick={() => setEditingPostId(null)} style={{ padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#64748B' }}>Cancel</button>
                                                <button onClick={saveEdit} style={{ padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', background: '#1D4ED8' }}>Save</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8, marginBottom: 16, whiteSpace: 'pre-line' }}>{p.text}</p>
                                    )}

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                                        {p.tags.map(t => <span key={t} style={{ fontSize: 13, color: '#1D4ED8', fontWeight: 500, cursor: 'pointer' }}>{t}</span>)}
                                    </div>

                                    {/* Action Stats */}
                                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, marginBottom: 12 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748B' }}>
                                            <span>👏 {p.reactions.clap + ((postReactions[p.id] || []).includes('👏') ? 1 : 0)}{p.reactions.interesting ? ` · 💡 ${p.reactions.interesting + ((postReactions[p.id] || []).includes('💡') ? 1 : 0)}` : ''}</span>
                                            <span>{p.commentCount} comments · {p.shareCount} shares</span>
                                        </div>
                                    </div>

                                    {/* Action Bar */}
                                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            {reactions.map(emoji => (
                                                <button key={emoji} onClick={() => handleReaction(p.id, emoji)} className="btn-press" style={{
                                                    width: 36, height: 36, borderRadius: 10, fontSize: 16,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    background: (postReactions[p.id] || []).includes(emoji) ? '#EEF2FF' : 'transparent',
                                                    transition: 'all 0.2s',
                                                }}>{emoji}</button>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button style={{ fontSize: 13, fontWeight: 500, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <MessageSquare size={16} /> Comment
                                            </button>
                                            <button style={{ fontSize: 13, fontWeight: 500, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Share2 size={16} /> Share
                                            </button>
                                            <button style={{ fontSize: 13, fontWeight: 500, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Bookmark size={16} /> Save
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <aside style={{ width: 280, flexShrink: 0 }} className="community-sidebar-right">
                        <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 20, border: '1px solid #E2E8F0', position: 'sticky', top: 104, marginBottom: 20 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Suggested Lawyers</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {topLawyers.map(l => (
                                    <Link href={`/lawyers/${l.id}`} key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px', borderRadius: 12, transition: 'background 0.2s' }}>
                                        <img src={l.photo} alt={l.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</p>
                                            <p style={{ fontSize: 11, color: '#64748B' }}>{l.practiceAreas[0]}</p>
                                        </div>
                                        <button className="btn-press" style={{ padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: '#1D4ED8', background: '#EEF2FF' }}>Follow</button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="shadow-premium" style={{ background: '#fff', borderRadius: 24, padding: 20, border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Community Guidelines</h3>
                            <ul style={{ fontSize: 12, color: '#64748B', lineHeight: 1.8, paddingLeft: 16 }}>
                                <li>Be respectful and professional</li>
                                <li>No legal advice without proper context</li>
                                <li>Content is for general information only</li>
                                <li>Report inappropriate content</li>
                                <li>Verified expert answers are marked</li>
                            </ul>
                            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 12, lineHeight: 1.6 }}>Community content does not create a lawyer-client relationship.</p>
                        </div>
                    </aside>
                </div>
            </main>
            <footer style={{ background: '#0F172A', color: '#fff', padding: '32px 24px' }}>
                <div style={{ maxWidth: 1320, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748B' }}>© 2025 LAWZ. All rights reserved.</p>
                </div>
            </footer>
            <style jsx>{`@media (max-width: 1024px) { .community-sidebar-right { display: none !important; } } @media (max-width: 768px) { .community-sidebar-left { display: none !important; } .desktop-nav { display: none !important; } .mobile-only { display: flex !important; } }`}</style>
        </>
    );
}
