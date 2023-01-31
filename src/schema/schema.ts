import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} from "graphql";
import { Document, startSession } from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import { blogData, userData } from "../utils/data.js";
import bcrypt from "bcryptjs";
import Comment from "../models/Comment.js";

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    blogs: {
      type: GraphQLList(BlogTypes),
      async resolve(parent) {
        return await Blog.find({ user: parent.id });
      },
    },
    comment: {
      type: GraphQLList(CommentType),
      async resolve(parent) {
        return await Comment.find({ user: parent.id });
      },
    },
  }),
});

const BlogTypes = new GraphQLObjectType({
  name: "blog",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLNonNull(GraphQLString) },
    caption: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user);
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.find({ blog: parent.id });
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "comment",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user);
      },
    },
    blog: {
      type: BlogTypes,
      async resolve(parent) {
        return await Blog.findById(parent.blog);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // for getting all users
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return await User.find();
      },
    },
    // get by ID
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await User.findById(args.id);
      },
    },
    // getting all blogs
    blogs: {
      type: GraphQLList(BlogTypes),
      async resolve(parent, args) {
        return await Blog.find();
      },
    },
    // blog by ID
    blog: {
      type: BlogTypes,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Blog.findById(args.id);
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      async resolve() {
        return await Comment.find().populate("user blog");
      },
    },
    blogComments: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, { id }) {
        return await Comment.find({ blog: id }).populate("user blog");
      },
    },
  },
});

/** Mutations */
const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Adds A User
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, { name, email, password }) {
        let existingUser: Document<any, any, any>;
        try {
          existingUser = await User.findOne({ email });
          if (existingUser) return new Error("User Already Exists");
          const encryptedPassword = bcrypt.hashSync(password);
          const user = new User({ name, email, password: encryptedPassword });
          return await user.save();
        } catch (err) {
          return new Error("USER SIGNUP FAILED! Exiting");
        }
      },
    },
    loginUser: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser: Document<any, any, any>;
        try {
          existingUser = await User.findOne({ email });
          if (!existingUser)
            return new Error("No User Registered With This Email");
          const decryptedPassword = bcrypt.compareSync(
            password,
            //@ts-ignore
            existingUser.password
          );
          if (!decryptedPassword) return new Error("Incorrect Password");
          return existingUser;
        } catch (err) {
          return new Error("Error Occured While Login");
        }
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(root, { id }) {
        return await User.findByIdAndRemove(id);
      },
    },
    addBlog: {
      type: BlogTypes,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        caption: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(root, { title, caption, image, date, user }) {
        let blog: Document | Promise<Document<any, any, any>>;
        const session = await startSession();
        try {
          blog = new Blog({
            title,
            caption,
            image,
            date: new Date(date),
            user,
          });
          const existingUser: Document = await User.findById(user);
          if (!existingUser) return new Error("User Not Found! Exiting");

          session.startTransaction({ session });
          // @ts-ignore
          existingUser?.blogs.push(blog);
          await existingUser.save({ session });
          return await blog.save({ session });
        } catch (err) {
          return new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },
    deleteBlog: {
      type: BlogTypes,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(root, { id }) {
        let blog: Document;
        const session = await startSession();
        try {
          blog = await Blog.findById(id).populate("user");
          //@ts-ignore
          const existingUser: Document = blog?.user;
          if (!existingUser) return new Error("NO USER FOUND! Exiting");
          console.log(existingUser);

          session.startTransaction({ session });
          //@ts-ignore
          existingUser?.blogs.pull(blog);
          await existingUser.save({ session });
          return await blog.remove({ session });
        } catch (err) {
          return new Error();
        } finally {
          await session.commitTransaction();
        }
      },
    },
    updateBlog: {
      type: BlogTypes,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLNonNull(GraphQLString) },
        caption: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, { id, title, caption, image }) {
        try {
          return await Blog.findByIdAndUpdate(
            id,
            {
              title,
              caption,
              image,
            },
            { new: true }
          );
        } catch (err) {
          return new Error(err);
        }
      },
    },
    addCommentToBlog: {
      type: CommentType,
      args: {
        blogId: { type: GraphQLID },
        text: { type: GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLID },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { blogId, text, user, date }) {
        const session = await startSession();

        let comment: Document;

        try {
          session.startTransaction();
          const existingUser = await User.findById(user);
          const existingBlog = await Blog.findById(blogId);
          if (!existingUser || !existingBlog)
            return new Error("User or Blog Doesn't Exists");

          comment = new Comment({
            text,
            user,
            blog: blogId,
            date: new Date(date),
          });

          existingUser.comments.push(comment);
          //@ts-ignore
          existingBlog.comments.push(comment);
          await existingUser.save({ session });
          await existingBlog.save({ session });
          return await comment.save({ session });
        } catch (err) {
          return new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        let comment: Document<any, any, any>;
        const session = await startSession();
        try {
          comment = await Comment.findById(args.id);
          // @ts-ignore
          const existingUser = await User.findById(comment?.user);
          // @ts-ignore
          const blog = await Blog.findById(comment?.blog);
          session.startTransaction({ session });
          existingUser.comments.pull(comment);
          // @ts-ignore
          blog.comments?.pull(comment);
          await existingUser.save({ session });
          await blog.save({ session });

          return await comment.remove({ session });
        } catch (e) {
          return new Error(e);
        } finally {
          await session.commitTransaction();
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
