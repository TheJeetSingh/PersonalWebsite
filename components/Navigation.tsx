"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 py-4 w-full bg-black">
      <div className="relative max-w-7xl mx-auto flex items-center justify-center px-4">
        <span className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white font-luckiestGuy text-2xl md:text-4xl">
          Jeet
        </span>
        <SlideTabs />
      </div>
    </nav>
  );
}

const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      <Tab setPosition={setPosition} href="/">Home</Tab>
      <Tab setPosition={setPosition} href="/projects">Projects</Tab>
      <Tab setPosition={setPosition} href="/blog">Blog</Tab>
      <Tab setPosition={setPosition} href="/contact">Contact</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  href: string;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer mix-blend-difference"
    >
      <Link
        href={href}
        className="block px-3 py-1.5 text-xs uppercase text-white md:px-5 md:py-3 md:text-base font-dynaPuff"
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};
