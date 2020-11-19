import React from 'react';
import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';

import './Navbar.scss';

const NAV_ICONS = {
  search: FaSearch,
  user: FaUser,
  cart: FaShoppingCart,
};

interface Link {
  label?: string;
  href?: string;
  icon?: 'user' | 'search' | 'cart';
}

export interface NavbarProps {
  children?: any;
  onClick?: () => void;
  navLinks: Link[];
}

/**
 * Navigation bar
 */
export const Navbar: React.FC<NavbarProps> = ({ navLinks = [] }) => {
  return (
    <nav className="Navbar">
      {navLinks.map(({ href = '#', label, icon }, idx) => (
        <Link href={href} prefetch={href !== '#'} key={idx}>
          <div className="Navbar__link">
            {icon && React.createElement(NAV_ICONS[icon])}
            {label}
          </div>
        </Link>
      ))}
      <FaBars className="Navbar__hamburger" />
    </nav>
  );
};
