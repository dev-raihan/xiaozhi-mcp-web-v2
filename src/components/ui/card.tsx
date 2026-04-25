"use client";

import * as React from "react";
import * as CardPrimitive from "@radix-ui/react-card";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  React.ElementRef<typeof CardPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CardPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CardPrimitive.Root
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  React.ElementRef<typeof CardPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof CardPrimitive.Header>
>(({ className, ...props }, ref) => (
  <CardPrimitive.Header
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  React.ElementRef<typeof CardPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof CardPrimitive.Title>
>(({ className, ...props }, ref) => (
  <CardPrimitive.Title
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  React.ElementRef<typeof CardPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof CardPrimitive.Description>
>(({ className, ...props }, ref) => (
  <CardPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  React.ElementRef<typeof CardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CardPrimitive.Content>
>(({ className, ...props }, ref) => (
  <CardPrimitive.Content
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  React.ElementRef<typeof CardPrimitive.Footer>,
  React.ComponentPropsWithoutRef<typeof CardPrimitive.Footer>
>(({ className, ...props }, ref) => (
  <CardPrimitive.Footer
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };