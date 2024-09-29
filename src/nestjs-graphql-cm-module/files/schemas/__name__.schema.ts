import { Schema } from 'mongoose';
import { awsObjectSchema } from '~/aws/schemas/aws-object.schema';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';

export const <%= camelize(name) %>Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    inSpotlight: { type: Boolean, default: false },
    description: { type: String, required: true },
    content: { type: String, default: "" },
    published: { type: Boolean },
    publishedBy: { type: Schema.Types.ObjectId },
    publishedAt: { type: Date },
    addedBy: { type: Schema.Types.ObjectId },
    poster: { type: awsObjectSchema },
    url: { type: String },
}, defaultSchemaOptions);
