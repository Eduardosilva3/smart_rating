"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => {
  // Concatenar classes manualmente
  const classes = [
    labelVariants(), // Classes base geradas pelo `cva`
    className || "", // Adiciona classes adicionais se fornecidas
  ]
    .filter(Boolean) // Remove valores "falsy" (undefined, null, etc.)
    .join(" "); // Junta as classes com espaço

  return <LabelPrimitive.Root ref={ref} className={classes} {...props} />;
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
