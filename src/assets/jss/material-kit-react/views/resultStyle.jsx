import { container } from "assets/jss/material-kit-react.jsx";

const resultStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF"
  },
  section: {
    padding: "70px 0"
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "gray",
  },
  cardGrid : {
    marginBottom: "15px",
  }

};

export default resultStyle;
