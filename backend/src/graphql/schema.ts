import { buildSchema } from 'graphql';

export default buildSchema(`

      type User {
            _id: ID!
            name: String!
            email: String!
            password: String!
            profilePictureUrl: String!
            followers: [User!]!
            following: [User!]!
            posts: [Post!]!
            createdAt: String!
            updatedAt: String!
      }

      type Post {
            _id: ID!
            creator: User!
            postUrl: String!
            caption: String
            likes: [User!]!
            createdAt: String!
            updatedAt: String!
      }

      type loginOutput {
            token: String!
            userId: ID!
      }

      input userData {
            email: String!
            username: String!
            password: String!
      }

      input postInputData {
            postUrl: String!
            caption: String
      }

      input loginData {
            inputField: String!
            password: String!
      }

      type RootMutation {
            createUser(userInput: userData): User!
            createPost(postInput: postInputData): Post!
            updatePost(postId: ID! ,postInput: postInputData): Post!
            deletePost(postId: ID!): Boolean!
            followUser(userId: ID!): Boolean!
            likePost(postId: ID!): Post!
      }

      type RootQuery {
            loginUser(userInput: loginData): loginOutput!
            feed(page: Int): PostsData!
            post(postId: ID!): Post!
            user: User!
      }

      schema {
           query: RootQuery
           mutation: RootMutation
      }
`);
