import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@Atoms';
import { State, CartItem } from '../../../redux/types';
import { grandTotal } from '../../../redux/cart/utils';
import {
  incrementItem,
  decrementItem,
  removeItem,
  emptyCart,
} from '../../../redux/cart/actions';

import { formatPrice } from '@utils';

import './Cart.scss';
import './CartElement.scss';

const Cart = () => {
  const {
    cart: { items },
  } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  return (
    <div className="Cart">
      <div className="Cart__header">
        <div className="Cart__headerBlock">
          <span>Product</span>
        </div>
        <div className="Cart__headerBlock">
          <span>Description</span>
        </div>
        <div className="Cart__headerBlock">
          <span>Quantity</span>
        </div>
        <div className="Cart__headerBlock">
          <span>Price</span>
        </div>
        <div className="Cart__headerBlock">
          <span>Remove</span>
        </div>
      </div>
      {items.map((item: CartItem) => (
        <CartElement key={item.ean} {...item} />
      ))}
      <div className="Cart__total">
        total: {formatPrice(`${grandTotal(items)}`)}
      </div>
      <Button
        label={'Checkout'}
        type="button"
        primary
        onClick={() => {
          alert('Checkout...');
          dispatch(emptyCart());
          alert('Order processed (CART EMPTY)');
        }}
      ></Button>
    </div>
  );
};

const CartElement = (props: CartItem) => {
  const { name, ean, quantity, src, price, linkUrl } = props;
  const dispatch = useDispatch();

  return (
    <div className="CartElement">
      <div className="CartElement__image">
        <img src={src} alt={name} />
      </div>
      <div className="name">
        <Link href={linkUrl ? `products/${linkUrl}` : '#'}>
          <a
            className="CartElement__label"
            href={linkUrl ? `products/${linkUrl}` : '#'}
          >
            {name}
          </a>
        </Link>
      </div>
      <div className="quantity">
        <button
          onClick={() => dispatch(incrementItem({ ean, quantity }))}
          className="CartElement__button CartElement__button_add"
        >
          +
        </button>{' '}
        {quantity}{' '}
        <button
          onClick={() => dispatch(decrementItem({ ean, quantity }))}
          className={`CartElement__button CartElement__button_add ${
            quantity === 1 ? 'disabled' : 'active'
          }`}
        >
          –
        </button>
      </div>
      <div className="price">
        {price ? formatPrice(price, quantity) : '---'}
      </div>
      <div className="remove-button">
        <button
          className="CartElement__button CartElement__button_remove"
          onClick={() => dispatch(removeItem({ ean, quantity }))}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Cart;
