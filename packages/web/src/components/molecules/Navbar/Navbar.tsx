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
import CSS from 'csstype';

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
  style?: CSS.Properties;
  withSearch: boolean;
  searchBtnLabel: string;
}

/**
 * Navigation bar
 */
export const Navbar: React.FC<NavbarProps> = ({
  navLinks = [],
  style = {},
  withSearch = false,
  searchBtnLabel = 'Search',
}) => {
  return (
    <nav className="Navbar" style={style}>
      <SearchBar active={withSearch} searchBtnLabel={searchBtnLabel} />
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
