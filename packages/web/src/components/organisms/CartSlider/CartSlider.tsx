import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCart, emptyCart } from '../../../redux/cart/actions';
import { State, CartItem } from '../../../redux/types';
import { Button } from '@Atoms';

import './CartSlider.scss';

/**
 * Child
 */
const CartSliderItem = ({ name, quantity, src }: CartItem) => (
  <li className="CartSlider__item">
    <img src={src} alt={name} />
    <div className="CartSlider__itemDetails">
      <span className="CartSlider__itemLabel">{name}</span>
      <p>Quantité: {quantity}</p>
    </div>
  </li>
);

/**
 * Parent component
 */
export const CartSlider = () => {
  const router = useRouter();
  const {
    cart: { items },
  } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  return (
    <div className="CartSlider">
      <div className="CartSlider__items" style={{ color: ' black' }}>
        <ul className="CartSlider__itemsList">
          {items.map(item => (
            <CartSliderItem key={`${item.ean}`} {...item} />
          ))}
        </ul>
      </div>
      <Button
        type="button"
        className="CartSlider__button Cart__button--light"
        onClick={() => {
          dispatch(toggleCart());
          router.push('/cart');
        }}
        label="Open my cart"
      />
      <Button
        type="button"
        primary
        className="CartSlider__button Cart__button--light"
        onClick={() => {
          alert('Checkout...');
          dispatch(toggleCart());
          dispatch(emptyCart());
          alert('Order processed (CART EMPTY)');
        }}
        label="Checkout"
      />
    </div>
  );
};
