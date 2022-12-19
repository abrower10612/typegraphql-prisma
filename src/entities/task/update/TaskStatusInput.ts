import { Field, InputType } from 'type-graphql';

/**
 * input fields for updating status of a task
 */
@InputType()
export default class TaskStatusInput {
  @Field()
  id!: number;

  @Field()
  ownerId!: number;

  @Field({ nullable: true })
  status?: 'COMPLETE' | 'INCOMPLETE';
}
