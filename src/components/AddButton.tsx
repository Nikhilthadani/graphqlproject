import { IconButton } from "@mui/material";
import React from "react";
import { SiAddthis } from "react-icons/si";
import { useNavigate } from "react-router-dom";
const AddButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add");
  };
  return (
    <IconButton
      onClick={handleClick}
      color="secondary"
      disableRipple
      sx={{
        width: "100%",
        position: "fixed",
        fontSize: "30px",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <SiAddthis />
    </IconButton>
  );
};

export default AddButton;
