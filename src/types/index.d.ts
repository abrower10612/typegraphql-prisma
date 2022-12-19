export {};

declare global {
  namespace Express {
    interface Request {
      user: string;
      session: {
        userId: string;
      };
    }
  }
}
