import { BoxProps, SxProps } from "@mui/system";
export type Styles = {
  [key: string]: SxProps;
};

const color_array = [
  "#ee1d25",
  "#faa31a",
  "#97C83B",
  "#0085cc",
  "#e8ac1c",
  "#4981b3",
  "#00a895",
  "#ee008c",
  "#ce521d",
  "#9cb46f",
  "#9a869e",
  "#2dacbf",
  "#bcd634",
];
export function randomBackgroundColor() {
  const color = color_array[Math.floor(Math.random() * color_array.length)];

  return color;
}

export const blogStyles: Styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    mt: 1,
    mb: 1,
  },
  card: {
    maxWidth: "80vw",
    display: "flex",
    flexDirection: "column",
    height: "75vh",
    transition: "transform 1s",
    ":hover": {
      transform: "scale(1.02)",
      boxShadow: "10px 10px 20px #Ccc",
    },
  },
  cardHeader: {
    fontFamily: "Roboto",
    fontSize: "72px",
    height: "35%",
    padding: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardContent: {
    width: "98%",
    height: "100%",
    fontSize: "20px",
    fontWeight: 500,
  },
  // comments: {
  //   height: "100px",
  //   padding: 1,
  //   overflow: "scroll",
  //   overflowX: "hidden",
  //   overflowY: "auto",
  // },
};
