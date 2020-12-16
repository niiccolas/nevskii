import React from 'react';
import { useSelector } from 'react-redux';
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
import { totalItemsCount } from '../../../redux/cart/utils';
import { State } from '../../../redux/types';

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
  onClick: Function;
}

export interface NavbarProps {
  children?: any;
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
  const {
    cart: { items },
  } = useSelector((state: State) => state);
  const cartItemsCount = totalItemsCount(items);

  return (
    <nav className="Navbar" style={style}>
      <SearchBar active={withSearch} searchBtnLabel={searchBtnLabel} />
      {navLinks.map(({ href = '#', label, icon, onClick }, idx) => (
        <Link href={href} prefetch={false} key={idx}>
          <div className="Navbar__link" onClick={() => onClick()}>
            {icon && React.createElement(NAV_ICONS[icon])}
            <span
              className={
                icon === 'cart' && cartItemsCount > 0 ? 'Navbar__cart' : ''
              }
            >
              {label}
            </span>
          </div>
        </Link>
      ))}
      <FaBars className="Navbar__hamburger" />
    </nav>
  );
};
