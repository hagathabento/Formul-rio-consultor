"use client"

import { cn } from "@/lib/utils"

type TColorProp = string | string[]

interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  color?: TColorProp
  className?: string
  children: React.ReactNode
}

export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={{
        borderRadius: `${borderRadius}px`,
      } as React.CSSProperties}
      className={cn(
        "relative min-h-[60px] w-fit bg-white p-px dark:bg-black overflow-hidden",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": "14s",
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${
              Array.isArray(color) ? color.join(",") : color
            },transparent,transparent)`,
          } as React.CSSProperties
        }
        className="before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:animate-shine pointer-events-none absolute inset-0 size-full rounded-[--border-radius] p-[--border-width] will-change-[background-position] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor]"
      />
      {children}
    </div>
  )
}
