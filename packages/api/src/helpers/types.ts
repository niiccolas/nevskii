export type TokenPayload = {
  userId: number;
  username: string;
  isAdmin: boolean;
  exp: number; // Expires at
  aud: string; // Audience
  iss: string; // Issuer
};

export type JwtPayload = {
  userId: number;
  userEmail: string;
  isAdmin: boolean;
  exp: number; // Expires at
  aud: string; // Audience
  iss: string; // Issuer
};

export type UserSetByJWT = { id: number };
