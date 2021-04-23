const { GraphQLObjectType } = require('graphql');
const { MarcusType, MarcusInputType } = require('./types/marcusType');

const RootMutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Root Mutation',
  fields: () => {
    return {
      updateMarcus: {
        type: MarcusType,
        args: {
          input: {
            type: MarcusInputType,
          },
        },
        resolve: (source, { input }) => {
          return input;
        },
      },
    };
  },
});

module.exports = { RootMutation };
