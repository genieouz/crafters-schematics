import { Args, Query, Resolver } from '@nestjs/graphql';
import { <%= classify(name) %>Service } from '../services/<%= dasherize(name) %>.service';
import { <%= classify(name) %>, Paginated<%= classify(name) %>Result } from '../dto/<%= dasherize(name) %>.entity';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { I<%= classify(name) %> } from '../schemas/interfaces/<%= dasherize(name) %>.interface';

@Resolver()
export class <%= classify(name) %>PublicResolver {
  constructor(private <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  @Query((returns) => Paginated<%= classify(name) %>Result)
  fetch<%= classify(name) %>sPub(
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
  fetch<%= classify(name) %>Pub(
    @Args({ name: '<%= camelize(name) %>Id', type: () => String }) <%= camelize(name) %>Id: string,
  ): Promise<I<%= classify(name) %>> {
    let _id: any = <%= camelize(name) %>Id;
    return this.<%= camelize(name) %>Service.findOneOrFail({ _id });
  }
}
