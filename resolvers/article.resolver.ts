import Article from "../models/article.model";
import Category from "../models/category.mode";

const ArticleResolvers = {
  Query: {
    getListArticle: async (_, args) => {
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItems,
        filterKey,
        filterValue,
        keyword,
      } = args;

      const find = {
        deleted: false,
      };

      // Sắp xếp
      const sort = {};

      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }

      // Phân trang
      const skip = (currentPage - 1) * limitItems;

      // Bộ lọc
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }

      // Tìm kiếm
      if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        find["title"] = keywordRegex;
      }

      const articles = await Article.find(find)
        .sort(sort)
        .limit(limitItems)
        .skip(skip);

      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;

      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });

      return article;
    },
  },
  Article: {
    category: async (record) => {
      const existCategory = await Category.findOne({
        _id: record.categoryId,
        deleted: false,
      });

      return existCategory;
    },
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;

      const newArticle = new Article(article);

      await newArticle.save();

      return newArticle;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;

      const existArticle = Article.findOne({
        _id: id,
        deleted: false,
      });

      if (!existArticle) {
        return {
          code: "error",
          message: "Không tồn tại bản ghi",
        };
      }

      await Article.findByIdAndUpdate(id, {
        deleted: true,
      });

      return {
        code: "success",
        message: "Xoá thành công",
      };
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;

      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        article
      );

      const record = await Article.findOne({
        _id: id,
        deleted: false,
      });

      return record;
    },
  },
};

export default ArticleResolvers;
