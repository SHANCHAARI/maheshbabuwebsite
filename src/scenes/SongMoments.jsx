import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { songEras, allTimeFavorites } from '../data/songs';

gsap.registerPlugin(ScrollTrigger);

const SongMoments = () => {
    const containerRef = useRef(null);
    const [activeSong, setActiveSong] = useState(null);

    useEffect(() => {
        const sections = gsap.utils.toArray('.era-section');

        sections.forEach((section) => {
            gsap.fromTo(section.querySelector('.era-title'),
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(section.querySelectorAll('.song-item'),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, []);

    return (
        <section ref={containerRef} style={{
            minHeight: '100vh',
            background: '#080808',
            position: 'relative',
            padding: '100px 0',
            overflow: 'hidden'
        }}>
            {/* Main Header */}
            <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 10 }}>
                <h2 style={{
                    fontSize: '5rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '5px'
                }}>
                    MUSICAL <span style={{ color: '#fff', WebkitTextStroke: '0px' }}>ECHOES</span>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', color: '#888', marginTop: '10px' }}>THE VOYAGE OF A SUPERSTAR</p>
            </div>

            {/* Eras Loop */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '150px' }}>
                {songEras.map((era, i) => (
                    <div key={i} className="era-section">
                        {/* Era Title */}
                        <h3 className="era-title" style={{
                            fontSize: '3rem',
                            fontFamily: 'var(--font-heading)',
                            color: era.color,
                            borderLeft: `5px solid ${era.color}`,
                            paddingLeft: '20px',
                            marginBottom: '40px',
                            textTransform: 'uppercase'
                        }}>
                            {era.title}
                        </h3>

                        {/* Songs Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {era.songs.map((song, j) => (
                                <div
                                    key={j}
                                    className="song-item"
                                    onClick={() => setActiveSong({ ...song, color: era.color })}
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `linear-gradient(45deg, ${era.color}22, transparent)`;
                                        e.currentTarget.style.borderColor = era.color;
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <h4 style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '5px' }}>{song.title}</h4>
                                    <p style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase' }}>{song.movie} • {song.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* All Time Favorites Section */}
                <div className="era-section" style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3 className="era-title" style={{
                        fontSize: '4rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--c-gold)',
                        marginBottom: '50px',
                        textShadow: '0 0 30px rgba(197, 160, 89, 0.3)'
                    }}>
                        🏆 ALL-TIME FAVORITES
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                        {allTimeFavorites.map((fav, k) => (
                            <div key={k} className="song-item" style={{
                                padding: '15px 30px',
                                border: '1px solid var(--c-gold)',
                                color: 'var(--c-gold)',
                                borderRadius: '50px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.2rem',
                                textTransform: 'uppercase',
                                background: 'rgba(197, 160, 89, 0.05)'
                            }}>
                                {fav}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lyric Modal */}
            {activeSong && <LyricModal song={activeSong} onClose={() => setActiveSong(null)} />}

            {/* Atmosphere */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none',
                background: 'url("https://so-media.s3.amazonaws.com/design-img/noise-iso.png")',
                opacity: 0.03,
                zIndex: 5
            }} />
        </section>
    );
};

// Reused LyricModal Component (Simplified for brevity)
const LyricModal = ({ song, onClose }) => {
    useEffect(() => {
        gsap.fromTo(".lyric-box", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
    }, []);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(15px)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} onClick={onClose}>
            <div className="lyric-box" style={{ textAlign: 'center', color: 'white', maxWidth: '80%' }}>
                <h2 style={{ fontSize: '3rem', color: song.color, fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>{song.title}</h2>
                <p style={{ fontSize: '1.2rem', color: '#ccc' }}>{song.movie}</p>
                <div style={{ width: '50px', height: '2px', background: 'white', margin: '30px auto' }}></div>
                <p style={{ fontStyle: 'italic', opacity: 0.7 }}>Lyrics loading...</p>
                <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>(Tap to close)</p>
            </div>
        </div>
    );
};

export default SongMoments;
