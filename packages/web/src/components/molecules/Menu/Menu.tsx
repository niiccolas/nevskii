import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart, FaBox, FaBars } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';

import { Button } from '@Atoms';

import './Menu.scss';

export type MenuProps = {
  items: MenuItem[];
};

export type MenuItem = {
  label: string;
  href: string;
  id: string;
};

/**
 * Menu
 */
export const Menu: React.FC<MenuProps> = ({ items }) => {
  const [active, setActive] = useState(false);

  // Close when viewport is resized
  document.addEventListener('resize', () => setActive(false));
  // When Menu is active, disable scrolling on body
  document && active
    ? (document.body.className = 'Menu__freezeBody')
    : (document.body.className = '');

  const handleClick = () => setActive(!active);

  return (
    <div className="Menu">
      <div
        className={['Menu__items', active && 'Menu__items--active'].join(' ')}
      >
        {items.map(({ label, href, id }) => (
          <Link key={id} href={href}>
            {label}
          </Link>
        ))}

        <div className="Menu__CTA">
          <Button label="Signup" type="button" primary />
          <Button label="Log-in" type="button" />
        </div>

        <ul className="Menu__footer">
          <Link href="/cart">
            <li>
              <span className="Menu__footerIcon">
                <FaShoppingCart />
              </span>
              <span>Cart</span>
            </li>
          </Link>
          <Link href="#">
            <li>
              <span className="Menu__footerIcon">
                <FaBox />
              </span>
              <span>Orders</span>
            </li>
          </Link>
          <Link href="#">
            <li>
              <span className="Menu__footerIcon">
                <BiHelpCircle />
              </span>
              <span>FAQ</span>
            </li>
          </Link>
        </ul>
      </div>

      <div
        className={['Menu__overlay', active && 'Menu__overlay--active'].join(
          ' ',
        )}
        onClick={() => active && setActive(!active)}
      ></div>
      <FaBars onClick={handleClick} className="Menu__toggle" />
    </div>
  );
};
