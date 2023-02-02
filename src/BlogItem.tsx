import { Box, Card, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { blogStyles, randomBackgroundColor } from "./styles/blog-styles";
import { useNavigate } from "react-router-dom";

type Props = {
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

const BlogItem = (props: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean | string>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setOpen(isExpanded ? panel : false);
    };
  const handleNavigate = (id: string) => {
    navigate(`/blog/${id}`);
  };
  return (
    <Box sx={blogStyles.container}>
      <Card
        onClick={() => handleNavigate(props.blog.id)}
        sx={{
          ...blogStyles.card,
          width: theme.breakpoints.down("md") ? "400px" : "500px",
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{ ...blogStyles.cardHeader, bgcolor: randomBackgroundColor() }}
        >
          <Box display="flex" alignItems="center">
            <MdDateRange size="20px" />
            <Typography
              sx={{
                fontWeight: 400,
                color: "#273238",
                padding: 1,
                width: "150px",
              }}
              variant="body2"
            >
              {new Date(Number(props.blog.date)).toDateString()}
            </Typography>
          </Box>
          <Typography
            fontWeight={600}
            variant="h4"
            sx={{
              textShadow:
                " 2px 7px 19px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
              m: 1,
              fontWeight: "bold",
              color: "white",
              textTransform: "uppercase",
              fontFamily: "Roboto",
              ":hover": {
                textDecoration: "underline",
                textUnderlineOffset: "5px",
              },
            }}
          >
            {props.blog.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <FaUserEdit color="white" fontSize="20px" />

            <Typography
              sx={{
                marginTop: "auto",
                fontWeight: "bold",
                color: "#273238",
              }}
              variant="h6"
            >
              By {props.blog.user.name}
            </Typography>
          </Box>
        </Box>
        <Box sx={blogStyles.cardContent}>
          <Typography padding={2} fontSize="20px" fontWeight={300}>
            {props.blog.caption}
          </Typography>
        </Box>
        {/* {props.blog.comments.length > 0 && (
          <Accordion expanded={open} onChange={handleChange("panel1")}>
            <AccordionSummary expandIcon={open ? "-" : "+"}>
              Comments
            </AccordionSummary>
            <AccordionDetails>
              <List sx={blogStyles.comments}>
                {props.blog.comments.map((comment) => (
                  <Box
                    marginBottom={1}
                    padding={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    key={comment.user.name}
                    border="0.5px  #Ccc"
                    borderRadius={5}
                  >
                    <Typography fontFamily="sans-serif" variant="body2">
                      {comment.user.name} wrote:
                    </Typography>
                    <Typography fontWeight="bold" variant="subtitle2">
                      {comment.text}
                    </Typography>
                  </Box>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )} */}
      </Card>
    </Box>
  );
};

export default BlogItem;
