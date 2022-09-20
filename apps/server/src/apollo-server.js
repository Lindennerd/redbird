import apollo from 'apollo-server-express';

const typeDefs = apollo.gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
}

const server = new apollo.ApolloServer({typeDefs, resolvers});
export default server;
