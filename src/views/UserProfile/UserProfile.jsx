import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import classNames from "classnames";
import { database } from '../../firebase';

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
      endereco: "",
      number: "",
      bairro: "",
      cidade: "",
      estado: "",
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

    database.writeUserData("", this.state.name, this.state.endereco, this.state.number, this.state.bairro, this.state.cidade,this.state.estado)
    .then(writeUsert => {
    history.push("/")
    })
    .catch(error => {
    this.setState({
    error: error
    })
    })
  }

  render() {

    const isInvalid =
      this.state.name === '' ||
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
            height: 150,
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
                    <h4>Edite suas informarções</h4>
                  </CardHeader>
                  <CardBody className={classes.cardbody}>
                    <form className={classes.containerForm} noValidate autoComplete="off">
                      <GridItem xs={12} sm={12} md={8}>
                        <TextField id="name" label="Nome Completo" className={classes.textField} value={this.state.name}
                          onChange={this.handleChange('name')} margin="normal"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField disabled id="nickname" label="Nickname" className={classes.textField} value={this.state.nickname}
                          onChange={this.handleChange('nickname')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField id="email" disabled label="Email" className={classes.textField} value={this.state.email}
                          onChange={this.handleChange('email')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={9}>
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
                      Atualizar
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
