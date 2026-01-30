import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative aspect-[4/1]", className)}>
            <Image
                src="/images/branding/logo-correct.png"
                alt="Evo Wrap Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
            />
        </div>
    );
};
