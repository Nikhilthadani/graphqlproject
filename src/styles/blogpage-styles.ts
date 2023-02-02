import { Styles } from "./blog-styles";

export const blogPageStyles: Styles = {
  container: {
    padding: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    padding: 1,
  },
  profileHeaderItem: {
    alignItems: "center",
    display: "flex",
    padding: 1,
    gap: 2,
  },
  typography: {
    fontFamily: "Arvo",
  },
  title: {
    fontSize: "30px",
    textAlign: "center",
    fontFamily: "Arvo",
    fontWeight: "700",
    textShadow: "2px 2px 12px #ccc",
  },
  content: {
    textShadow: "1px 1px 6px #ccc",
    padding: 5,
    fontSize: "20px",
    textAlign: "justify",
    fontFamily: "Work Sans",
    width: "100",
  },
  commentBox: {
    padding: 2,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  commentInputContainer: {
    padding: 2,
    width: "30%",
    height: "40%",
  },
  commentLayout: { display: "flex", alignItems: "center", gap: 2 },
  comments: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    width: "100%",
  },
  commentItem: {
    padding: 1,
    display: "flex",
    gap: 1,
    borderBottom: "1px solid #ccc",
    borderBottomWidth: "5px",
    borderRadius: 10,
    margin: 1,
    alignItems: "center",
  },
  commentText: {
    margin: 2,
    fontWeight: "bold",
    fontSize: "16px",
  },
};
