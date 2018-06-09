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
import PlacesAutocomplete   from 'react-places-autocomplete'

import registerStyle from "assets/jss/material-kit-react/views/registerPage.jsx";

const dashboardRoutes = [];

class AdoptersRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      nascimento: '  /  /    ',
      endereco: "",
      hasShelter: "false",
      error: null,
     };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeAddress = (endereco) => {
    this.setState({ endereco })
  }

  handleSelect = (address) => {
    this.setState({ endereco: address })
  }

  onSubmit = () => {
    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser => {
        database.writeUserData(authUser.user.uid, this.state.nickname, this.state.name,
                              this.state.email, this.state.nascimento,
                              this.state.endereco, this.state.hasShelter)
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
      this.state.endereco === '' ;

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
                <Card>
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
                        <PlacesAutocomplete
                          value={this.state.endereco}
                          onChange={this.handleChangeAddress}
                          onSelect={this.handleSelect}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                            <div>
                              <TextField
                                {...getInputProps({
                                  className: 'location-search-input'})
                                } 
                                id="endereco"
                                autoComplete="off"
                                label="Digite seu endereço"
                                className={classes.textField}
                                margin="normal" type="text" />
                              <div className="autocomplete-dropdown-container">
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                      <span>{suggestion.description}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
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
