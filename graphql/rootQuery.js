const { default: axios } = require('axios');
const { GraphQLNonNull } = require('graphql');
const { GraphQLID } = require('graphql');
const { GraphQLList } = require('graphql');
const { GraphQLObjectType, GraphQLString } = require('graphql');
const { AuthorType } = require('./types/authorType');
const { BookType } = require('./types/bookType');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: () => {
    return {
      getAuthors: {
        type: new GraphQLList(AuthorType),
        resolve: async ()=>{
            const {data: authors} = await axios.get('http://localhost:3004/authors');
            return authors;
        }
      },
      getAuthor: {
        type: AuthorType,
        args:{
          id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve: async (_, {id})=>{
            const {data: author} = await axios.get(`http://localhost:3004/authors/${id}`);
            return author;
        }
      },
      getBooks: {
        type: new GraphQLList(BookType),
        resolve: async ()=>{
            const {data: books} = await axios.get('http://localhost:3004/books');
            return books;
        }
      },
      getBook: {
        type: BookType,
        args:{
          id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve: async (_, {id})=>{
            const {data: author} = await axios.get(`http://localhost:3004/books/${id}`);
            return author;
        }
      },
    };
  },
});

module.exports = { RootQuery };
