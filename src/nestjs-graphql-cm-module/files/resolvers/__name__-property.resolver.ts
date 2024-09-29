import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { <%= classify(name) %> } from "../dto/<%= dasherize(name) %>.entity";
import { I<%= classify(name) %> } from "../schemas/interfaces/<%= dasherize(name) %>.interface";
import { AwsService } from "~/aws/services/aws.service";
import { DEFAULT_BUCKET_NAME } from "~/config/env";

@Resolver(of => <%= classify(name) %>)
export class <%= classify(name) %>PropertyResolver {
    constructor(
        private awsService: AwsService
    ) {}

    @ResolveField(returns => String, { nullable: true })
    poster(@Parent() <%= camelize(name) %>: I<%= classify(name) %>): Promise<string> {
        if(<%= camelize(name) %>?.poster?.Key) {
            return this.awsService.getSignedUrl(<%= camelize(name) %>?.poster?.Key, DEFAULT_BUCKET_NAME);
        }
        return null
    }
}
