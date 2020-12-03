import { NextPage } from 'next';
import { Header } from '@Organisms';

import './Layout.scss';
import { Router } from 'next/router';

export const Layout: NextPage<any> = ({ children, className }): JSX.Element => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="Layout">
      <Header
        logo="nevskii"
        logoMobile="K"
        onCreateAccount={() => null}
        onLogin={() => null}
        onLogout={() => null}
        className="Layout"
      />
      <main className={['Layout__main', className].join(' ')}>{children}</main>
    </div>
  );
};
