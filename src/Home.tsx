import { Box, Typography } from "@mui/material";
import React from "react";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <>
      <div className="homepage">
        <Box
          sx={{ display: "flex", flexDirection: "column", padding: 6, gap: 10 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={{ lg: 50, md: 40, sm: 35, xs: 20 }}
              sx={{
                fontFamily: "Work Sans",
              }}
              variant="h3"
            >
              Write and Share Your Blog With Millions Of Peoples
            </Typography>
            <img
              style={{ boxShadow: "10px 10px 25px #000", borderRadius: 20 }}
              src="/blog.png"
              alt="blog"
              width="50%"
              height="50%"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <img
              style={{ boxShadow: "10px 10px 25px #000", borderRadius: 20 }}
              src="/publish.png"
              alt="publish"
              width="50%"
              height="50%"
            />
            <Typography
              fontSize={{ lg: 50, md: 40, sm: 35, xs: 20 }}
              variant="h3"
              sx={{ fontFamily: "Work Sans" }}
            >
              {" "}
              Write and Share Your Blog With Millions Of Peoples
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography
              fontSize={{ lg: 50, md: 40, sm: 35, xs: 20 }}
              variant="h3"
              sx={{ fontFamily: "Work Sans" }}
            >
              {" "}
              Write and Share Your Blog With Millions Of Peoples
            </Typography>
            <img
              style={{ boxShadow: "10px 10px 25px #000", borderRadius: 20 }}
              src="/articles.png"
              alt="articles"
              width="50%"
              height="50%"
            />
          </Box>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default Home;
