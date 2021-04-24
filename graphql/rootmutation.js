const { default: axios } = require('axios');
const { GraphQLObjectType } = require('graphql');
const { AuthorType, AuthorInputType } = require('./types/authorType');
const { BookType, BookInputType } = require('./types/bookType');

const RootMutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Root Mutation',
  fields: () => {
    return {
      addAuthor: {
        type: AuthorType,
        args: {
          input: {
            type: AuthorInputType,
          },
        },
        resolve: async (_, { input }) => {
          const { data: newAuthor } = await axios.post(
            'http://localhost:3004/authors',
            input
          );
          return newAuthor;
        },
      },
      addBook: {
        type: BookType,
        args: {
          input: {
            type: BookInputType,
          },
        },
        resolve: async (_, { input }) => {
          const { data: newAuthor } = await axios.post(
            'http://localhost:3004/books',
            input
          );
          return newAuthor;
        },
      },
    };
  },
});

module.exports = { RootMutation };
