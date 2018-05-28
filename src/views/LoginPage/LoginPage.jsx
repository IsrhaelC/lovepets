import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TextField from 'material-ui/TextField';
import { auth, database } from '../../firebase';
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: ''
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = () => {
    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(this.state.email, this.state.password)
    .then(obj => {
      database.userLogged(obj.user.uid);
      history.push("/")
    }).catch(error => {
      console.log(this.state.email)
      console.log(this.state.email, error)
    })
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand={"Lovepets"}
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} autoComplete="off">
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                      <IconButton target="_blank" color="transparent"
                        onClick={e => e.preventDefault()}>
                        <i className={classes.socialIcons + " fab fa-twitter"} />
                      </IconButton>
                      <IconButton target="_blank" color="transparent"
                        onClick={e => e.preventDefault()} >
                        <i className={classes.socialIcons + " fab fa-facebook"} />
                      </IconButton>
                      <IconButton target="_blank" color="transparent"
                        onClick={e => e.preventDefault()} >
                        <i className={classes.socialIcons + " fab fa-google"} />
                      </IconButton>
                    </div>
                    </CardHeader>
                    <p className={classes.divider}>Ou da forma clássica</p>
                    <CardBody>
                      <TextField id="email" label="Email" className={classes.textField} value={this.state.email}
                        onChange={this.handleChange('email')} margin="normal"
                        InputProps={{
                          endAdornment: <InputAdornment><Email /></InputAdornment>
                        }}
                        />
                      <TextField id="password" label="Senha" className={classes.textField} value={this.state.password}
                        onChange={this.handleChange('password')} margin="normal" type="password"
                        InputProps={{
                          endAdornment: <InputAdornment><LockOutline /></InputAdornment>
                        }}
                        />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" onClick={() => this.onSubmit()}>
                        Entrar
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
