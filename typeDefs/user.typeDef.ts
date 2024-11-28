const UserTypeDefs = `#graphql
  type User {
    id: String,
    fullName: String,
    email: String,
    token: String,
    code: String,
    message: String
  }

  type Query {
    getUser(token: String): User
  }

  input RegisterUserInput {
    fullName: String,
    email: String,
    password: String
  }

  input LoginUserInput {
    email: String,
    password: String
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User
    loginUser(user: LoginUserInput): User
  }
`;

export default UserTypeDefs;
