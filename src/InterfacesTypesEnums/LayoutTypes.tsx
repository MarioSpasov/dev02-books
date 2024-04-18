import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  authenticated?: boolean;
  homepage?: boolean;
  books?: boolean;
}
