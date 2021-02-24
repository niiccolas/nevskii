import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
import axios from 'axios';

import { Button } from '@Atoms';

import { State } from '../../../redux/types';
import { logOut } from '../../../redux/user/actions';
import { deleteTokens } from '../../../redux/auth/actions';
import { logOutCurrentUser } from '../../../utils/auth';

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
  const router = useRouter();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const { user, auth, cart } = useSelector((state: State) => state);
  const { accessToken, refreshToken } = auth;
  const { items: cartItems } = cart;

  // Close when viewport is resized
  document.addEventListener('resize', () => setActive(false));
  // When Menu is active, disable scrolling on body
  document && active
    ? (document.body.className = 'Menu__freezeBody')
    : (document.body.className = '');

  const handleClick = () => setActive(!active);

  const handleLogout = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_NEVSKII_API}/v1/auth/logout`,
        {
          headers: {
            'x-access-token': accessToken,
            'x-refresh-token': refreshToken,
          },
        },
      );

      // ! LOGOUT SUCCESSFUL
      console.log({ res });
      setActive(!active);
      dispatch(deleteTokens());
      dispatch(logOut());

      // logOutCurrentUser();

      // const router = useRouter();
      // const dispatch = useDispatch();

      // dispatch(logOut());
      // dispatch(deleteTokens());
      router.push('/');
    } catch (error) {
      console.log('ERROR WHILE RESPONDING');
      console.log(error.response);
    }
  };

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
          {!user.profile ? (
            <>
              <Button
                primary
                label="Log in"
                type="button"
                onClick={() => {
                  setActive(!active);
                  router.push('/login');
                }}
              />
              <Button
                label="Register"
                type="button"
                onClick={() => {
                  setActive(!active);
                  router.push('/register');
                }}
              />
            </>
          ) : (
            <>
              <Button
                primary
                label="My Profile"
                type="button"
                onClick={() => {
                  setActive(!active);
                  router.push('/profile');
                }}
              />
            </>
          )}
        </div>

        <ul className="Menu__footer">
          <Link href="/cart">
            <li>
              <span className="Menu__footerIcon">
                <FaShoppingCart />
              </span>
              Cart{' '}
              {cartItems && cartItems.length > 0 && (
                <span className="Menu__cartItemsCount">
                  ({cartItems.length})
                </span>
              )}
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
