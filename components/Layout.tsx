// components/Layout.tsx
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  // Layout implementation
  return (
    <div>
      {children}
    </div>
  );
}


