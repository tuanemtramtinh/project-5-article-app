const CategoryTypeDefs = `#graphql
  type Category {
    id: String,
    title: String,
    avatar: String
  }

  type ResponseCode {
    code: String,
    message: String
  }

  type Query {
    getListCategory: [Category],
    getCategory(id: String): Category
  }

  input CategoryInput {
    title: String,
    avatar: String
  }

  type Mutation {
    createCategory(category: CategoryInput): Category,
    deleteCategory(id: String): ResponseCode,
    updateCategory(id: String, category: CategoryInput): Category
  }
`;

export default CategoryTypeDefs;