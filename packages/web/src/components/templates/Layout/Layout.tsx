import { NextPage } from 'next';
import { Header } from '@Organisms';

import './Layout.scss';

export const Layout: NextPage<any> = ({ children, className }): JSX.Element => (
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
