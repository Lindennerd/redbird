import apollo from "apollo-server-express";

const typeDefs = apollo.gql`
    type User {
        id: String
        name: String
    }

    type Query {
        hello: String
        users: [User]
    }
`;

export default typeDefs;
