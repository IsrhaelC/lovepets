import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import classNames from "classnames";
import { auth, database } from '../../firebase';

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import TextField from 'material-ui/TextField';
import IconButton from "components/CustomButtons/IconButton.jsx";


import registerStyle from "assets/jss/material-kit-react/views/registerPage.jsx";

const dashboardRoutes = [];

class AdoptersRegister extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      name: "",
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      nascimento: '  /  /    ',
      endereco: "",
      number: "",
      bairro: "",
      cidade: "",
      estado: "",
      hasShelter: "false",
      error: null
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

    auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser => {
        database.writeUserData(authUser.user.uid, this.state.nickname, this.state.name, this.state.email, this.state.nascimento,
                              this.state.endereco, this.state.number, this.state.bairro, this.state.cidade,this.state.estado, this.state.hasShelter)
        .then(writeUser => {
          history.push("/")
        })
        .catch(error => {
          this.setState({
            error: error
          })
        })
      })
      .catch(error => {
        this.setState({
          error: error
        })
      });
  }

  render() {

    const isInvalid =
      this.state.password !== this.state.passwordConfirm ||
      this.state.password === '' ||
      this.state.email === '' ||
      this.state.name === '' ||
      this.state.nickname === '' ||
      this.state.nascimento === '' || 
      this.state.endereco === '' ||
      this.state.number === '' ||
      this.state.bairro === '' ||
      this.state.cidade === '' ||
      this.state.estado === '' ;

    const { classes } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="LovePets"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
        />
        <Parallax filter image={require("assets/img/bg2.jpg")}>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}> 
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Registre-se usando suas redes sociais</h4>
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
                  <CardBody className={classes.cardbody}>
                    <form className={classes.containerForm} noValidate autoComplete="off">
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField id="name" label="Nome Completo" className={classes.textField} value={this.state.name}
                          onChange={this.handleChange('name')} margin="normal"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="nascimento" label="Nascimento" type="date" defaultValue="2017-05-24"
                          className={classes.textField} InputLabelProps={{shrink: true}}
                          onChange={this.handleChange('nascimento')} margin="normal" value={this.state.nascimento}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField id="nickname" label="Nickname" className={classes.textField} value={this.state.nickname}
                          onChange={this.handleChange('nickname')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField id="email" label="Email" className={classes.textField} value={this.state.email}
                          onChange={this.handleChange('email')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="password" label="Senha" className={classes.textField} value={this.state.password}
                          onChange={this.handleChange('password')} margin="normal" type="password"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="passwordConfirm" label="Confirme sua Senha" className={classes.textField} value={this.state.passwordConfirm}
                          onChange={this.handleChange('passwordConfirm')} margin="normal" type="password"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={7}>
                        <TextField id="endereco" label="Endereço" className={classes.textField} value={this.state.endereco}
                          onChange={this.handleChange('endereco')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="number" label="Número" className={classes.textField} value={this.state.number}
                          onChange={this.handleChange('number')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="bairro" label="Bairro" className={classes.textField} value={this.state.bairro}
                          onChange={this.handleChange('bairro')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="cidade" label="Cidade" className={classes.textField} value={this.state.cidade}
                          onChange={this.handleChange('cidade')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="estado" label="Estado" className={classes.textField} value={this.state.estado}
                          onChange={this.handleChange('estado')} margin="normal"
                          />
                      </GridItem>
                    </form>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button disabled={isInvalid} color="primary" size="lg" onClick={() => this.onSubmit()}>
                      Registrar
                    </Button>
                    { this.state.error && <p>{this.state.error.message}</p> }
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(registerStyle)(AdoptersRegister);
