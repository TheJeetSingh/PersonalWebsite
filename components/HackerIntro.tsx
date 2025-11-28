'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Props interface for the HackerIntro component
interface HackerIntroProps {
    onComplete: () => void; // Callback function to be called when the animation sequence is finished
}

// Constants for typing animation speeds (in milliseconds)
const TYPING_SPEED = 120;
const DELETING_SPEED = 60;

/**
 * HackerIntro Component
 * 
 * Displays a terminal-style typing animation that simulates a hacker interface.
 * It types out "A Jeet Singh Production", deletes it, and then types "enjoy ;)".
 * 
 * @param {HackerIntroProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
export default function HackerIntro({ onComplete }: HackerIntroProps) {
    // State to track the current stage of the animation ('terminal' or 'complete')
    const [stage, setStage] = useState<'terminal' | 'complete'>('terminal');
    // State to hold the current text being displayed in the terminal
    const [text, setText] = useState('');
    // State to control the visibility of the blinking cursor
    const [cursorVisible, setCursorVisible] = useState(true);

    // Effect to handle the blinking cursor animation
    useEffect(() => {
        const interval = setInterval(() => setCursorVisible(v => !v), 500); // Toggle visibility every 500ms
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    // Effect to handle the main typing sequence
    useEffect(() => {
        // Async function to run the animation steps sequentially
        const runSequence = async () => {
            // 1. Initial delay before typing starts to let the user settle
            await new Promise(r => setTimeout(r, 500));

            // 2. Type out the first phrase: "A Jeet Singh Production"
            const text1 = "A Jeet Singh Production";
            for (let i = 0; i <= text1.length; i++) {
                setText(text1.slice(0, i));
                await new Promise(r => setTimeout(r, TYPING_SPEED));
            }

            // 3. Pause to let the user read the text
            await new Promise(r => setTimeout(r, 1500));

            // 4. Delete the text character by character
            for (let i = text1.length; i >= 0; i--) {
                setText(text1.slice(0, i));
                await new Promise(r => setTimeout(r, DELETING_SPEED));
            }

            // 5. Type out the second phrase: "enjoy ;)"
            const text2 = "enjoy ;)";
            for (let i = 0; i <= text2.length; i++) {
                setText(text2.slice(0, i));
                await new Promise(r => setTimeout(r, TYPING_SPEED));
            }

            // 6. Final pause before completing the intro
            await new Promise(r => setTimeout(r, 1500));

            // Mark stage as complete and trigger the onComplete callback
            setStage('complete');
            setTimeout(onComplete, 500);
        };

        runSequence();

        return () => {
            // Cleanup function (optional, but good practice if we had cancellable promises)
        };
    }, [onComplete]);

    return (
        <AnimatePresence mode="wait">
            {stage !== 'complete' && (
                <motion.div
                    key="intro-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden"
                >
                    <motion.div
                        key="terminal"
                        initial={{
                            scale: 0.1,
                            x: '40%',
                            y: '40%',
                            opacity: 0
                        }}
                        animate={{
                            scale: 1,
                            x: '0%',
                            y: '0%',
                            opacity: 1
                        }}
                        transition={{
                            duration: 1.5,
                            ease: "circOut"
                        }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {/* Terminal Window UI */}
                        <div className="font-mono text-green-500 text-4xl md:text-6xl font-bold p-8 border-2 border-green-500/30 rounded-lg bg-black/90 shadow-[0_0_50px_rgba(34,197,94,0.2)] backdrop-blur-sm max-w-4xl w-full mx-4">
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 mb-4 border-b border-green-500/30 pb-2 text-sm text-green-500/70">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                <span className="ml-2">personalSite.exe</span>
                            </div>
                            {/* Terminal Content Area */}
                            <div className="min-h-[120px] flex items-center">
                                <span>{text}</span>
                                {/* Blinking Cursor */}
                                <motion.span
                                    animate={{ opacity: cursorVisible ? 1 : 0 }}
                                    className="inline-block w-3 h-10 md:h-14 bg-green-500 ml-1"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
