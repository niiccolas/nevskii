import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateOrReject } from 'class-validator';

import Users from '../entities/Users';
import Countries from '../entities/Countries';
import { JwtPayload } from './../helpers/types';

/**
 * Insert a new user into the Users table from a validated body input
 * @param req
 * @param res
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const idCountry = req.body.country
      ? await getRepository(Countries).findOneOrFail({
          where: {
            name: req.body.country.trim().toLowerCase(),
          },
        })
      : 0; // default to France

    const user = new Users({
      ...req.body,
      idCountry,
      isAdmin: false, // on v1, default registered user type to non admin
    });
    await validateOrReject(user);
    await getRepository(Users).save(user);
    const { accessToken, refreshToken } = await user.generateAuthTokens();

    res.status(201).send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    // Validation errors are returned as an array
    Array.isArray(error)
      ? res.status(400).send(
          // Return keys corresponding to failed validation constraints
          error.map(({ value, property, constraints }) => {
            return {
              property,
              constraints,
              value,
            };
          }),
        )
      : res.status(409).send({
          message: 'Conflict',
        });
  }
};

/**
 * Returns the first name, last name, email and ID of user currently logged-in
 * @param req
 * @param res
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.user as JwtPayload;
    const user = await getRepository(Users).findOneOrFail(userId, {
      select: [
        'firstName',
        'lastName',
        'email',
        'avatarUrl',
        'address',
        'zipCode',
        'city',
        'dateOfBirth',
        'displayName',
        'isAdmin',
      ],
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(404).send({
      message: 'Ressource not found',
    });
  }
};

/**
 * Edit data of and by user currently logged with a valid JWT, given a validated body input
 * @param req
 * @param res
 */
export const editCurrentUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const { userId } = req.user;
    const userRepository = getRepository(Users);
    const user = await userRepository.findOneOrFail(userId);
    for (const key in user) {
      if (key === 'isAdmin') continue; // ! Prevents users from elevating themselves to admin
      if (req.body[key]) {
        // @ts-ignore
        user[key] = req.body[key];
      }
    }
    await validateOrReject(user);
    await userRepository.save(user);

    res.status(200).send({
      message: 'Current user edited',
    });
  } catch (error) {
    console.log(error);
    Array.isArray(error)
      ? res.status(400).send(
          error.map(({ value, property, constraints }) => {
            return {
              property,
              constraints,
              value,
            };
          }),
        )
      : res.status(409).send({
          message: 'Conflict',
        });
  }
};

/**
 * Returns an array of all users from the Users table
 * @param _req
 * @param res
 */
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await getRepository(Users).find({
      select: ['firstName', 'lastName', 'email', 'avatarUrl', 'createdAt'],
    });

    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
    });
  }
};

/**
 * Returns user data and user type for a given user id
 * @param req
 * @param res
 */
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getRepository(Users).findOneOrFail(id, {
      select: ['firstName', 'lastName', 'email', 'idUser'],
      // relations: ['idUserType'],
    });

    res.send(user);
  } catch (_) {
    res.status(404).send(); // NOT FOUND
  }
};

/**
 * Edit data of any user, given a user id and a validated body input
 * @param req
 * @param res
 */
export const editUserById = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    const userRepository = getRepository(Users);
    const user = await userRepository.findOneOrFail(userId, {});
    for (const key in user) {
      if (req.body[key]) {
        // @ts-ignore
        user[key] = req.body[key];
      }
    }
    await validateOrReject(user);
    await userRepository.save(user);

    res.status(200).send({
      message: 'User edited',
    });
  } catch (error) {
    Array.isArray(error)
      ? res.status(400).send(
          error.map(({ value, property, constraints }) => {
            return {
              property,
              constraints,
              value,
            };
          }),
        )
      : res.status(409).send({
          message: 'Conflict',
          error: error,
        });
  }
};

/**
 * Removes a user from database given a user id
 * @param req
 * @param res
 */
export const deleteUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    const user = await userRepository.findOneOrFail(id, {
      select: ['firstName', 'lastName', 'email', 'idUser'],
    });
    await userRepository.delete(id);

    res.status(202).send({
      message: 'User deleted',
      data: user,
    });
  } catch (error) {
    res.status(404).send({ message: 'User not found' });
  }
};
