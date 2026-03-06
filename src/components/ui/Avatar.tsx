import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
    src?: string;
    name: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
};

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={cn(
                    "rounded-full object-cover border border-border",
                    sizeClasses[size],
                    className
                )}
            />
        );
    }

    const initials = getInitials(name);
    const colors = [
        "bg-accent/20 text-accent",
        "bg-success/20 text-success",
        "bg-warning/20 text-warning",
        "bg-blue-500/20 text-blue-400",
        "bg-pink-500/20 text-pink-400",
        "bg-purple-500/20 text-purple-400",
    ];

    const colorIndex = name.charCodeAt(0) % colors.length;

    return (
        <div
            className={cn(
                "rounded-full flex items-center justify-center font-semibold border border-border",
                sizeClasses[size],
                colors[colorIndex],
                className
            )}
        >
            {initials}
        </div>
    );
}
