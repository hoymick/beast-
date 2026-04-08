import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "neon";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-white text-black hover:bg-gray-200",
      secondary: "bg-neon-purple text-white hover:bg-purple-700",
      outline: "border border-white text-white hover:bg-white/10",
      neon: "bg-neon-blue text-black font-bold uppercase tracking-tighter shadow-[0_0_15px_rgba(0,242,255,0.5)] hover:shadow-[0_0_25px_rgba(0,242,255,0.8)] transition-shadow duration-300",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-4 text-base",
      lg: "px-12 py-6 text-xl font-bold",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
