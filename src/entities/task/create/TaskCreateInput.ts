import { Field, InputType } from 'type-graphql';

/**
 * input fields for creating a task
 */
@InputType()
export default class TaskCreateInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  ownerId!: number;
}
