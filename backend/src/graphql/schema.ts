import { buildSchema } from 'graphql';

export default buildSchema(`

      type RootMutation {
            createUser(userInput: userData): User!
            createPost(postInput: postInputData): Post!
            updatePost(postId: ID! ,postInput: postInputData): Post!
            deletePost(postId: ID!): Boolean!
            followUser(userId: ID!): Boolean!
            likePost(postId: ID!): Post!
      }

      type RootQuery {
            loginUser(userInput: loginData): LoginOutput!
            posts(page: Int): PostData!
            post(postId: ID!): Post!
            user: User!
      }

      schema {
           query: RootQuery
           mutation: RootMutation 
      }
`);
