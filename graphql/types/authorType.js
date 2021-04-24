const axios = require('axios');
const { GraphQLInputObjectType } = require('graphql');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID,
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
        type: new GraphQLList(require('./bookType').BookType),
        resolve: async ({ id }, _, context) => {
          return context.bookLoader.load(id);
        },
      },
    };
  },
});

const AuthorInputType = new GraphQLInputObjectType({
  name: 'authorInputType',
  description: 'Author Input Type',
  fields: () => {
    return {
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
    };
  },
});


module.exports = { AuthorType, AuthorInputType };
