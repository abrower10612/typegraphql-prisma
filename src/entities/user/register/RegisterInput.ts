import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import TaskCreateInput from '../../task/create/TaskCreateInput';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExists';

/**
 * input fields for creating a user
 */
@InputType()
export default class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'An account with this email already exists' })
  email!: string;

  @Field()
  password!: string;

  @Field()
  name!: string;

  @Field(() => [TaskCreateInput], { nullable: true })
  tasks?: [TaskCreateInput];
}
