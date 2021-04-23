const { GraphQLObjectType, GraphQLString } = require('graphql');
const { MarcusType } = require('./types/marcusType');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: () => {
    return {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return 'Hello Marcus';
        },
      },
      getMarcus: {
        type: MarcusType,
        resolve: (parent, args) => {
          return {
            name: 'Marcus Hellams',
            age: 48,
            occupation: 'Software Developer',
            status: 'single',
          };
        },
      },
    };
  },
});

module.exports = { RootQuery };
