import { Styles } from "./blog-styles";
export const authStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  logoTitle: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
    mt: 1,
    mb: 1,
  },
  logoText: {
    fontFamily: "Work Sans",
    fontSize: "30px",
  },
  formBorder: {
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 3,
    boxShadow: "5px 5px 10px #ccc",
  },
  formTitle: {
    fontSize: "30px",
    fontFamily: "Arvo",
    fontWeight: "700",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    fontFamily: "Arvo",
    mt: 1,
    mb: 1,
    borderRadius: 10,
    background: "#273238",
    ":hover": {
      color: "white",
      bgcolor: "red",
      boxShadow: "10px 10px 20px #ccc",
    },
  },
  switchBtn: {
    background: "transparent",
    color: "#273238",
    ":hover": {
      textDecoration: "underline",

      textUnderlineOffset: "5px",
    },
  },
};
