import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Vinyl from '../entities/Vynil';

export const getVinyls = async (
  _: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await getRepository(Vinyl).find();
    return res.json(users);
  } catch (error) {
    return res.json(error);
  }
};

export const getVinyl = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await getRepository(Vinyl).findOne(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
};

export const createVinyl = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const newUser = getRepository(Vinyl).create(req.body);
    const result = await getRepository(Vinyl).save(newUser);
    return res.json(result);
  } catch ({ name, message, detail }) {
    // Conflict
    return res.status(409).json({
      name,
      message,
      detail,
    });
  }
};

export const updateVinyl = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await getRepository(Vinyl).findOne(req.params.id);
    if (user) {
      getRepository(Vinyl).merge(user, req.body);
      const results = await getRepository(Vinyl).save(user);
      return res.json(results);
    }
    return res.status(404).json({ msg: 'User not found' });
  } catch ({ name, message, detail }) {
    return res.json({
      name,
      message,
      detail,
    });
  }
};

export const deleteVinyl = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await getRepository(Vinyl).delete(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
};
