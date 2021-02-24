import bcrypt from 'bcrypt';
import httpErrors from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

import { JwtPayload } from '../helpers/types';
import { AuthSchema } from '../helpers';
import client from '../database/client.redis';
import Users from '../entities/Users';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const login = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    console.log(req.body);
    const credentials = new AuthSchema(req.body);
    await validateOrReject(credentials);

    console.log({ credentials });

    const user = await getRepository(Users).findOneOrFail({
      where: { email: credentials.email },
    });
    console.log({ user });

    const isPasswordValid = await user.isPasswordValid(credentials.password);
    console.log({ isPasswordValid });

    if (!isPasswordValid) throw new Error();

    const { accessToken, refreshToken } = await user.generateAuthTokens();
    res.send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    Array.isArray(error) // Validation error
      ? res.status(400).send(
          error.map(({ value, property, constraints }) => {
            return {
              property,
              constraints,
              value,
            };
          }),
        )
      : res.status(401).send({
          message: 'Invalid Username or Password',
        });
  }
};

/**
 * Logout user by removing refresh token reference from tokens persistence system (Redis)
 * @param req
 * @param res
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.header('x-refresh-token') as string;
  const { aud } = req.user; // "aud" = "audience" of token = Current user email

  client.GET(aud, async (error, refreshTokenRedis) => {
    try {
      if (error) throw error;

      // Compare sent token VS persited one
      const doTokensCompare = await bcrypt.compare(
        refreshToken,
        <string>refreshTokenRedis,
      );
      if (doTokensCompare) {
        // Delete token
        client.DEL(aud, error => {
          error
            ? res.status(500).send(error)
            : res.status(200).send({
                message: 'Logged out',
              });
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

/**
 * ADMIN controller. Given a user email, allows for deletion of a refresh token reference from tokens persistence system (Redis)
 * @param req.body.email - email of token's owner
 */
export const invalidateRefreshToken = (req: Request, res: Response): void => {
  const { email } = req.body;

  client.GET(email, async (err, data) => {
    try {
      if (!data) throw `User ${email} is not in system`;
      if (err) throw err;

      // invalidate (DELETE) stored refresh token
      client.DEL(email, err => {
        if (err) {
          console.log(err);
          throw new httpErrors.InternalServerError();
        } else {
          res.status(200).send({
            message: `Refresh token for user ${email} invalidated`,
          });
        }
      });
    } catch (error) {
      res.status(404).send({ message: error });
    }
  });
};

export const refreshToken = async (
  req: Request,
  res: Response,
  // next: NextFunction,
): Promise<Response | undefined> => {
  const accessToken = req.header('x-access-token') as string;
  const refreshToken = req.header('x-refresh-token') as string;

  if (!accessToken || !refreshToken)
    return res.status(401).send({ error: 'Access denied. No token provided' });

  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET!);
    // If above verification has not thrown, received access token is valid
    res.status(200).send({
      message: 'Access token is still valid',
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('REFRESHING TOKENS\n', new Date());
      try {
        // Verify integrity of Refresh token
        const payload = jwt.verify(
          refreshToken,
          REFRESH_TOKEN_SECRET!,
        ) as JwtPayload;

        // Generate new tokens for current user
        const user = await getRepository(Users).findOneOrFail(payload.userId);
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = await user.generateAuthTokens();

        // Respond with new set of tokens
        res.header('x-access-token', newAccessToken);
        res.header('x-refresh-token', newRefreshToken);
        res.status(200).send({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      } catch (error) {
        res.status(400).send({ error: 'Invalid token', message: error });
      }
    } else {
      return res.status(400).send({ error: 'Invalid token', message: error });
    }
  }
};
