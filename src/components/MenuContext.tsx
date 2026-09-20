"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { lockScroll } from "./SmoothScroll";

interface MenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      lockScroll(next);
      return next;
    });
  };

  const handleSetIsMenuOpen = (open: boolean) => {
    setIsMenuOpen(open);
    lockScroll(open);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen: handleSetIsMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
