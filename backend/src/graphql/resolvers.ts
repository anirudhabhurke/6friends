import { Post, User } from '../models';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
      // mutations
      createUser: async (args: any, req: any) => {
            const email = args.userInput.email;
            const username = args.userInput.username;
            const password = args.userInput.password;

            const existingUser = User.findOne({ $or: [{ email: email, username: username }] });
            if (existingUser) {
                  const error = new Error('User already exists');
                  (error as any).statusCode = 403;
                  throw error;
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = hashedPassword;
            newUser.followers = [];
            newUser.following = [];
            newUser.posts = [];
            await newUser.save();
            return {
                  ...(newUser as any)._doc,
                  createdAt: (newUser as any).createdAt.toString(),
                  updatedAt: (newUser as any).updatedAt.toString(),
            };
      },
      createPost: async (args: any, req: any) => {},
      updatePost: async (args: any, req: any) => {},
      deletePost: async (args: any, req: any) => {},
      followUser: async (args: any, req: any) => {},
      likePost: async (args: any, req: any) => {},
      // queries
      loginUser: async (args: any, req: any) => {
            const inputField = args.userInput.inputField;
            const password = args.userInput.password;

            let property: string;
            if (validator.isEmail(inputField)) {
                  property = 'email';
            } else {
                  property = 'username';
            }

            // add validation later
            const user = await User.findOne({ [property]: inputField });
            if (!user) {
                  const error = new Error('No user found');
                  (error as any).statusCode = 404;
                  throw error;
            } else {
                  const doesPasswordMatch = await bcrypt.compare(password, user.password);
                  if (!doesPasswordMatch) {
                        const error = new Error("Passwords don't match");
                        (error as any).statusCode = 404;
                        throw error;
                  }

                  const token = jwt.sign(user.email, 'OUR_PRIVATE_KEY');
                  return { token, userId: user._id.toString() };
            }
      },
      feed: async (args: any, req: any) => {},
      post: async (args: any, req: any) => {},
      user: async (args: any, req: any) => {},
};
