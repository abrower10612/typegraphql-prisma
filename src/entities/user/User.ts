import { IsEmail } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { context } from '../../context';
import Task from '../task/Task';

@ObjectType()
export default class User {
  @Field(() => ID)
  id!: number;

  @Field()
  @IsEmail()
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  name!: string;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  public async findOne(id: number) {
    return await context.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
