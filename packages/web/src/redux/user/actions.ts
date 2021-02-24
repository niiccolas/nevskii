type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  address: string;
  zipCode: string;
  city: string;
  dateOfBirth: string;
  displayName: string;
  isAdmin: boolean;
};

import { UserActionTypes, UserProfilePayload } from './types';

export const saveProfile = (userProfile: UserProfile) => ({
  type: UserActionTypes.SAVE_USER_PROFILE,
  payload: userProfile,
});

export const logOut = () => ({
  type: UserActionTypes.LOG_OUT,
});
