import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { State } from '../../../redux/types';
import { Navbar, NavLink } from '@Molecules';
import { Logo } from '@Atoms';
import { CartSlider } from '@Organisms';
import { totalItemsCount } from '../../../redux/cart/utils';

import './Header.scss';

export interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  logo: string;
  logoMobile: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  logo,
  logoMobile,
  className = '',
}) => {
  const router = useRouter();
  const {
    cart: { items, isVisible },
  } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const total = totalItemsCount(items);

  const userNavLinks: NavLink[] = user
    ? [{ icon: 'user', href: '/profile', onClick: () => alert('profile') }]
    : [
        { icon: 'signIn', onClick: () => alert('sign in') },
        { icon: 'signUp', onClick: () => alert('sign up') },
      ];

  const cartLink: NavLink[] =
    router.pathname !== '/cart'
      ? [
          {
            icon: 'cart',
            ...(total && { label: `${total}` }),
            onClick: () => dispatch({ type: 'TOGGLE_CART' }),
          },
        ]
      : [];

  return (
    <header className={['Header', className].join(' ')}>
      <h1>
        <Logo logo={logo} logoMobile={logoMobile} prefetch={false} />
      </h1>
      <Navbar
        navLinks={[...cartLink, ...userNavLinks]}
        withSearch
        searchBtnLabel="Search"
      />
      {isVisible && <CartSlider />}
    </header>
  );
};
