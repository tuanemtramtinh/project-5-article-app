import Article from "../models/article.model";
import Category from "../models/category.mode";

const CategoryResolvers = {
  Query: {
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false,
      });

      return categories;
    },
    getCategory: async (_, args) => {
      const { id } = args;

      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });

      return category;
    },
  },
  Mutation: {
    createCategory: async (_, args) => {
      const { category } = args;

      const newCategory = new Category(category);

      await newCategory.save();

      return newCategory;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;

      const existCategory = Category.findOne({
        _id: id,
        deleted: false,
      });

      if (!existCategory) {
        return {
          code: "error",
          message: "Không tồn tại bản ghi",
        };
      }

      await Category.findByIdAndUpdate(id, {
        deleted: true,
      });

      return {
        code: "success",
        message: "Xoá thành công",
      };
    },
    updateCategory: async (_, args) => {
      const { id, category } = args;
      await Category.updateOne(
        {
          _id: id,
          deleted: false,
        },
        category
      );

      const record = await Category.findOne({
        _id: id,
        deleted: false,
      });

      return record;
    },
  },
};

export default CategoryResolvers;
