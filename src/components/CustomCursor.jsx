import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/global.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <div ref={cursorRef} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '10px',
                height: '10px',
                background: 'var(--c-gold)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)',
                mixBlendMode: 'difference'
            }} />
            <div ref={followerRef} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '40px',
                height: '40px',
                border: '1px solid var(--c-primary)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9998,
                transform: 'translate(-50%, -50%)',
                transition: 'width 0.2s, height 0.2s'
            }} />
        </>
    );
};

export default CustomCursor;
