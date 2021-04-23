const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLInputObjectType,
} = require('graphql');
const { StatusType } = require('./statusType');

const MarcusInputType = new GraphQLInputObjectType({
  name: 'MarcusInputType',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    age: {
      type: GraphQLNonNull(GraphQLInt),
    },
    occupation: {
      type: GraphQLNonNull(GraphQLString),
    },
    status: {
      type: GraphQLNonNull(StatusType),
    },
  }
})

const MarcusType = new GraphQLObjectType({
  name: 'MarcusType',
  description: 'Marcus Type',
  fields: () => {
    return {
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      age: {
        type: GraphQLNonNull(GraphQLInt),
      },
      occupation: {
        type: GraphQLNonNull(GraphQLString),
      },
      status: {
        type: GraphQLNonNull(StatusType),
      },
    };
  },
});

module.exports = { MarcusType, MarcusInputType };
