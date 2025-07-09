"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "主页" },
  { href: "/ranking", label: "排行榜" },
  { href: "https://txc.qq.com/products/688134", label: "产品反馈", isExternal: false },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClassNames = (href: string) => {
    const baseClass =
      "py-4 px-2 text-gray-500 font-semibold hover:text-pink-500 transition duration-300";
    const activeClass = pathname === href ? "text-pink-500 border-b-2 border-pink-500" : "";
    return `${baseClass} ${activeClass}`;
  };

  const renderLinks = (isMobile: boolean) => {
    return NAV_LINKS.map((link, index) => {
      const classNames = `${getLinkClassNames(link.href)} ${isMobile ? "block w-full" : ""}`;
      if (link.isExternal) {
        return (
          <a
            key={index}
            href={link.href}
            className={classNames}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (isMobile) setIsMenuOpen(false);
            }}
          >
            {link.label}
          </a>
        );
      }
      return (
        <Link
          key={index}
          href={link.href}
          className={classNames}
          onClick={() => {
            if (isMobile) setIsMenuOpen(false);
          }}
        >
          {link.label}
        </Link>
      );
    });
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link href="/" className="flex items-center py-4 space-x-2">
              <Image src="/favicon.ico" alt="舔狗日记" width={32} height={32} className="w-8 h-8" />
              <span className="font-bold text-xl text-pink-500">舔狗日记</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">{renderLinks(false)}</div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-pink-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden pb-4`}>
          {renderLinks(true)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
