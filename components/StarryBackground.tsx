"use client";

import React, { useMemo, useState, useEffect } from "react";
import "./StarryBackground.css";

const StarryBackground = () => {
    const smallStars = useMemo(() => generateStars(300), []);
    const mediumStars = useMemo(() => generateStars(100), []);
    const largeStars = useMemo(() => generateStars(50), []);

    const comicStars = useMemo(() => {
        const stars = [];
        for (let i = 0; i < 15; i++) {
            stars.push({
                top: Math.random() * 100,
                left: Math.random() * 100,
                size: Math.random() * 4 + 3, // 3px to 7px
                duration: Math.random() * 3 + 2 + 's'
            });
        }
        return stars;
    }, []);

    return (
        <div className="fixed inset-0 z-0 comic-sky overflow-hidden pointer-events-none">
            <div className="halftone-overlay" />

            {/* Static/Twinkling Stars */}
            <div
                className="absolute top-0 left-0 w-px h-px bg-transparent star-twinkle"
                style={{ boxShadow: smallStars, "--duration": '3s' } as React.CSSProperties}
            />
            <div
                className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent star-twinkle"
                style={{ boxShadow: mediumStars, "--duration": '4s' } as React.CSSProperties}
            />
            <div
                className="absolute top-0 left-0 w-[3px] h-[3px] bg-transparent star-twinkle"
                style={{ boxShadow: largeStars, "--duration": '5s' } as React.CSSProperties}
            />

            {/* Comic Stars */}
            {comicStars.map((star, i) => (
                <div
                    key={i}
                    className="comic-star"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        "--size": `${star.size}px`,
                        "--duration": star.duration
                    } as React.CSSProperties}
                />
            ))}

            {/* Comic Moon */}
            <div className="comic-moon" />

            {/* Clouds */}
            <div className="comic-cloud" style={{ top: '15%', left: '5%', width: '200px', height: '60px' }} />
            <div className="comic-cloud" style={{ top: '25%', right: '15%', width: '150px', height: '50px' }} />
            <div className="comic-cloud" style={{ top: '60%', left: '10%', width: '250px', height: '70px' }} />

            {/* Dynamic Shooting Stars */}
            <ShootingStar />
            <ShootingStar />
            <ShootingStar />
            <ShootingStar />
            <ShootingStar />
        </div>
    );
};

const ShootingStar = () => {
    const [key, setKey] = useState(0);
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        // Initial random delay before first shot
        const initialDelay = Math.random() * 10000;

        const trigger = () => {
            // Randomize position: mostly top half (0-60%), random horizontal (0-100%)
            const top = Math.random() * 60;
            const left = Math.random() * 100;

            setStyle({
                top: `${top}%`,
                left: `${left}%`,
            });

            // Restart animation by changing key
            setKey(prev => prev + 1);

            // Schedule next shot
            // Random interval between 4 and 15 seconds
            const nextInterval = Math.random() * 11000 + 4000;
            setTimeout(trigger, nextInterval);
        };

        const timeout = setTimeout(trigger, initialDelay);
        return () => clearTimeout(timeout);
    }, []);

    // Don't render until first trigger
    if (key === 0) return null;

    return <div key={key} className="shooting-star" style={style} />;
};

function generateStars(count: number) {
    let value = "";
    for (let i = 0; i < count; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        // Use vw and vh for responsive positioning
        value += `${x}vw ${y}vh #FFF, `;
    }
    return value.slice(0, -2);
}

export default StarryBackground;
