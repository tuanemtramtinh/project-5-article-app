import Article from "../models/article.model";
import Category from "../models/category.mode";
import ArticleResolvers from "./article.resolver";
import CategoryResolvers from "./category.resolver";
import { UserResolvers } from "./user.resolver";

export const resolvers = [
  ArticleResolvers,
  CategoryResolvers,
  UserResolvers
]

// export const resolvers = {
//   Query: {
//     getListArticle: async () => {
//       const articles = await Article.find({
//         deleted: false,
//       });

//       return articles;
//     },
//     getArticle: async (_, args) => {
//       const { id } = args;

//       const article = await Article.findOne({
//         _id: id,
//         deleted: false,
//       });

//       return article;
//     },
//     getListCategory: async () => {
//       const categories = await Category.find({
//         deleted: false,
//       });

//       return categories;
//     },
//     getCategory: async (_, args) => {
//       const { id } = args;

//       const category = await Category.findOne({
//         _id: id,
//         deleted: false,
//       });

//       return category;
//     },
//   },
//   Article: {
//     category: async (record) => {
//       const existCategory = await Category.findOne({
//         _id: record.categoryId,
//         deleted: false
//       })

//       return existCategory;
//     }
//   },
//   Mutation: {
//     createArticle: async (_, args) => {
//       const { article } = args;

//       const newArticle = new Article(article);

//       await newArticle.save();

//       return newArticle;
//     },
//     deleteArticle: async (_, args) => {
//       const { id } = args;

//       const existArticle = Article.findOne({
//         _id: id,
//         deleted: false,
//       });

//       if (!existArticle) {
//         return {
//           code: "error",
//           message: "Không tồn tại bản ghi",
//         };
//       }

//       await Article.findByIdAndUpdate(id, {
//         deleted: true,
//       });

//       return {
//         code: "success",
//         message: "Xoá thành công",
//       };
//     },
//     updateArticle: async (_, args) => {
//       const { id, article } = args;

//       await Article.updateOne(
//         {
//           _id: id,
//           deleted: false,
//         },
//         article
//       );

//       const record = await Article.findOne({
//         _id: id,
//         deleted: false,
//       });

//       return record;
//     },
//     createCategory: async (_, args) => {
//       const { category } = args;

//       const newCategory = new Category(category);

//       await newCategory.save();

//       return newCategory;
//     },
//     deleteCategory: async (_, args) => {
//       const { id } = args;

//       const existCategory = Category.findOne({
//         _id: id,
//         deleted: false,
//       });

//       if (!existCategory) {
//         return {
//           code: "error",
//           message: "Không tồn tại bản ghi",
//         };
//       }

//       await Category.findByIdAndUpdate(id, {
//         deleted: true,
//       });

//       return {
//         code: "success",
//         message: "Xoá thành công",
//       };
//     },
//     updateCategory: async (_, args) => {
//       const { id, category } = args;
//       await Category.updateOne(
//         {
//           _id: id,
//           deleted: false,
//         },
//         category
//       );

//       const record = await Category.findOne({
//         _id: id,
//         deleted: false,
//       });

//       return record;
//     },
//   },
// };
