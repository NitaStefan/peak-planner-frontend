"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-full w-[4px] overflow-hidden rounded-full bg-slate-500 dark:bg-slate-50/20",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="bg-orange-sec h-full w-full flex-1 transition-all dark:bg-slate-50"
      style={{ transform: `translateY(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
