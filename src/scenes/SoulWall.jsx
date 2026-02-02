import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { extraDialogues } from '../data/movies';

// Import the new assets
import imgWhiteShirt from '../assets/mahesh_white_shirt.png';
import imgSitting from '../assets/mahesh_smile_sit.png';
import imgFist from '../assets/mahesh_fist.png';
import imgDark from '../assets/mahesh_dark_stairs.png';
import imgIntense from '../assets/mahesh_intense.png';

gsap.registerPlugin(ScrollTrigger);

const SoulWall = () => {
    const containerRef = useRef(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // 1. Shuffle Quotes
        const shuffledQuotes = [...extraDialogues].sort(() => 0.5 - Math.random());

        // 2. Shuffle Images (Visual Frames)
        const rawFrames = [
            { img: imgWhiteShirt, color: "#fff" },
            { img: imgFist, color: "#ff3c00" },
            { img: imgDark, color: "#888" },
            { img: imgSitting, color: "#c5a059" },
            { img: imgIntense, color: "#00d2ff" }
        ];
        // Shuffle the frames content
        const shuffledFrames = rawFrames.sort(() => 0.5 - Math.random());

        // 3. Pair them up
        const randomGallery = shuffledFrames.map((frame, i) => ({
            ...frame,
            quote: shuffledQuotes[i] || "JAI BABU"
        }));

        setItems(randomGallery);

    }, []);

    useEffect(() => {
        if (items.length === 0) return;

        // Slight delay to ensure DOM is ready
        setTimeout(() => {
            const sections = gsap.utils.toArray('.legacy-section');
            ScrollTrigger.refresh();

            sections.forEach((section, i) => {
                const img = section.querySelector('.legacy-img');
                const text = section.querySelector('.legacy-text');

                if (img) {
                    gsap.fromTo(img,
                        { scale: 1.2, filter: 'grayscale(100%)' },
                        {
                            scale: 1,
                            filter: 'grayscale(0%)',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true
                            }
                        }
                    );
                }

                if (text) {
                    gsap.fromTo(text,
                        { y: 100, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            scrollTrigger: {
                                trigger: section,
                                start: "top 70%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
        }, 100);

    }, [items]);

    return (
        <section ref={containerRef} style={{ background: '#050505', overflow: 'hidden' }}>

            {/* Title Section */}
            <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #222' }}>
                <h2 style={{ fontSize: '6vw', color: 'white', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '10px' }}>
                    THE <span style={{ color: 'var(--c-primary)' }}>LEGACY</span>
                </h2>
            </div>

            {/* Gallery Sections */}
            {items.map((item, i) => (
                <div key={i} className="legacy-section" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', // Zig-zag layout
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5%',
                    position: 'relative',
                    borderBottom: '1px solid #111'
                }}>

                    {/* Image Container */}
                    <div style={{ width: '45%', height: '80vh', overflow: 'hidden', position: 'relative' }}>
                        <img
                            className="legacy-img"
                            src={item.img}
                            alt="Mahesh Babu"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, black, transparent)', opacity: 0.3 }}></div>
                    </div>

                    {/* Text Container */}
                    <div className="legacy-text" style={{ width: '50%', padding: '20px' }}>
                        <h3 style={{
                            fontSize: '3.5rem',
                            fontFamily: 'var(--font-heading)',
                            color: item.color,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            marginBottom: '30px'
                        }}>
                            "{item.quote}"
                        </h3>
                        <div style={{ width: '100px', height: '5px', background: 'white' }}></div>
                    </div>

                </div>
            ))}

            {/* Footer */}
            <div style={{
                padding: '50px',
                textAlign: 'center',
                color: '#444',
                fontFamily: 'var(--font-body)',
                borderTop: '1px solid #222'
            }}>
                <p>DESIGNED FOR THE SUPERSTAR • 2026</p>
            </div>

        </section>
    );
};

export default SoulWall;
