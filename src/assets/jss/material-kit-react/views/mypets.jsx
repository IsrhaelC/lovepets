import { container, title } from "assets/jss/material-kit-react.jsx";

const feedPage = {
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "30px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  buttonFloat: {
    zIndex: "9999",
    position: "fixed !important",
    top: "80vh",
    left: "90vw"
  },
  formControl: {
    minWidth: "20vw !important",
    textAlign: "center",
    margin: "5px"
  },
  formContainer: {
    minWidth: "20vw",
    textAlign: "center",
  },
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

export default feedPage;
