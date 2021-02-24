export enum UserActionTypes {
  SAVE_USER_PROFILE = 'SAVE_USER_PROFILE',
  LOG_OUT = 'LOG_OUT',
}

export type UserProfilePayload = {
  email: string;
  firstName: string;
  idUser: number;
  lastName: string;
};

export type UserState = {
  profile: UserProfilePayload | undefined;
};
