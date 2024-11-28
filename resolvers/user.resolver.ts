import { generateRandomString } from "../helpers/generate.helper";
import User from "../models/user.model";
import md5 from "md5";

export const UserResolvers = {
  Query: {
    getUser: async (_, args, context) => {
      if (context.req.verifyUser) {
        const existUser = context.req.verifyUser;

        if (!existUser) {
          return {
            code: "error",
            message: "Token không hợp lệ!",
          };
        }

        return {
          code: "success",
          message: "Thành công!",
          id: existUser.id,
          token: existUser.token,
          fullName: existUser.fullName,
          email: existUser.email,
        };
      }
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args;

      const existUser = await User.findOne({
        email: user.email,
        deleted: false,
      });

      if (existUser) {
        return {
          code: "error",
          message: "Email đã tồn tại trong hệ thống!",
        };
      }

      const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: md5(user.password),
        token: generateRandomString(30),
      };

      const newUser = new User(dataUser);
      await newUser.save();

      return {
        code: "success",
        message: "Đăng ký thầnh công!",
        id: newUser.id,
        ...dataUser,
      };
    },
    loginUser: async (_, args) => {
      const { user } = args;

      const existUser = await User.findOne({
        email: user.email,
        deleted: false,
      });

      if (!existUser) {
        return {
          code: "error",
          message: "Email không tồn tại trong hệ thống!",
        };
      }

      if (md5(user.password) !== existUser.password) {
        return {
          code: "error",
          message: "Sai mật khẩu!",
        };
      }

      return {
        code: "success",
        message: "Đăng nhập thành công!",
        id: existUser.id,
        token: existUser.token,
        fullName: existUser.fullName,
        email: existUser.email,
      };
    },
  },
};
