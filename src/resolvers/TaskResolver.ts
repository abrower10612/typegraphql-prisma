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
import TaskCreateInput from '../entities/task/create/TaskCreateInput';
import Task from '../entities/task/Task';
import TaskStatusInput from '../entities/task/update/TaskStatusInput';
import User from '../entities/user/User';

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
    const owner = await new User().findOne(ownerId);

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
    const owner = await new User().findOne(ownerId);

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
    const owner = await new User().findOne(ownerId);

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
    const owner = await new User().findOne(data.ownerId);

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
    const owner = await new User().findOne(data.ownerId);

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
