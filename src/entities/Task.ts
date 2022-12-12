import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Task {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  status!: 'COMPLETE' | 'INCOMPLETE';

  @Field(() => Number)
  ownerId!: number;
}
