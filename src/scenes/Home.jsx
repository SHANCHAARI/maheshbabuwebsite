import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { extraDialogues } from '../data/movies';

// Intro Rotation Images (Foreground Heroes)
import h1 from '../assets/intro/hero_khaleja.png';
import h2 from '../assets/intro/hero_nenokkadine.png';
import h3 from '../assets/intro/hero_athadu_green.png';
import h4 from '../assets/intro/hero_athadu_bw.png';
import h5 from '../assets/posters/okkadu_graphic.png';

// Background
import bgMosaic from '../assets/intro/bg_stage_mosaic.png';

const heroImages = [h1, h2, h3, h4, h5];

const Home = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const heroRef = useRef(null);
    const textLayerRef = useRef(null);

    // Random Hero Selection
    const [currentHero] = useState(() => heroImages[Math.floor(Math.random() * heroImages.length)]);
    const [dialogueQueue] = useState(() => [...extraDialogues].sort(() => Math.random() - 0.5));

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Cinematic Entrance
        tl.to(containerRef.current, { opacity: 1, duration: 1 })
            .fromTo(heroRef.current,
                { x: 100, opacity: 0, filter: 'blur(10px)' }, // Slide in from Right
                { x: 0, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.out' }
            )
            .fromTo(titleRef.current,
                { x: -100, opacity: 0, letterSpacing: '20px' }, // Slide in from Left
                { x: 0, opacity: 1, letterSpacing: '0px', duration: 1.5, ease: 'expo.out' },
                "-=1.5"
            );

        // 2. Dialogue Animation (Materialize)
        const subtitleSequence = async () => {
            let index = 0;
            while (true) {
                const text = dialogueQueue[index % dialogueQueue.length];
                const isJaiBabu = text.includes("JAI BABU");

                const el = document.createElement('div');
                el.innerText = text;

                Object.assign(el.style, {
                    position: 'absolute',
                    color: isJaiBabu ? 'var(--c-primary)' : 'white',
                    fontFamily: isJaiBabu ? 'var(--font-heading)' : 'var(--font-body)',
                    fontSize: isJaiBabu ? '5rem' : '1.5rem',
                    width: '100%',
                    textAlign: 'center',
                    bottom: isJaiBabu ? '50%' : '10%',
                    left: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    opacity: 0,
                    filter: 'blur(10px)',
                    zIndex: 20,
                    textShadow: '0 2px 10px black'
                });

                if (textLayerRef.current) textLayerRef.current.appendChild(el);

                await gsap.to(el, {
                    opacity: 1,
                    filter: 'blur(0px)',
                    scale: isJaiBabu ? 1.2 : 1,
                    duration: 1,
                    ease: 'power2.out'
                });

                await new Promise(r => setTimeout(r, isJaiBabu ? 1500 : 3000));

                await gsap.to(el, {
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: -20,
                    duration: 0.8,
                    ease: 'power2.in'
                });

                if (el.parentNode) el.parentNode.removeChild(el);
                index++;
            }
        };

        subtitleSequence();

    }, [dialogueQueue]);

    return (
        <section ref={containerRef} style={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            background: '#000',
            opacity: 0
        }}>

            {/* MOSAIC BACKGROUND LAYER */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                opacity: 0.4
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${bgMosaic})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) contrast(1.2)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(black 15%, transparent 16%)',
                    backgroundSize: '4px 4px',
                    mixBlendMode: 'multiply'
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, black 100%)'
                }} />
            </div>

            {/* RIGHT SIDE: Hero Image */}
            <div ref={heroRef} style={{
                position: 'absolute',
                bottom: 0,
                right: '5%', // HERO ON RIGHT
                height: '90vh',
                width: 'auto',
                zIndex: 5,
                filter: 'drop-shadow(-20px 0 50px rgba(0,0,0,0.8))' // Shadow points left
            }}>
                <img src={currentHero} alt="Mahesh Babu Hero" style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    maxHeight: '100%',
                    borderRadius: '5px'
                }} />
            </div>

            {/* LEFT SIDE: Titles */}
            <div style={{
                zIndex: 10,
                position: 'absolute',
                left: '5%', // TITLE ON LEFT
                top: '30%',
                textAlign: 'left' // LEFT ALIGN
            }}>
                <p style={{
                    fontFamily: 'var(--font-heading)',
                    background: 'linear-gradient(90deg, #c5a059, #fff, #c5a059)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.5rem',
                    letterSpacing: '15px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                    animation: 'shine 3s linear infinite'
                }}>
                    THE SAGAR CUT
                </p>
                <style>{`
                    @keyframes shine {
                        to { background-position: 200% center; }
                    }
                `}</style>
                <h1 ref={titleRef} style={{
                    fontSize: '10vw',
                    lineHeight: 0.9,
                    color: 'white',
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase',
                    fontStyle: 'italic',
                    textShadow: '0 10px 30px rgba(0,0,0,1)'
                }}>
                    THE <br /> SUPER <br /> STAR
                </h1>
            </div>

            {/* Subtitle Layer */}
            <div ref={textLayerRef} style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 20
            }}>
            </div>

        </section>
    );
};

export default Home;
