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
import Task from '../entities/Task';
import { findOneUser } from '../utils/users';

/**
 * input fields for creating a task
 */
@InputType()
export class TaskCreateInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  ownerId!: number;
}

/**
 * input fields for updating status of a task
 */
@InputType()
export class TaskStatusInput {
  @Field()
  id!: number;

  @Field()
  ownerId!: number;

  @Field({ nullable: true })
  status?: 'COMPLETE' | 'INCOMPLETE';
}

@Resolver()
export default class TaskResolver {
  /**
   * get all tasks for speciic user
   * @param ownerId
   * @param ctx
   * @returns
   */
  @Query(() => [Task])
  async getTasks(@Arg('ownerId') ownerId: number, @Ctx() ctx: Context) {
    const owner = await findOneUser(ownerId);

    return ctx.prisma.task.findMany({
      where: {
        owner,
      },
    });
  }

  /**
   * get all tasks with status INCOMPLETE for specific user
   * @param ownerId
   * @param ctx
   * @returns
   */
  @Query(() => [Task])
  async getIncompleteTasks(
    @Arg('ownerId') ownerId: number,
    @Ctx() ctx: Context
  ) {
    const owner = await findOneUser(ownerId);

    return ctx.prisma.task.findMany({
      where: {
        owner,
        status: 'INCOMPLETE',
      },
    });
  }

  /**
   * get all tasks with status COMPLETE for specific user
   * @param ownerId
   * @param ctx
   * @returns
   */
  @Query(() => [Task])
  async getCompleteTasks(@Arg('ownerId') ownerId: number, @Ctx() ctx: Context) {
    const owner = await findOneUser(ownerId);

    return ctx.prisma.task.findMany({
      where: {
        owner,
        status: 'COMPLETE',
      },
    });
  }

  /**
   * create a new task for a specific user
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => Task)
  async createTask(@Arg('data') data: TaskCreateInput, @Ctx() ctx: Context) {
    const owner = await findOneUser(data.ownerId);

    return ctx.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        ownerId: owner.id,
      },
    });
  }

  /**
   * toggle the status of a user's task between INCOMPLETE and COMPLETE
   * @param data
   * @param ctx
   * @returns
   */
  @Mutation(() => Task)
  async toggleTaskStatus(
    @Arg('data') data: TaskStatusInput,
    @Ctx() ctx: Context
  ) {
    const owner = await findOneUser(data.ownerId);

    const task = await ctx.prisma.task.findFirstOrThrow({
      where: {
        id: data.id,
        ownerId: owner.id,
      },
    });

    return ctx.prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        status: task.status === 'COMPLETE' ? 'INCOMPLETE' : 'COMPLETE',
      },
    });
  }
}
