import { Box, Card } from "@mui/material";
import React from "react";
import BlogItem from "./BlogItem";
import { blogStyles } from "./styles/blog-styles";

type Props = {
  blogs: {
    blogs: {
      id: string;
      title: string;
      caption: string;
      date: Date;
      user: {
        name: string;
      };
      comments: {
        text: string;
        user: {
          name: string;
        };
      }[];
    }[];
  };
};

const BlogList = (props: Props) => {
  return (
    <Box padding={1} sx={blogStyles.container}>
      {props.blogs.blogs.length > 0 &&
        props.blogs.blogs.map((blog) => <BlogItem blog={blog} />)}
    </Box>
  );
};

export default BlogList;
