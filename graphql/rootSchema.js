const { GraphQLSchema } = require('graphql');
const { RootMutation } = require('./rootmutation');
const { RootQuery } = require('./rootQuery');

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = { Schema };
