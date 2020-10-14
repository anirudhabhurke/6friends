import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Post } from './Post';

export class User {
      @prop({ required: true })
      public name?: string;

      @prop({ required: true })
      public email?: string;

      @prop({ required: true })
      public password?: string;

      @prop({ required: true })
      public profilePictureUrl?: string;

      @prop({ type: () => 'User', required: true })
      public followers?: Ref<User>[];

      @prop({ type: () => 'User', required: true })
      public following?: Ref<User>[];

      @prop({ ref: () => 'Post', required: true })
      public posts?: Ref<Post>[];
}

export default getModelForClass(User);
