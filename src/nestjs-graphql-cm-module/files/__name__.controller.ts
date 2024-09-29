import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IAwsS3File } from '~/aws/schemas/interfaces/aws-object.interface';
import { AwsService } from '~/aws/services/aws.service';
import { DEFAULT_BUCKET_NAME } from '~/config/env';
import { I<%= classify(name) %> } from './schemas/interfaces/<%= dasherize(name) %>.interface';
import { <%= classify(name) %>Service } from './services/<%= dasherize(name) %>.service';
import { ObjectId } from 'bson';
import { createSlug, parseId } from '~/commons/utils';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from '~/user/schemas/interfaces/user.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '~/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('<%= camelize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(
    private awsService: AwsService,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'poster', maxCount: 1 }]))
  async create<%= classify(name) %>(
    @UploadedFiles() files: { poster?: Express.Multer.File[] },
    @Body() body: any,
    @CurrentUser() currentUser: IUser,
  ): Promise<I<%= classify(name) %>> {
    const data = JSON.parse(body.data);
    let publishedAt = null;
    const slug = createSlug(data.title);
    if (data.published) {
      publishedAt = new Date();
    }
    let <%= camelize(name) %>poster: { poster: IAwsS3File } = {} as any;
    if (files?.poster?.length) {
      const video = files.poster[0];
      const videoObject = await this.awsService.createObject(
        video,
        DEFAULT_BUCKET_NAME,
        new ObjectId(),
      );
      <%= camelize(name) %>poster = { poster: videoObject };
    }

    const <%= camelize(name) %> = await this.<%= camelize(name) %>Service.insertOne({
      ...data,
      ...<%= camelize(name) %>poster,
      publishedAt,
      slug,
      addedBy: currentUser.id,
    });
    return <%= camelize(name) %>;
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'poster', maxCount: 1 }]))
  async update<%= classify(name) %>(
    @UploadedFiles() files: { poster?: Express.Multer.File[] },
    @Body() body: any,
    @Param('id') <%= camelize(name) %>Id: string,
    @CurrentUser() currentUser: IUser,
  ): Promise<boolean> {
    const data = JSON.parse(body.data);
    let _id: any = parseId(<%= camelize(name) %>Id);
    const old = await this.<%= camelize(name) %>Service.findOneOrFail({ _id });
    let publishedAt = old.publishedAt;
    if (!old.published && data.published) {
      publishedAt = new Date();
    }
    let <%= camelize(name) %>poster: { poster: IAwsS3File } = {} as any;
    if (files?.poster?.length) {
      const video = files.poster[0];
      const videoObject = await this.awsService.createObject(
        video,
        DEFAULT_BUCKET_NAME,
        new ObjectId(),
      );
      <%= camelize(name) %>poster = { poster: videoObject };
      if (old.poster) {
        this.eventEmitter.emit('aws.object.delete', {
          bucket: DEFAULT_BUCKET_NAME,
          key: old.poster.Key,
        });
      }
    }

    return this.<%= camelize(name) %>Service.updateOne(
      { _id },
      { ...data, ...<%= camelize(name) %>poster, publishedAt, updated_by: currentUser.id },
    );
  }
}
