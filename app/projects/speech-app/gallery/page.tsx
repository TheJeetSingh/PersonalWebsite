import StarryBackground from "@/components/StarryBackground";
import Image from "next/image";
import Link from "next/link";

export default function SpeechAppGallery() {
    return (
        <div className="min-h-screen relative">
            <StarryBackground />

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
                {/* Back Button */}
                <div className="absolute top-8 left-8">
                    <Link href="/projects" className="font-luckiestGuy text-white text-xl hover:scale-110 transition-transform block">
                        ← Back to Projects
                    </Link>
                </div>

                {/* Gallery Container */}
                <div className="max-w-6xl w-full">
                    <div className="comic-panel bg-white p-4 sm:p-8 rotate-1">
                        <h1 className="text-4xl sm:text-5xl font-luckiestGuy text-black text-center mb-8 uppercase tracking-wide">
                            Speech App Gallery
                        </h1>

                        <div className="grid grid-cols-1 gap-8">
                            {/* Main Demo Video */}
                            <div className="border-4 border-black bg-black p-2 relative group">
                                <div className="aspect-video relative w-full overflow-hidden">
                                    <Image
                                        src="/articulate-demo.webp"
                                        alt="Articulate App Demo"
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                                {/* Caption removed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
