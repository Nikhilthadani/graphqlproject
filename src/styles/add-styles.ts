import React, { CSSProperties, HTMLAttributes } from "react";
import { Styles } from "./blog-styles";

export const addStyles: Styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  blogHeader: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    fontWeight: "bold",
    padding: 3,
    alignItems: "center",
  },
  fontSans: { fontFamily: "Work Sans" },
  fontArvo: { fontFamily: "Arvo", fontWeight: "600" },
  publishBtn: { borderRadius: 10 },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  typography: {
    content: "editable",
  },
};

type htmlAtt = {
  [key: string]: React.CSSProperties;
};
export const htmlElmProps = {
  h1: {
    fontSize: "40px",
    fontFamily: "Work Sans",
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "40px",
    outline: "none",
  },
  p: {
    border: "none",
    outline: "none",
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "30px",
    fontFamily: "Work Sans",
    minHeight: "300px",
    fontSize: "18px",
  },
};
