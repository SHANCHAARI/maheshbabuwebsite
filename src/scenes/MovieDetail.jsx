import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/global.css';
import { soundManager } from '../utils/SoundManager';

const MovieDetail = ({ movie, onClose }) => {
    const containerRef = useRef(null);
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        // Entrance Animation
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
    }, []);

    useEffect(() => {
        // Auto-advance dialogues
        if (lineIndex < movie.conversation.length) {
            const timeout = setTimeout(() => {
                setLineIndex(prev => prev + 1);
            }, 2000); // 2 seconds per dialogue
            return () => clearTimeout(timeout);
        }
    }, [lineIndex, movie.conversation.length]);

    return (
        <section ref={containerRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: `radial-gradient(circle at center, ${movie.color}44, black 90%)`,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(10px)'
        }}>
            {/* Close Button */}
            <button onClick={onClose} style={{
                position: 'absolute',
                top: '40px',
                right: '40px',
                background: 'none',
                border: `2px solid ${movie.color}`,
                color: movie.color,
                fontSize: '1.5rem',
                padding: '10px 20px',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                textTransform: 'uppercase'
            }}>
                Close Scene
            </button>

            {/* Hero Name / Title */}
            <h1 style={{
                fontSize: '4rem',
                color: movie.color,
                textShadow: '0 0 20px black',
                marginBottom: '50px'
            }}>
                {movie.title}
            </h1>

            {/* Conversation Flow */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
                {movie.conversation.map((line, index) => (
                    index <= lineIndex && (
                        <DialogueLine key={index} text={line} color={movie.color} index={index} />
                    )
                ))}
            </div>
        </section>
    );
};

const DialogueLine = ({ text, color, index }) => {
    const elRef = useRef(null);

    useEffect(() => {
        soundManager.playPop(); // Play sound on appear
        gsap.fromTo(elRef.current,
            { y: 50, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
        );
    }, []);

    return (
        <div ref={elRef} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderLeft: `5px solid ${color}`,
            padding: '20px 40px',
            borderRadius: '0 20px 20px 0',
            fontSize: '2rem',
            fontFamily: 'var(--font-comic)',
            color: 'white',
            maxWidth: '800px',
            textShadow: '0 2px 4px black',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            // "Tenglish" feel
        }}>
            {text}
        </div>
    );
};

export default MovieDetail;
