"use client";

import React from "react";
import Link from "next/link";
import "./ComicButton.css";

interface ComicButtonProps {
    href: string;
    children: React.ReactNode;
}

export default function ComicButton({ href, children }: ComicButtonProps) {
    return (
        <Link href={href} className="no-underline inline-block">
            <button className="comic-button">
                {children}
            </button>
        </Link>
    );
}
