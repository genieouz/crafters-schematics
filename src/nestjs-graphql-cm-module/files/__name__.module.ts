import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { <%= classify(name) %>PropertyResolver } from './resolvers/<%= dasherize(name) %>-property.resolver';
import { <%= classify(name) %>Resolver } from './resolvers/<%= dasherize(name) %>.resolver';
import { <%= camelize(name) %>ModelName } from './schemas/<%= dasherize(name) %>.model-name';
import { <%= camelize(name) %>Schema } from './schemas/<%= dasherize(name) %>.schema';
import { <%= classify(name) %>Service } from './services/<%= dasherize(name) %>.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { <%= classify(name) %>Controller } from './<%= dasherize(name) %>.controller';
import { AwsModule } from '~/aws/aws.module';
import { AuthModule } from '~/auth/auth.module';
import { <%= classify(name) %>PublicResolver } from './resolvers/<%= dasherize(name) %>-public.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: <%= camelize(name) %>Schema, name: <%= camelize(name) %>ModelName },
    ]),
    AwsModule,
    EventEmitterModule.forRoot(),
    AuthModule,
  ],
  providers: [
    <%= classify(name) %>Service,
    <%= classify(name) %>Resolver,
    <%= classify(name) %>PropertyResolver,
    <%= classify(name) %>PublicResolver,
  ],
  controllers: [<%= classify(name) %>Controller],
})
export class <%= classify(name) %>Module {}
