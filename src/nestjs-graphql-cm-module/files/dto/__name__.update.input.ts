import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class <%= classify(name) %>UpdateInput {
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
}
