import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { <%= classify(name) %>, Paginated<%= classify(name) %>Result } from '../dto/<%= dasherize(name) %>.entity';
import {
  <%= classify(name) %>Input
} from '../dto/<%= dasherize(name) %>.input';
import {
  <%= classify(name) %>UpdateInput
} from '../dto/<%= dasherize(name) %>.update.input';
import { I<%= classify(name) %> } from '../schemas/interfaces/<%= dasherize(name) %>.interface';
import { <%= classify(name) %>Service } from '../services/<%= dasherize(name) %>.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class <%= classify(name) %>Resolver {
  constructor(private <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  @Mutation(returns => <%= classify(name) %>)
  create<%= classify(name) %>(
    @Args({ name: '<%= camelize(name) %>Input', type: () => <%= classify(name) %>Input })
    <%= camelize(name) %>Input: I<%= classify(name) %>,
  ): Promise<I<%= classify(name) %>> {
    return this.<%= camelize(name) %>Service.insertOne(<%= camelize(name) %>Input);
  }

  @Mutation((returns) => Boolean)
  update<%= classify(name) %>(
    @Args({ name: '<%= camelize(name) %>Input', type: () => <%= classify(name) %>UpdateInput })
    <%= camelize(name) %>Input: I<%= classify(name) %>,
    @Args({ name: '<%= camelize(name) %>Id', type: () => ID }) <%= camelize(name) %>Id: string,
  ): Promise<boolean> {
    return this.<%= camelize(name) %>Service.updateOneById(<%= camelize(name) %>Id, <%= camelize(name) %>Input);
  }

  @Query((returns) => Paginated<%= classify(name) %>Result)
  fetch<%= classify(name) %>s(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
  ): Promise<IPaginatedResult<I<%= classify(name) %>>> {
    return this.<%= camelize(name) %>Service.findManyAndPaginate(
      {},
      queryConfig,
    );
  }

  @Query((returns) => <%= classify(name) %>)
  fetchAll<%= classify(name) %>s(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
  ): Promise<I<%= classify(name) %>[]> {
    return this.<%= camelize(name) %>Service.findMany({}, queryConfig);
  }

  @Query((returns) => <%= classify(name) %>)
  fetch<%= classify(name) %>(
    @Args({ name: '<%= camelize(name) %>Id', type: () => ID }) <%= camelize(name) %>Id: string,
  ): Promise<I<%= classify(name) %>> {
    let _id: any = <%= camelize(name) %>Id;
    return this.<%= camelize(name) %>Service.findOneOrFail({ _id });
  }

  @Mutation((returns) => Boolean)
  delete<%= classify(name) %>(
    @Args({ name: '<%= camelize(name) %>Id', type: () => ID }) <%= camelize(name) %>Id: string,
  ): Promise<boolean> {
    let _id: any = <%= camelize(name) %>Id;
    return this.<%= camelize(name) %>Service.deleteOne({ _id });
  }

  @Mutation((returns) => Boolean)
  publish<%= classify(name) %>(
    @Args({ name: '<%= camelize(name) %>Id', type: () => ID }) <%= camelize(name) %>Id: string,
  ): Promise<boolean> {
    let _id: any = <%= camelize(name) %>Id;
    return this.<%= camelize(name) %>Service.updateOne(
      { _id },
      { published: true, publishedAt: new Date() },
    );
  }

  @Mutation((returns) => Boolean)
  unPublish<%= classify(name) %>(
    @Args({ name: '<%= camelize(name) %>Id', type: () => ID }) <%= camelize(name) %>Id: string,
  ): Promise<boolean> {
    let _id: any = <%= camelize(name) %>Id;
    return this.<%= camelize(name) %>Service.updateOne({ _id }, { published: false });
  }
}
