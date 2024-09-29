import { Document } from 'mongoose';
import { IAwsS3File } from '~/aws/schemas/interfaces/aws-object.interface';

export interface I<%= classify(name) %> extends Document {
    title: string;
    slug: string;
    url: string;
    description: string;
    content: string;
    spotlight: boolean;
    published: boolean;
    publishedAt: Date;
    addedBy?: string;
    poster?: IAwsS3File;
}
