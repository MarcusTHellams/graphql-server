const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
} = require('graphql');

const AuthorType = new GraphQLObjectType({
  name: 'author',
  description: 'Author Type',
  fields: () => {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      books: {
        type: new GraphQLList(BookType),
        resolve: async ({ id }) => {
          console.log('id: ', id);
          const { data: books } = await axios.get(
            `http://localhost:3004/books?authorId=${id}`
          );
          return books;
        },
      },
    };
  },
});

const BookType = new GraphQLObjectType({
  name: 'book',
  description: 'Book Type',
  fields: () => {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      author: {
        type: AuthorType,
        resolve: async ({ authorId }, _, context) => {
          // const {data: user} = await axios.get(`http://localhost:3004/authors/${authorId}`);
          // return user;
          return context.authorLoader.load(authorId);
        },
      },
    };
  },
});

module.exports = { AuthorType, BookType };
