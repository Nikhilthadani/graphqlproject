import { Box, Button, Typography } from "@mui/material";
import { MdPageview } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#273238",
        display: "flex",
        alignItems: "center",
        height: "20vh",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Button startIcon={<MdPageview />} color="inherit" variant="contained">
        View Articles
      </Button>
      <Button endIcon={<IoCreate />} color="inherit" variant="contained">
        Publish One
      </Button>
    </Box>
  );
};

export default Footer;
