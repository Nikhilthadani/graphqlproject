import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "./mutations-queries/blogMutations";
import BlogList from "./BlogList";
const Blogs = () => {
  const { loading, data, error } = useQuery(GET_BLOGS);
  if (loading) return <p>Loading Data...</p>;
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div>
      <BlogList blogs={data} />
    </div>
  );
};

export default Blogs;
