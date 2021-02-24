export * from './cart/types';

import { CartState } from './cart/types';
import { AuthState } from './auth/types';
import { UserState } from './user/types';

export type State = {
  cart: CartState;
  auth: AuthState;
  user: UserState;
};
