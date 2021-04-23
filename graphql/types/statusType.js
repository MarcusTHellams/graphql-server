const { GraphQLEnumType } = require('graphql');

const StatusType = new GraphQLEnumType({
  name: 'Status',
  values: {
    SINGLE: { value: 'single' },
    MARRIED: { value: 'married' },
    DIVORCED: { value: 'divorced' },
  },
});

module.exports = { StatusType };
