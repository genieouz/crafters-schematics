import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { I<%= classify(name) %> } from '../schemas/interfaces/<%= dasherize(name) %>.interface';
import { <%= camelize(name) %>ModelName } from '../schemas/<%= dasherize(name) %>.model-name';

@Injectable()
export class <%= classify(name) %>Service extends AbstractService<I<%= classify(name) %>> {
  constructor(@InjectModel(<%= camelize(name) %>ModelName) model: Model<I<%= classify(name) %>>) {
    super(model, ['title', 'description', 'content']);
  }
}

