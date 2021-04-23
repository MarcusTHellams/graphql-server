const { default: axios } = require('axios');
const { GraphQLList } = require('graphql');
const { GraphQLObjectType, GraphQLString } = require('graphql');
const { AuthorType, BookType } = require('./types/authorType');

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
      getAuthors: {
        type: new GraphQLList(AuthorType),
        resolve: async ()=>{
            const {data: authors} = await axios.get('http://localhost:3004/authors');
            return authors;
        }
      },
      getBooks: {
        type: new GraphQLList(BookType),
        resolve: async ()=>{
            const {data: books} = await axios.get('http://localhost:3004/books');
            return books;
        }
      },
    };
  },
});

module.exports = { RootQuery };
