const { GraphQLInputObjectType } = require('graphql');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const BookType = new GraphQLObjectType({
  name: 'book',
  description: 'Book Type',
  fields: () => {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      author: {
        type: require('./authorType').AuthorType,
        resolve: async ({ authorId }, _, context) => {
          return context.authorLoader.load(authorId);
        },
      },
    };
  },
});
const BookInputType = new GraphQLInputObjectType({
  name: 'bookInputType',
  description: 'Book Input Type',
  fields: () => {
    return {
      title: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: new GraphQLNonNull(GraphQLID) },
    };
  },
});

module.exports = { BookType, BookInputType ,default: BookType };
