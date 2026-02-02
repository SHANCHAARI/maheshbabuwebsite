import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgOkkadu from '../assets/posters/okkadu_bleeding.png';
import imgAthadu from '../assets/posters/athadu_collage.jpg';
import imgWhite from '../assets/posters/minimal_white.png';
import imgCrowd from '../assets/posters/back_crowd.png';
import imgKhaleja from '../assets/posters/khaleja_trishul.png';
import imgCloseUp from '../assets/posters/mahesh_close_up.png';
import imgStars from '../assets/posters/pokiri_standing.png';
import imgSitting from '../assets/posters/srimanthudu_sitting.png';

gsap.registerPlugin(ScrollTrigger);

const posters = [
    { img: imgOkkadu, title: "THE ACTION", color: "#ff3c00" },
    { img: imgAthadu, title: "THE CLASS", color: "#888" },
    { img: imgStars, title: "THE ATTITUDE", color: "#fff" }, // Pokiri
    { img: imgCrowd, title: "THE MASS", color: "#000" },
    { img: imgKhaleja, title: "THE DIVINE", color: "#c5a059" },
    { img: imgCloseUp, title: "THE INTENSITY", color: "#00d2ff" },
    { img: imgWhite, title: "THE CHARM", color: "#fff" },
    { img: imgSitting, title: "THE SIMPLICITY", color: "#8b5e3c" }
];

const PosterWall = () => {
    const sectionRef = useRef(null);
    const col1Ref = useRef(null);
    const col2Ref = useRef(null);

    useEffect(() => {
        // Parallax Effect: Columns move at different speeds
        // Column 1 (Left): Moves slightly slower/faster
        gsap.to(col1Ref.current, {
            y: -100, // Moves up
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        // Column 2 (Right): Moves more drastically (Depth)
        gsap.to(col2Ref.current, {
            y: -250, // Moves up faster
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

    }, []);

    return (
        <section ref={sectionRef} style={{
            minHeight: '150vh', // Tall enough to scroll through
            background: '#050505',
            position: 'relative',
            padding: '100px 5vw',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '80px', zIndex: 10 }}>
                <p style={{ fontFamily: 'var(--font-body)', color: '#666', letterSpacing: '3px', marginBottom: '10px' }}>
                    THE FILMOGRAPHY
                </p>
                <h2 style={{
                    fontSize: '4rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '5px'
                }}>
                    CULT <span style={{ color: 'var(--c-primary)' }}>CLASSICS</span>
                </h2>
            </div>

            {/* Masonry Grid Container */}
            <div style={{
                display: 'flex',
                gap: '40px',
                width: '100%',
                maxWidth: '1200px',
                justifyContent: 'center',
                alignItems: 'flex-start' // Align top so they can move independently
            }}>

                {/* COLUMN 1 (Left) */}
                <div ref={col1Ref} style={{ display: 'flex', flexDirection: 'column', gap: '60px', width: '45%' }}>
                    {posters.filter((_, i) => i % 2 === 0).map((item, i) => (
                        <PosterCard key={i} item={item} />
                    ))}
                </div>

                {/* COLUMN 2 (Right) - Start slightly lower to offset */}
                <div ref={col2Ref} style={{ display: 'flex', flexDirection: 'column', gap: '60px', width: '45%', marginTop: '150px' }}>
                    {posters.filter((_, i) => i % 2 !== 0).map((item, i) => (
                        <PosterCard key={i} item={item} />
                    ))}
                </div>

            </div>

        </section>
    );
};

// Sub-component for individual card
const PosterCard = ({ item }) => (
    <div className="poster-item" style={{
        position: 'relative',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        background: '#111'
    }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
        {/* The Image */}
        <img
            src={item.img}
            alt={item.title}
            style={{
                width: '100%',
                height: 'auto', // Maintaining aspect ratio
                display: 'block',
                filter: 'grayscale(30%) contrast(1.1)',
                transition: 'filter 0.3s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%) contrast(1.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(30%) contrast(1.1)'; }}
        />

        {/* Overlay Label */}
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            padding: '40px 20px 20px',
            textAlign: 'center'
        }}>
            <h3 style={{
                color: 'white',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '5px'
            }}>
                {item.title}
            </h3>
            <div style={{ width: '40px', height: '2px', background: item.color, margin: '0 auto' }}></div>
        </div>
    </div>
);

export default PosterWall;
