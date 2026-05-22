import { useEffect } from "react";
import type { RefObject } from "@react-types/shared";

function hasResizeObserver(): boolean {
  return typeof window.ResizeObserver !== "undefined";
}

type UseResizeObserverOptions<T> = {
  ref: RefObject<T | undefined | null> | undefined;
  box?: ResizeObserverBoxOptions;
  onResize: () => void;
};

/**
 * Observes the size of an element and calls a callback when it changes.
 * Falls back to the window `resize` event when ResizeObserver is unavailable.
 *
 * @example
 * useResizeObserver({ ref: containerRef, onResize: recalculate });
 */
export function useResizeObserver<T extends Element>(options: UseResizeObserverOptions<T>): void {
  const { ref, box, onResize } = options;

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    if (!hasResizeObserver()) {
      window.addEventListener("resize", onResize, false);
      return () => window.removeEventListener("resize", onResize, false);
    }

    const observer = new window.ResizeObserver((entries) => {
      if (entries.length) onResize();
    });

    observer.observe(element, { box });
    return () => observer.unobserve(element);
  }, [onResize, ref, box]);
}
