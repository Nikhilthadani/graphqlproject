import { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { addStyles, htmlElmProps } from "../../styles/add-styles";
const AddBlog = () => {
  const userName = localStorage.getItem("userName");
  const titleRef = useRef<HTMLHeadingElement>();
  const contentRef = useRef<HTMLParagraphElement>();
  const handleSubmit = () => {
    console.log(titleRef?.current?.innerText);
    console.log(contentRef?.current?.innerText);
    // submit
  };
  return (
    <Box sx={addStyles.container}>
      <Box sx={addStyles.blogHeader}>
        <Typography sx={addStyles.fontArvo} variant="caption">
          Authored By: {userName?.toUpperCase()}
        </Typography>
        <Button
          onClick={handleSubmit}
          sx={addStyles.publishBtn}
          color="success"
          variant="contained"
        >
          Publish
        </Button>
      </Box>
      <form>
        <Box sx={addStyles.formContainer}>
          <h2
            // @ts-ignore
            ref={titleRef}
            placeholder="Title..."
            style={htmlElmProps.h1}
            contentEditable
          >
            Title...
          </h2>
          <p // @ts-ignore
            ref={contentRef}
            style={htmlElmProps.p}
            contentEditable={true}
          >
            Content...
          </p>
        </Box>
      </form>
    </Box>
  );
};

export default AddBlog;
