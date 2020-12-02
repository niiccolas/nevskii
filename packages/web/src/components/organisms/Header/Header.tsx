import React from 'react';
import { Navbar, NavLink } from '@Molecules';
import { Logo } from '@Atoms';

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
  const userNavLinks: NavLink[] = user
    ? [{ icon: 'user', href: '/profile' }]
    : [{ icon: 'signIn' }, { icon: 'signUp' }];

  return (
    <header className={['Header', className].join(' ')}>
      <h1>
        <Logo logo={logo} logoMobile={logoMobile} prefetch={false} />
      </h1>
      <Navbar
        navLinks={[{ icon: 'cart' }, ...userNavLinks]}
        withSearch
        searchBtnLabel="Search"
      />
    </header>
  );
};
