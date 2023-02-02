import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GET_BLOG_BY_ID,
  SEND_COMMENT,
} from "./mutations-queries/blogMutations";
import {
  Avatar,
  Box,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { blogPageStyles } from "./styles/blogpage-styles";
import { FaUserEdit, FaComments, FaArrowAltCircleRight } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
type Data = {
  blog: {
    title: string;
    id: string;
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
  };
};
const BlogPage = () => {
  const [commentVisible, setCommentsVisible] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const id = useParams().id;
  const { data, loading, error } = useQuery(GET_BLOG_BY_ID, {
    variables: {
      id,
    },
  });
  const [sendComment, commentData] = useMutation(SEND_COMMENT, {
    variables: {
      blogId: id,
      user: localStorage.getItem("userId"),
      text: comment,
      date: new Date().toISOString(),
    },
  });
  const handleCommentSubmit = async () => {
    await sendComment();
  };
  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <Box sx={blogPageStyles.container}>
      {data.blog && (
        <>
          <Box sx={blogPageStyles.profileHeader}>
            <Typography sx={blogPageStyles.typography}>
              {data.blog.user.name}
            </Typography>
            <Box sx={blogPageStyles.profileHeaderItem}>
              <FaUserEdit />
              <Typography sx={blogPageStyles.typography}>
                {data.blog.user.email}
              </Typography>
            </Box>
          </Box>
          <Typography sx={blogPageStyles.title}>{data.blog.title}</Typography>
          <Typography sx={blogPageStyles.content}>
            {data.blog.caption}
          </Typography>
          <hr />

          <Box sx={blogPageStyles.commentBox}>
            Comments:{" "}
            <IconButton onClick={() => setCommentsVisible((prev) => !prev)}>
              <FaComments size="30" />
            </IconButton>
          </Box>
          {commentVisible && (
            <>
              <Box sx={blogPageStyles.commentInputContainer}>
                <Typography>Add Your Comment</Typography>
                <Box sx={blogPageStyles.commentLayout}>
                  <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={blogPageStyles.textField}
                  />
                  <IconButton onClick={handleCommentSubmit}>
                    <BiSend size={"25"} />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
          <Box sx={blogPageStyles.comments}>
            {data.blog.comments.map((comment: any) => (
              <Box sx={blogPageStyles.commentItem} key={comment.text}>
                <Avatar
                  sx={{ padding: 1, color: "red", bgcolor: "transparent" }}
                />
                <Typography
                  //@ts-ignore
                  sx={{
                    ...blogPageStyles.typography,
                    ...blogPageStyles.commentText,
                  }}
                >
                  {comment.user.name} {" : "} {comment.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BlogPage;
