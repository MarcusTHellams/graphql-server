const { default: axios } = require('axios');
const { GraphQLNonNull } = require('graphql');
const { GraphQLID } = require('graphql');
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
            type: new GraphQLNonNull(AuthorInputType),
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
      updateAuthor: {
        type: AuthorType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
          input: {
            type: new GraphQLNonNull(AuthorInputType),
          },
        },
        resolve: async (_, { input, id }) => {
          const { data: updatedAuthor } = await axios.put(
            `http://localhost:3004/authors/${id}`,
            input
          );
          return updatedAuthor;
        },
      },
      deleteAuthor: {
        type: AuthorType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: async (_, { id }) => {
          const { data: user } = await axios.get(
            `http://localhost:3004/authors/${id}`
          );
          await axios.delete(`http://localhost:3004/authors/${id}`);
          return user;
        },
      },
      addBook: {
        type: BookType,
        args: {
          input: {
            type: new GraphQLNonNull(BookInputType),
          },
        },
        resolve: async (_, { input }) => {
          const { data: updatedBook } = await axios.post(
            'http://localhost:3004/books',
            input
          );
          return updatedBook;
        },
      },
      updateBook: {
        type: BookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
          input: {
            type: new GraphQLNonNull(BookInputType),
          },
        },
        resolve: async (_, { input, id }) => {
          const { data: newAuthor } = await axios.put(
            `http://localhost:3004/books/${id}`,
            input
          );
          return newAuthor;
        },
      },
      deleteBook: {
        type: BookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: async (_, { id }) => {
          const { data: book } = await axios.get(
            `http://localhost:3004/books/${id}`
          );
          await axios.delete(`http://localhost:3004/books/${id}`);
          return book;
        },
      },
    };
  },
});

module.exports = { RootMutation };
