import React from 'react';
import { Navbar, NavLink } from '@Molecules';

import './Header.scss';

export interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  logo: string;
  logoMobile: string;
}

export const Header: React.FC<HeaderProps> = ({ user, logo }) => {
  const userNavLinks: NavLink[] = user
    ? [{ icon: 'user', href: '/profile' }]
    : [{ icon: 'signIn' }, { icon: 'signUp' }];

  {
    /* <div>
        {user ? (
          <Button size="small" onClick={onLogout} label="Log out" />
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button
              primary
              size="small"
              onClick={onCreateAccount}
              label="Sign up"
            />
          </>
        )}
      </div> */
  }

  return (
    <header>
      <div className="Header">
        <h1 className="Header__logo">
          <a href="/">
            <span className="Header__logo--tablet">{logo}</span>
            <span className="Header__logo--mobile">K</span>
          </a>
        </h1>
        <Navbar navLinks={[{ icon: 'cart' }, ...userNavLinks]} />
      </div>
    </header>
  );
};
