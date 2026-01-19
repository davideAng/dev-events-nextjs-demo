"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const NavBar = () => {
  const handleNavLinkClick = (linkName: string) => {
    posthog.capture("nav_link_clicked", {
      link_name: linkName,
    });
  };

  return (
    <header>
      <nav>
        <Link
          href="/"
          className="logo"
          onClick={() => handleNavLinkClick("logo")}
        >
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
        <ul>
          <Link href="/" onClick={() => handleNavLinkClick("home")}>
            Home
          </Link>
          <Link href="/" onClick={() => handleNavLinkClick("events")}>
            Events
          </Link>
          <Link href="/" onClick={() => handleNavLinkClick("create_events")}>
            Create Events
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;