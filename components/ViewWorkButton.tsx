"use client";

import React from "react";
import Link from "next/link";
import "./ViewWorkButton.css";

interface ViewWorkButtonProps {
    href: string;
    children: React.ReactNode;
}

export default function ViewWorkButton({ href, children }: ViewWorkButtonProps) {
    return (
        <Link href={href} className="no-underline inline-block">
            <button className="btn-17">
                <span className="text-container">
                    <span className="text">{children}</span>
                </span>
            </button>
        </Link>
    );
}
