const { GraphQLInt } = require('graphql');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql');
const { AuthorType } = require('./authorType');
const { MarcusType } = require('./marcusType');
console.log('MarcusType: ', MarcusType);
console.log('AuthorType: ', AuthorType);


const BookType = new GraphQLObjectType({
  name: 'book',
  description: 'Book Type',
  fields: () => {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: GraphQLInt },
      authors: {
        type: new GraphQLList(GraphQLString),
        resolve: (source) => {
          return [];
        },
      },
    };
  },
});

module.exports = { BookType, default: BookType };
