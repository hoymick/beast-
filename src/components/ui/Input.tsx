import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
