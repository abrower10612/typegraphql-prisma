import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Context } from '../context';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import { TaskCreateInput } from './TaskResolver';

/**
 * input fields for creating a user
 */
@InputType()
class UserCreateInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  name!: string;

  @Field(() => [TaskCreateInput])
  tasks!: [TaskCreateInput];
}

@Resolver()
export default class UserResolver {
  /**
   * get all users
   * @param ctx
   * @returns
   */
  @Query(() => [User])
  async getUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  /**
   * get one user by id
   * @param id
   * @param ctx
   * @returns
   */
  @Query(() => User)
  async getOneUser(@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  /**
   * create a new user
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => User)
  async createUser(@Arg('data') data: UserCreateInput, @Ctx() ctx: Context) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return ctx.prisma.user.create({
      data: {
        email: data.email,
        password: passwordHash,
        name: data.name,
      },
    });
  }

  /**
   * delete a user by email address
   * @param email
   * @param ctx
   * @returns
   */
  @Mutation(() => User)
  deleteUser(@Arg('email', () => String) email: string, @Ctx() ctx: Context) {
    return ctx.prisma.user.delete({
      where: {
        email,
      },
    });
  }
}
