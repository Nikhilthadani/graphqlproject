//@ts-nocheck
import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ImBlogger } from "react-icons/im";
import { BiLogInCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import UserMenu from "./components/header/UserMenu";
const Header = () => {
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
  const [value, setValue] = useState(0);
  return (
    <AppBar sx={{ bgcolor: "#273238", marginBottom: 1 }} position="sticky">
      <Toolbar>
        <ImBlogger
          style={{ background: "red", borderRadius: "50%", padding: "10px" }}
          size="30px"
        />
        <Box
          width="100%"
          margin="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Tabs
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
            textColor="inherit"
          >
            {/**@ts-ignore */}
            <Tab
              disableRipple={true}
              LinkComponent={Link}
              to="/"
              label="Home"
            />
            {/**@ts-ignore */}
            <Tab
              disableRipple={true}
              LinkComponent={Link}
              to="/blogs"
              label="Blogs"
            />
          </Tabs>
        </Box>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <IconButton
            disableRipple
            sx={{ color: "white" }}
            LinkComponent={Link}
            to="/auth"
          >
            <BiLogInCircle />
            <Typography ml={0.5}>Auth</Typography>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
