import { IsEmail } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import Task from './Task';

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
  tasks!: Task[];
}
