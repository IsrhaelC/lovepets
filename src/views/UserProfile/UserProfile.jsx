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
import PlacesAutocomplete   from 'react-places-autocomplete'


import registerStyle from "assets/jss/material-kit-react/views/registerPage.jsx";

const dashboardRoutes = [];

class AdoptersRegister extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      userUid: "",
      name: "",
      nickname: "",
      email: "",
      endereco: "",
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

  componentWillMount() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.setState({
      userUid: currentUser.uid,
      name: currentUser.name,
      nickname: currentUser.nickname,
      email: currentUser.email,
      endereco: currentUser.endereco
    })
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

    var updates = {}
    updates['/users/' + this.state.userUid + '/name'] = this.state.name;
    updates['/users/' + this.state.userUid + '/endereco'] = this.state.endereco;
    database.updateUserData(updates).then(() => history.push("/")).catch(error => console.log(error))
  }

  render() {

    const isInvalid =
      this.state.name === '' ||
      this.state.endereco === '';

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
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField id="name" label="Nome Completo" className={classes.textField} value={this.state.name}
                          onChange={this.handleChange('name')} margin="normal"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField disabled id="nascimento" label="Nascimento" type="date" defaultValue="2017-05-24"
                          className={classes.textField} InputLabelProps={{shrink: true}}
                          onChange={this.handleChange('nascimento')} margin="normal" value={this.state.nascimento}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField disabled id="nickname" label="Nickname" className={classes.textField} value={this.state.nickname}
                          onChange={this.handleChange('nickname')} margin="normal"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField disabled id="email" label="Email" className={classes.textField} value={this.state.email}
                          onChange={this.handleChange('email')} margin="normal"
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
