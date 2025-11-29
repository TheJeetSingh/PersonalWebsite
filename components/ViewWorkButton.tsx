import React from 'react';
import Link from 'next/link';
import './ViewWorkButton.css';

interface ViewWorkButtonProps {
    href: string;
    children: React.ReactNode;
}

const ViewWorkButton: React.FC<ViewWorkButtonProps> = ({ href, children }) => {
    return (
        <Link href={href}>
            <button className="btn-17">
                <span className="text-container">
                    <span className="text">{children}</span>
                </span>
            </button>
        </Link>
    );
};

export default ViewWorkButton;
