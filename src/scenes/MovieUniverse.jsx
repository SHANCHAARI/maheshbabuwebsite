import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { movies } from '../data/movies';
import { soundManager } from '../utils/SoundManager';

gsap.registerPlugin(ScrollTrigger);

const MovieUniverse = ({ onMovieSelect }) => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        const pin = gsap.fromTo(sectionRef.current, {
            translateX: 0
        }, {
            translateX: `-${movies.length * 100}vw`, // 1 intro + 4 movies = 5 slides. Move 4 times.
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: () => "+=" + (triggerRef.current.offsetWidth * 2), // Scroll distance
                scrub: 0.6,
                pin: true,
                anticipatePin: 1
            }
        });

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <div ref={triggerRef} style={{ overflow: 'hidden' }}> {/* Trigger Wrapper */}

            {/* The Horizontal Movable Strip */}
            <div ref={sectionRef} style={{
                display: 'flex',
                flexWrap: 'nowrap',
                width: `${(movies.length + 1) * 100}vw`, // Dynamic width
                height: '100vh'
            }}>

                {/* 1. Intro Panel */}
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#0a0a0a',
                    flexShrink: 0,
                    position: 'relative'
                }}>
                    {/* Background Image/Gradient */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, #222 0%, #000 70%)',
                        zIndex: 0
                    }} />

                    <h2 style={{
                        fontSize: isMobile ? '12vw' : '8vw', // Larger on mobile
                        color: 'white',
                        zIndex: 2,
                        fontFamily: 'var(--font-heading)',
                        textAlign: 'center',
                        lineHeight: 0.9,
                        padding: isMobile ? '0 20px' : '0'
                    }}>
                        CHOOSE YOUR <br /> <span style={{ color: 'var(--c-primary)', fontStyle: 'italic' }}>ERA</span>
                    </h2>
                </div>

                {/* 2. Movie Panels */}
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => {
                            soundManager.playClickImpact();
                            onMovieSelect(movie);
                        }}
                        onMouseEnter={() => soundManager.playHoverSwoosh()}
                        style={{
                            width: '100vw',
                            height: '100vh',
                            flexShrink: 0,
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            background: '#000'
                        }}
                    >
                        {/* Dynamic Background with Image Blur */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${movie.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.3,
                            filter: 'blur(10px) grayscale(50%)',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }} />

                        {/* Color Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(to right, ${movie.color}cc, #000000ee)`,
                            zIndex: 2,
                            mixBlendMode: 'multiply'
                        }} />

                        {/* Content Container */}
                        <div style={{
                            position: 'relative',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row', // STACK ON MOBILE
                            alignItems: 'center',
                            gap: isMobile ? '20px' : '5vw',
                            transform: isMobile ? 'none' : 'perspective(1000px) rotateY(10deg)', // Remove 3D on mobile for clarity
                            pointerEvents: 'none',
                            padding: '20px'
                        }}>
                            {/* Poster Image */}
                            <div style={{
                                width: isMobile ? '70vw' : '30vw',
                                height: isMobile ? '45vh' : '70vh',
                                border: `4px solid ${movie.color}`,
                                boxShadow: `10px 10px 30px rgba(0,0,0,0.8)`,
                                overflow: 'hidden',
                                background: '#000',
                                borderRadius: '4px',
                                flexShrink: 0
                            }}>
                                <img src={movie.image} alt={movie.title} style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'contrast(1.1) saturate(1.1)'
                                }} />
                            </div>

                            {/* Text Info */}
                            <div style={{ maxWidth: isMobile ? '90vw' : '40vw', color: 'white', textAlign: isMobile ? 'center' : 'left' }}>
                                <h2 style={{
                                    fontSize: isMobile ? '3rem' : '6vw',
                                    lineHeight: 0.9,
                                    fontFamily: 'var(--font-heading)',
                                    marginBottom: isMobile ? '10px' : '20px',
                                    textShadow: '0 10px 30px black'
                                }}>
                                    {movie.title}
                                </h2>
                                <p style={{
                                    fontSize: isMobile ? '1rem' : '1.2rem',
                                    fontFamily: 'var(--font-body)',
                                    marginBottom: isMobile ? '20px' : '30px',
                                    borderLeft: isMobile ? 'none' : `5px solid ${movie.color}`,
                                    paddingLeft: isMobile ? '0' : '20px'
                                }}>
                                    "{movie.shortDialogue}"
                                </p>
                                <button style={{
                                    padding: isMobile ? '10px 30px' : '15px 40px',
                                    background: 'white',
                                    color: 'black',
                                    border: 'none',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: isMobile ? '1.2rem' : '1.5rem',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px'
                                }}>
                                    Enter Scene
                                </button>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default MovieUniverse;
