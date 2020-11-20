import React from 'react';
import Link from 'next/link';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';

import './Navbar.scss';

const NAV_ICONS = {
  search: FaSearch,
  user: FaUser,
  cart: FaShoppingCart,
  signIn: FaSignInAlt,
  signUp: FaUserPlus,
};

export interface NavLink {
  label?: string;
  href?: string;
  icon?: 'user' | 'search' | 'cart' | 'signIn' | 'signUp';
}

export interface NavbarProps {
  children?: any;
  onClick?: () => void;
  navLinks: NavLink[];
}

/**
 * Navigation bar
 */
export const Navbar: React.FC<NavbarProps> = ({ navLinks = [] }) => {
  return (
    <nav className="Navbar">
      {navLinks.map(({ href = '#', label, icon }, idx) => (
        <Link href={href} prefetch={false} key={idx}>
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
