import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeaInput {
  @Field()
  name: string;
}
