import React from 'react';
import './GalleryButton.css';
import Link from 'next/link';

interface GalleryButtonProps {
    href: string;
}

const GalleryButton: React.FC<GalleryButtonProps> = ({ href }) => {
    return (
        <Link href={href}>
            <button className="gallery-btn">
                <span className="back"></span>
                <span className="front"></span>
            </button>
        </Link>
    );
};

export default GalleryButton;
