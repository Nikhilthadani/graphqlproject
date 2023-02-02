import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaUserNurse } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AUTH_ACTIONS } from "../../store";

const UserMenu = () => {
  const [anchorElm, setAnchorElm] = useState<Element | null>(null);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(AUTH_ACTIONS.logout());
    setAnchorElm(null);
  };
  return (
    <Box sx={{ display: "flex", marginLeft: "auto" }}>
      <IconButton
        color="secondary"
        sx={{ color: "white" }}
        onClick={(e) => setAnchorElm(e.currentTarget)}
      >
        <FaUserNurse size={30} />
      </IconButton>
      <Menu
        sx={{ padding: 1 }}
        onClose={() => setAnchorElm(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(anchorElm)}
        anchorEl={anchorElm}
      >
        {/**@ts-ignore */}
        <MenuItem
          LinkComponent={Link}
          to="/profile"
          sx={{ m: 0.5 }}
          onClick={() => setAnchorElm(null)}
          key={"Logout"}
        >
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ m: 0.5 }} key={"Profile"}>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
