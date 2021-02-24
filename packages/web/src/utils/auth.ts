import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import jwtDecode from 'jwt-decode';
import { logOut } from '../redux/user/actions';
import { deleteTokens } from '../redux/auth/actions';

export type JwtPayload = {
  userId?: number;
  userEmail?: string;
  isAdmin?: boolean;
  exp: number; // Expires at
  aud?: string; // Audience
  iss?: string; // Issuer
};

export class AuthToken {
  readonly decodedToken: JwtPayload;

  constructor(readonly token?: string) {
    // we are going to default to an expired decodedToken
    this.decodedToken = {
      userId: undefined,
      userEmail: undefined,
      isAdmin: undefined,
      exp: 0, // Expires at
      aud: undefined, // Audience
      iss: undefined, // Issuer
    };

    // then try and decode the jwt using jwt-decode
    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (e) {}
  }

  get authorizationString() {
    return `Bearer ${this.token}`;
  }

  get expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isValid(): boolean {
    return !this.isExpired;
  }
}

export const logOutCurrentUser = () => {
  const router = useRouter();
  // const dispatch = useDispatch();

  // dispatch(logOut());
  // dispatch(deleteTokens());
  router.push('/');
};
