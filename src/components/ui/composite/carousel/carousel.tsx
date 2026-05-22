"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentPropsWithRef,
  type HTMLAttributes,
  type JSX,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "@/libs/utils";

import {
  carouselContentVariants,
  carouselDotVariants,
  carouselItemVariants,
  carouselNavButtonVariants,
  carouselRootVariants,
  type CarouselOrientation,
} from "./carousel.variants";

// ── Types ──────────────────────────────────────────────────────────────────────

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];

// ── Context ────────────────────────────────────────────────────────────────────

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: CarouselOrientation;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

/**
 * Access the Carousel context from any sub-component.
 * Throws if used outside of `<Carousel>`.
 */
export function useCarousel(): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("`useCarousel` must be used within a <Carousel>");
  return ctx;
}

// ── CarouselRoot ───────────────────────────────────────────────────────────────

export interface CarouselRootProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
  /** Embla carousel options. */
  opts?: CarouselOptions;
  /** Embla plugins (e.g. Autoplay). */
  plugins?: CarouselPlugin;
  /**
   * Scroll axis.
   * @default "horizontal"
   */
  orientation?: CarouselOrientation;
  /** Callback fired once the Embla API is ready. */
  setApi?: (api: CarouselApi) => void;
  children?: ReactNode;
}

/**
 * Accessible carousel built on Embla Carousel.
 * Wrap `Carousel.Content`, navigation buttons, and dot indicators inside this.
 *
 * @example
 * ```tsx
 * <Carousel.Root>
 *   <Carousel.Content>
 *     {items.map((item) => (
 *       <Carousel.Item key={item.id}>
 *         <img src={item.src} alt={item.alt} />
 *       </Carousel.Item>
 *     ))}
 *   </Carousel.Content>
 *   <Carousel.PrevButton />
 *   <Carousel.NextButton />
 *   <Carousel.DotGroup />
 * </Carousel.Root>
 * ```
 */
export function CarouselRoot({
  orientation = "horizontal",
  opts,
  plugins,
  setApi,
  className,
  children,
  ...props
}: CarouselRootProps): JSX.Element {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "vertical" ? "y" : "x" },
    plugins
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
  }, []);

  const onSelect = useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
    setSelectedIndex(embla.selectedScrollSnap());
  }, []);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onInit(api);
    onSelect(api);
    api.on("reInit", onInit);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onInit);
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onInit, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
      }}
    >
      <div
        aria-label="carousel"
        {...props}
        role="region"
        aria-roledescription="carousel"
        onKeyDownCapture={handleKeyDown}
        className={cn(carouselRootVariants({ orientation }), className)}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

CarouselRoot.displayName = "Carousel";

// ── CarouselContent ────────────────────────────────────────────────────────────

export interface CarouselContentProps extends ComponentPropsWithRef<"div"> {
  /**
   * Whether to clip overflow on the viewport element.
   * Disable for "peek" effects where adjacent slides are partially visible.
   * @default true
   */
  overflowHidden?: boolean;
}

/**
 * The Embla viewport + track. Place `<Carousel.Item>` elements inside.
 */
export function CarouselContent({
  className,
  overflowHidden = true,
  ...props
}: CarouselContentProps): JSX.Element {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={cn("h-full w-full", overflowHidden && "overflow-hidden")}>
      <div {...props} className={cn(carouselContentVariants({ orientation }), className)} />
    </div>
  );
}

CarouselContent.displayName = "Carousel.Content";

// ── CarouselItem ───────────────────────────────────────────────────────────────

export interface CarouselItemProps extends ComponentPropsWithRef<"div"> {}

/**
 * A single slide. Uses `basis-full` by default — override `className` for
 * multi-item layouts (e.g. `className="basis-1/2"` for two slides at once).
 *
 * @example
 * ```tsx
 * // Two slides visible at a time
 * <Carousel.Item className="basis-1/2">…</Carousel.Item>
 * ```
 */
export function CarouselItem({ className, ...props }: CarouselItemProps): JSX.Element {
  const { orientation } = useCarousel();

  return (
    <div
      {...props}
      role="group"
      aria-roledescription="slide"
      className={cn(carouselItemVariants({ orientation }), className)}
    />
  );
}

CarouselItem.displayName = "Carousel.Item";

// ── CarouselPrevButton / CarouselNextButton ────────────────────────────────────

export interface CarouselNavButtonProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Override the accessible label. */
  "aria-label"?: string;
  children?: ReactNode;
  disabled?: boolean;
}

/**
 * Previous-slide navigation button. Positioned absolutely to the left (or top
 * for vertical carousels). Disabled automatically when at the first slide.
 *
 * Pass `children` to render a custom icon. Defaults to a chevron SVG.
 */
export function CarouselPrevButton({
  className,
  children,
  "aria-label": ariaLabel = "Previous slide",
  ...props
}: CarouselNavButtonProps): JSX.Element {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();

  return (
    <button
      {...props}
      type="button"
      aria-label={ariaLabel}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(carouselNavButtonVariants({ orientation, direction: "prev" }), className)}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {orientation === "vertical" ? (
            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      )}
    </button>
  );
}

CarouselPrevButton.displayName = "Carousel.PrevButton";

/**
 * Next-slide navigation button. Positioned absolutely to the right (or bottom
 * for vertical carousels). Disabled automatically when at the last slide.
 */
export function CarouselNextButton({
  className,
  children,
  "aria-label": ariaLabel = "Next slide",
  ...props
}: CarouselNavButtonProps): JSX.Element {
  const { scrollNext, canScrollNext, orientation } = useCarousel();

  return (
    <button
      {...props}
      type="button"
      aria-label={ariaLabel}
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(carouselNavButtonVariants({ orientation, direction: "next" }), className)}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {orientation === "vertical" ? (
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      )}
    </button>
  );
}

CarouselNextButton.displayName = "Carousel.NextButton";

// ── CarouselDot ────────────────────────────────────────────────────────────────

export interface CarouselDotProps extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  /** Zero-based slide index this dot maps to. */
  index: number;
  /** Override accessible label. Defaults to `"Go to slide {n}"`. */
  "aria-label"?: string;
}

/**
 * A single dot indicator that scrolls to a specific slide on click.
 * Reads `selectedIndex` from context — no `isSelected` prop needed.
 *
 * @example
 * ```tsx
 * <Carousel.DotGroup />
 * // or manually:
 * <div>
 *   {scrollSnaps.map((_, i) => <Carousel.Dot key={i} index={i} />)}
 * </div>
 * ```
 */
export function CarouselDot({
  index,
  className,
  "aria-label": ariaLabel,
  ...props
}: CarouselDotProps): JSX.Element {
  const { api, selectedIndex } = useCarousel();
  const isSelected = selectedIndex === index;

  return (
    <button
      {...props}
      type="button"
      aria-label={ariaLabel ?? `Go to slide ${index + 1}`}
      aria-current={isSelected ? "true" : undefined}
      onClick={() => api?.scrollTo(index)}
      className={cn(carouselDotVariants({ isSelected }), className)}
    />
  );
}

CarouselDot.displayName = "Carousel.Dot";

// ── CarouselDotGroup ───────────────────────────────────────────────────────────

export interface CarouselDotGroupProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Override the `<nav>` aria-label. */
  "aria-label"?: string;
}

/**
 * Renders a `<nav>` containing one `<Carousel.Dot>` per scroll snap.
 * Derives the count from the Embla `scrollSnaps` list — no manual count needed.
 *
 * @example
 * ```tsx
 * <Carousel.DotGroup className="mt-4 flex justify-center gap-2" />
 * ```
 */
export function CarouselDotGroup({
  className,
  "aria-label": ariaLabel = "Slide indicators",
  ...props
}: CarouselDotGroupProps): JSX.Element {
  const { scrollSnaps } = useCarousel();

  return (
    <nav {...props} aria-label={ariaLabel} className={cn("flex items-center gap-1.5", className)}>
      {scrollSnaps.map((_, i) => (
        <CarouselDot key={i} index={i} />
      ))}
    </nav>
  );
}

CarouselDotGroup.displayName = "Carousel.DotGroup";

// ── Compound export ────────────────────────────────────────────────────────────

/**
 * Accessible, Embla-powered carousel. Compound component with the following
 * sub-components:
 *
 * - `Carousel.Root` — context + keyboard navigation wrapper
 * - `Carousel.Content` — Embla viewport + track
 * - `Carousel.Item` — individual slide
 * - `Carousel.PrevButton` — previous-slide nav (absolute positioned)
 * - `Carousel.NextButton` — next-slide nav (absolute positioned)
 * - `Carousel.Dot` — single dot indicator
 * - `Carousel.DotGroup` — auto-rendered dot row
 *
 * @example
 * ```tsx
 * <Carousel.Root opts={{ loop: true }}>
 *   <Carousel.Content>
 *     {slides.map((s) => (
 *       <Carousel.Item key={s.id} className="basis-1/3">
 *         <img src={s.src} alt={s.alt} className="w-full rounded-xl" />
 *       </Carousel.Item>
 *     ))}
 *   </Carousel.Content>
 *   <Carousel.PrevButton />
 *   <Carousel.NextButton />
 *   <Carousel.DotGroup className="mt-4 flex justify-center gap-2" />
 * </Carousel.Root>
 * ```
 */
export const Carousel = CarouselRoot as typeof CarouselRoot & {
  displayName?: string;
  Root: typeof CarouselRoot;
  Content: typeof CarouselContent;
  Item: typeof CarouselItem;
  PrevButton: typeof CarouselPrevButton;
  NextButton: typeof CarouselNextButton;
  Dot: typeof CarouselDot;
  DotGroup: typeof CarouselDotGroup;
};

Carousel.displayName = "Carousel";
Carousel.Root = CarouselRoot;
Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.PrevButton = CarouselPrevButton;
Carousel.NextButton = CarouselNextButton;
Carousel.Dot = CarouselDot;
Carousel.DotGroup = CarouselDotGroup;
