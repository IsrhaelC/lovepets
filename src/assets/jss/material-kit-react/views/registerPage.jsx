import { container, title } from "assets/jss/material-kit-react.jsx";

const registerPage = {
  container: {
    zIndex: "1",
    color: "#FFFFFF",
    ...container
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-350px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  form: {
    margin: "0",
    justifyContent: "space-between"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
    color: "white"
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  containerForm: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "space-around"
  },
  textField: {
    width: "100%"
  }

};

export default registerPage;
