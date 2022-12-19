import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

export interface AuthContext {
  req: Request;
}

export interface MyContext {
  prisma: PrismaClient;
}

export const context: MyContext = {
  prisma: prisma,
};
