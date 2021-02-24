import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import { Avatar, Button, Input } from '@Atoms';
import moment from 'moment';

import { State } from '../../../redux/types';
import Redirect from '../../../utils/Redirect';
import { logOut } from '../../../redux/user/actions';
import { deleteTokens, saveTokens } from '../../../redux/auth/actions';

import './UserProfile.scss';
import '../../../styles/auth.common.scss';

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

type PlatformUser = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
};

export const UserProfile = () => {
  const dispatch = useDispatch();
  const [nevskiiUsers, setNevskiiUsers] = useState([]);
  const [userLoggedOut, setUserLoggedOut] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | {}>({});
  const [values, setValues] = useState({
    ...userProfile,
  });
  const [editError, setEditError] = useState(false);

  const { user, auth } = useSelector((state: State) => state);
  const { accessToken, refreshToken } = auth;

  const {
    address,
    zipCode,
    city,
    avatarUrl,
    dateOfBirth,
    displayName,
    firstName,
    lastName,
    isAdmin,
  } = userProfile as UserProfile;

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
      dispatch(deleteTokens());
      dispatch(logOut());
      setUserLoggedOut(true);
    } catch (error) {
      console.log('ERROR WHILE RESPONDING');
      console.log(error.response);
    }
  };

  useEffect(() => {
    const getUserData = async (accessToken: string, refreshToken: string) => {
      try {
        /*
         * With auth tokens, get current user profile data
         */
        const req = await axios.get(
          `${process.env.NEXT_PUBLIC_NEVSKII_API}/v1/users/me`,
          {
            headers: {
              'x-access-token': accessToken,
              'x-refresh-token': refreshToken,
            },
          },
        );
        setUserProfile(req.data);

        /*
         * If current user is admin, get data on all users of the platform
         */
        if (req.data.isAdmin) {
          const reqAllUsers = await axios.get(
            `${process.env.NEXT_PUBLIC_NEVSKII_API}/v1/users`,
            {
              headers: {
                'x-access-token': accessToken,
                'x-refresh-token': refreshToken,
              },
            },
          );
          setNevskiiUsers(reqAllUsers.data);
        }
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;

          /*
           * Make sure our /users/me request failed because of an expired Access Token
           */
          if (status === 400 && data.message === 'Access Token Expired') {
            /*
             * If so, ask for a new set of access/refresh tokens
             * Sending old ones for validation
             */
            await axios
              .post(
                `${process.env.NEXT_PUBLIC_NEVSKII_API}/v1/auth/token/refresh`,
                null,
                {
                  headers: {
                    'x-access-token': accessToken,
                    'x-refresh-token': refreshToken,
                  },
                },
              )
              .then(res => {
                /*
                 * Persist new auth tokens to store
                 */
                dispatch(saveTokens(res.data));
              })
              .catch(error => {
                console.log(error.response);
              });
          }
        } else if (error.request) {
          /*
           * The request was made but no response was received
           */
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      }
    };

    getUserData(accessToken!, refreshToken!);
  }, [auth, userLoggedOut]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const {
    address: addressFormValue,
    zipCode: zipCodeFormValue,
    city: cityFormValue,
    dateOfBirth: dateOfBirthFormValue,
    displayName: displayNameFormValue,
    firstName: firstNameFormValue,
    lastName: lastNameFormValue,
    avatarUrl: avatarUrlFormValue,
  } = values;

  const handleSubmitEditedProfile = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    /*
     * Abort submitting data if no new values are entered
     */
    if (Object.keys(values).length === 0) return;

    try {
      const req = await axios.patch(
        `${process.env.NEXT_PUBLIC_NEVSKII_API}/v1/users/me`,
        values,
        {
          headers: {
            'x-access-token': accessToken,
            'x-refresh-token': refreshToken,
          },
        },
      );

      /*
       * Reload page with new data
       */
      if (req.status === 200) Router.reload();
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        const { data, status } = error.response;
        console.log({ data, status });
        if (status === 400 && data.message === 'Access Token Expired') {
          /**
           * * Ask for a new refresh
           */
          await axios
            .post(
              `${process.env.NEXT_PUBLIC_NEVSKII_API}/v1/auth/token/refresh`,
              null,
              {
                headers: {
                  'x-access-token': accessToken,
                  'x-refresh-token': refreshToken,
                },
              },
            )
            .then(async response => {
              /**
               * * Save new tokens to store and re-run patch request
               */
              dispatch(saveTokens(response.data));
              const req = await axios.patch(
                `${process.env.NEXT_PUBLIC_NEVSKII_API}/v1/users/me`,
                values,
                {
                  headers: {
                    'x-access-token': accessToken,
                    'x-refresh-token': refreshToken,
                  },
                },
              );

              if (req.status === 200) {
                setEditError(false);
                Router.reload();
              }
            })
            .catch(error => {
              console.log(error.response);
              console.info('XXXXXX FAILED TO REFRESH TOKEN');
              setEditError(true);
            });
        }
      } else {
        console.log('from ELSE, l220');
        console.log('Error', error.message);
        setEditError(true);
      }
    }
  };

  if (userLoggedOut) return <Redirect to="/" />;
  if (!user.profile) return <Redirect to="/login" />;
  return (
    <div className="UserProfile">
      <h2 className="UserProfile__Heading">
        Welcome{' '}
        <span className="UserProfile__UserName">
          {`${firstName || displayName || ''}`} {isAdmin ? '👑' : '👋'}
        </span>
      </h2>

      <section className="UserProfile__section UserProfile__section-profile">
        <h3 className="UserProfile__sectionHeader">Your Profile</h3>
        {(displayName || (firstName && lastName)) && (
          <Avatar
            label={displayName || `${firstName} ${lastName}`}
            imageUrl={avatarUrl}
          />
        )}
        <form onSubmit={handleSubmitEditedProfile}>
          {firstName && (
            <p>
              <span className="UserProfile__infoLabel">First Name:</span>{' '}
              <Input
                name="firstName"
                value={firstNameFormValue || firstName}
                onChange={handleInputChange}
                required
              />
            </p>
          )}
          {lastName && (
            <p>
              <span className="UserProfile__infoLabel">Last Name:</span>{' '}
              <Input
                name="lastName"
                value={lastNameFormValue || lastName}
                onChange={handleInputChange}
                required
              />
            </p>
          )}
          {displayName && (
            <p>
              <span className="UserProfile__infoLabel">Username:</span>{' '}
              <Input
                name="displayName"
                value={displayNameFormValue || displayName}
                onChange={handleInputChange}
              />
            </p>
          )}
          {address && (
            <p>
              <span className="UserProfile__infoLabel">Address:</span>
              <Input
                name="address"
                value={addressFormValue || address}
                onChange={handleInputChange}
                required
              />
            </p>
          )}
          {zipCode && (
            <p>
              <span className="UserProfile__infoLabel">ZipCode:</span>
              <Input
                name="zipCode"
                onChange={handleInputChange}
                value={zipCodeFormValue || zipCode}
                required
              />
            </p>
          )}
          {city && (
            <p>
              <span className="UserProfile__infoLabel">City:</span>
              <Input
                name="city"
                onChange={handleInputChange}
                value={cityFormValue || city}
                required
              />
            </p>
          )}
          {dateOfBirth && (
            <p>
              <span className="UserProfile__infoLabel">Date of Birth:</span>{' '}
              <Input
                name="dateOfBirth"
                value={dateOfBirthFormValue || dateOfBirth}
                onChange={handleInputChange}
                type="date"
              />
            </p>
          )}
          <p>
            <span className="UserProfile__infoLabel">Avatar URL:</span>{' '}
            <Input
              name="avatarUrl"
              value={avatarUrlFormValue || avatarUrl}
              onChange={handleInputChange}
            />
          </p>
          <Button
            type="submit"
            label="Edit profile"
            className="UserProfile__editBtn"
          />
          {editError && (
            <p className="UserProfile__editError">
              Error updating profile! Check inputs & try again
            </p>
          )}
        </form>
      </section>

      {isAdmin && (
        <section className="UserProfile__section">
          <h3>Nevskii Platform Users ({nevskiiUsers.length})</h3>
          {nevskiiUsers.map((user: PlatformUser, idx) => (
            <>
              <Avatar
                label={displayName || `${user.firstName} ${user.lastName}`}
                imageUrl={user.avatarUrl}
              />
              <p
                style={{
                  fontWeight: 'bold',
                }}
              >
                {idx + 1}. {user.firstName} {user.lastName}
              </p>
              <p
                style={{
                  fontSize: '1.2rem',
                }}
              >
                Joined {moment(user.createdAt).fromNow()}
              </p>
              <p
                style={{
                  fontFamily: 'monospace',
                  marginBottom: '2rem',
                  fontSize: '1rem',
                }}
              >
                {user.email}
              </p>
            </>
          ))}
        </section>
      )}

      <Button
        primary
        type="button"
        label="Logout"
        onClick={() => handleLogout()}
      />
    </div>
  );
};
