import { cva, type VariantProps } from "class-variance-authority";

// ── Container ─────────────────────────────────────────────────────────────────

export const simpleCircleRootVariants = cva(["relative flex w-max items-center justify-center"]);

export type SimpleCircleRootVariantProps = VariantProps<typeof simpleCircleRootVariants>;

// ── Value label ───────────────────────────────────────────────────────────────

export const simpleCircleValueVariants = cva(["absolute text-sm font-semibold text-primary"]);

export type SimpleCircleValueVariantProps = VariantProps<typeof simpleCircleValueVariants>;
