"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { personalData } from "@/lib/data";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Education", href: "/education" },
  { label: "Journey", href: "/journey" },
  { label: "Projects", href: "/projects" },
  { label: "Credentials", href: "/credentials" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`nav ${isScrolled ? "nav--scrolled" : ""}`} aria-label="Main navigation">
        <div className="container nav__inner">
          <Link href="/" className="nav__logo" aria-label="Home">
            {personalData.name}
          </Link>

          <ul className="nav__links" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav__link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className="btn btn--secondary" aria-label="Contact">
                Contact
              </Link>
            </li>
          </ul>

          <button
            className={`nav__menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
