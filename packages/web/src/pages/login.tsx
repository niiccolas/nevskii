import { NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { saveTokens } from '../redux/auth/actions';
import { saveProfile } from '../redux/user/actions';
import { State } from '../redux/types';
import Redirect from '../utils/Redirect';
import { Layout } from '@Templates';
import { Button, Input } from '@Atoms';

const { NEXT_PUBLIC_NEVSKII_API } = process.env;

import '../styles/auth.common.scss';

export const login: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: State) => state);
  const [values, setValues] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(false);
  const [errorType, setErrorType] = useState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      /*
       * Hit login route to get auth tokens
       */
      const req = await axios.post(NEXT_PUBLIC_NEVSKII_API + '/v1/auth/login', {
        email: values.email,
        password: values.password,
      });
      if (req.status !== 200) throw req.data.message;
      /*
       * Persist auth tokens to Store
       */
      dispatch(saveTokens(req.data));

      /*
       * With auth tokens, get current user profile data
       */
      const profileRequest = await axios.get(
        NEXT_PUBLIC_NEVSKII_API + '/v1/users/me',
        {
          headers: {
            'x-access-token': req.data.accessToken,
            'x-refresh-token': req.data.refreshToken,
          },
        },
      );
      if (profileRequest.status !== 200) throw profileRequest.data.message;
      /*
       * Persist user profile data to Store
       */
      dispatch(saveProfile(profileRequest.data));
      setLoginError(false);
    } catch (error) {
      setErrorType(error.response.data);
      setLoginError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  if (user.profile) return <Redirect to="/profile" />;
  return (
    <Layout>
      <div className="Sign">
        <h1 className="Sign__header">Enter your credentials to login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <Input
            required
            type="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Password</label>
          <Input
            required
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />

          <br />
          <Button primary type="submit" label="Log in" className="Sign__CTA" />

          <Button
            type="button"
            label="No Account? Register"
            className="Sign__CTA"
            onClick={() => router.push('/register')}
          />
        </form>

        {loginError && (
          <p className="Sign__error">
            {Array.isArray(errorType)
              ? errorType.map(err => <p>{Object.values(err.constraints)}</p>)
              : errorType.message || 'LOGIN ERROR! Retry'}
          </p>
        )}
      </div>
    </Layout>
  );
};

export default login;
