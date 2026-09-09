"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="mobile-menu__link"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/#contact"
        className="btn btn--primary"
        onClick={onClose}
        style={{ marginTop: "1rem" }}
      >
        Contact
      </Link>
    </div>
  );
}
