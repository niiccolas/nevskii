import { NextFunction, Response } from 'express';
import { createConnection, getConnection, Connection } from 'typeorm';
import ORMConfig from './ormconfig';

/**
 * Re-use DB connection if already existant.
 * Fail early in case of connection issue.
 */
export const connectDB = async (): Promise<void> => {
  let connection: Connection | undefined;
  try {
    connection = getConnection();
  } catch (e) {
    // do nothing
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
        console.log('re-establish existing DB connection!');
      }
    } else {
      await createConnection(ORMConfig);
      console.log('new DB connection created!');
    }
  } catch (e) {
    console.error('DB connection failed!', e);
    throw e;
  }
};

/**
 * Keeps DB connection consistent, ensuring all requests have proper DB connection without overhead.
 */
export const tryConnectDB = async (
  onError: () => Response<{ error: string }>,
  next?: NextFunction,
): Promise<void> => {
  try {
    await connectDB();
    if (next) next();
  } catch (e) {
    onError();
  }
};
