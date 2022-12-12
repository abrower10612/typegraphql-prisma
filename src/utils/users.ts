import { context } from '../context';

export const findOneUser = async (id: number) => {
  return await context.prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });
};
