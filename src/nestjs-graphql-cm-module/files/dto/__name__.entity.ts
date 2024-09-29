import { ObjectType, Field } from '@nestjs/graphql';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { Any } from '~/commons/graphql/scalars/any.scalar';

@ObjectType()
export class <%= classify(name) %> extends Timestamps {
  @Field(type => Any)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  inSpotlight: boolean;

  @Field(type => Boolean, { nullable: true })
  published: boolean;

  @Field({ nullable: true })
  publishedAt: Date;

  @Field({ nullable: true })
  addedBy?: string;
}

@ObjectType()
export class Paginated<%= classify(name) %>Result extends PaginatedResult(<%= classify(name) %>) {}
