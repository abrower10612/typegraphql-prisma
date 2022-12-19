import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

export interface AuthContext {
  req: Request;
}

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prisma,
};
