import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { saveTokens } from '../redux/auth/actions';

const { NEXT_PUBLIC_NEVSKII_API } = process.env;

import { Layout } from '@Templates';
import { Button, Input } from '@Atoms';

import '../styles/auth.common.scss';

/**
 * REGISTER PAGE
 */
export default function register() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    dateOfBirth: null,
    zipCode: '',
  });
  const [signupError, setSignupError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const req = await axios.post(
        NEXT_PUBLIC_NEVSKII_API + '/v1/users/register',
        {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          city: values.city,
          dateOfBirth: values.dateOfBirth,
          zipCode: values.zipCode,
        },
      );

      if (req.status === 201) {
        setSignupError(false);
        dispatch(saveTokens(req.data));
        router.push('/login');
      } else {
        setSignupError(true);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      console.log(JSON.stringify(error));

      setSignupError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout>
      <div className="Sign">
        <h1 className="Sign__header">
          Enter your details to create an account
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <Input
            required
            type="email"
            name="email"
            placeHolder="mail@mail.com"
            value={values.email}
            onChange={handleInputChange}
          />

          <br />

          <label htmlFor="password">Password</label>
          <Input
            required
            type="password"
            name="password"
            placeHolder="8 alphanumerical characters, mixed case"
            value={values.password}
            onChange={handleInputChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Password must contain at least one number, one lowercase character, one uppercase character and at least 8 or more characters"
          />

          <label htmlFor="firstName">First name</label>
          <Input
            required
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            placeHolder="Sophia"
          />
          <label htmlFor="firstName">Last name</label>
          <Input
            required
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            placeHolder="Cappalo"
          />

          <label htmlFor="address">Street address</label>
          <Input
            required
            type="text"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            placeHolder="916 Kearny Street"
          />

          <label htmlFor="city">City</label>
          <Input
            required
            type="text"
            name="city"
            value={values.city}
            onChange={handleInputChange}
            placeHolder="San Francisco"
          />

          <label>Postal Code</label>
          <Input
            type="number"
            name="zipCode"
            value={values.zipCode}
            onChange={handleInputChange}
            placeHolder="94133"
          />

          <br />
          <Button
            primary
            type="submit"
            label="Register"
            className="Sign__CTA"
          />
          <Button
            type="button"
            label="Already registered? Log in"
            className="Sign__CTA"
            onClick={() => router.push('/login')}
          />
        </form>
        {signupError && <p className="Sign__error">SIGNUP ERROR! Retry</p>}
      </div>
    </Layout>
  );
}
