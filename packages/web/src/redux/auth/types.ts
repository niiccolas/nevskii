export enum AuthActionTypes {
  SAVE_TOKENS = 'SAVE_TOKENS',
  DELETE_TOKENS = 'DELETE_TOKENS',
  // EMPTY_CART = 'EMPTY_CART',
  // ADD_ITEM = 'ADD_ITEM',
  // REMOVE_ITEM = 'REMOVE_ITEM',
  // INCREMENT_ITEM = 'INCREMENT_ITEM',
  // DECREMENT_ITEM = 'DECREMENT_ITEM',
}

export type AuthTokensDuoPayload = {
  accessToken: string;
  refreshToken: string;
  // userId: number;
  // userEmail: string;
  // isAdmin: boolean;
  // exp: number; // Expires at
  // aud: string; // Audience
  // iss: string; // Issuer
};

export type AuthState = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};
