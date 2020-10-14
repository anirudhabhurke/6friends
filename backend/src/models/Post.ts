import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './User';

export class Post {
      @prop({ ref: () => 'User', required: true })
      public creator?: Ref<User>;

      @prop({ required: true })
      public postUrl?: string;

      @prop({ required: true })
      public caption?: string;

      @prop({ ref: () => 'User', required: true })
      public likes?: Ref<User>[];
}

export default getModelForClass(Post);
