import { MiddlewareFn } from 'type-graphql';
import { AuthContext } from '../context';

export const isAuth: MiddlewareFn<AuthContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('not authenticated');
  }

  return next();
};
