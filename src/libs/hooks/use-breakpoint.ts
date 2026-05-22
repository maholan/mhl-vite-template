"use client";

import { useEffect, useState } from "react";

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Returns true when the viewport matches the given Tailwind CSS breakpoint.
 * Uses window.matchMedia with a change listener for reactive updates.
 *
 * @example
 * const isDesktop = useBreakpoint("lg");
 */
export const useBreakpoint = (size: "sm" | "md" | "lg" | "xl" | "2xl"): boolean => {
  const [matches, setMatches] = useState(
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${screens[size]})`).matches
      : true
  );

  useEffect(() => {
    const breakpoint = window.matchMedia(`(min-width: ${screens[size]})`);
    setMatches(breakpoint.matches);

    const handleChange = (value: MediaQueryListEvent): void => setMatches(value.matches);
    breakpoint.addEventListener("change", handleChange);
    return () => breakpoint.removeEventListener("change", handleChange);
  }, [size]);

  return matches;
};
