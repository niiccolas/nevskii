import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { SearchBar } from '@Molecules';

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
  style?: Record<string, any>;
}

/**
 * Navigation bar
 */
export const Navbar: React.FC<NavbarProps> = ({
  navLinks = [],
  style = {},
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav
      className="Navbar"
      style={{
        ...(showSearch && { flex: 1 }),
        ...style,
      }}
    >
      <SearchBar active={showSearch} />
      <div className="Navbar__link">
        <FaSearch onClick={() => setShowSearch(!showSearch)} />
      </div>
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
