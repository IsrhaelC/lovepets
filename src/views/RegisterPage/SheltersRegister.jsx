import React from "react";
import withStyles from "material-ui/styles/withStyles";
import classNames from "classnames";
import PlacesAutocomplete from 'react-places-autocomplete'
import { database } from '../../firebase';

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// material-ui components
import TextField from 'material-ui/TextField';

// style
import registerStyle from "assets/jss/material-kit-react/views/registerPage.jsx";

const dashboardRoutes = [];

class SheltersRegister extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      name: "",
      age: "",
      endereco: "",
      qtdPetsFind: "",
      qtdPetsAdopters: "",
      qtdPetsCurrent: "",
      qtdColaboradores: "",
      error: ""
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

    var currentUser = localStorage.getItem('userUid');
    var updates = {}
    
    database.writeShelterData(currentUser, this.state.name, this.state.age, this.state.endereco, this.state.qtdPetsFind,
      this.state.qtdPetsAdopters, this.state.qtdPetsCurrent, this.state.qtdColaboradores, currentUser)
      .then(shelterData => {
        updates['/users/' + currentUser + '/hasShelter'] = "true";
        updates['/users/' + currentUser + '/shelterUid'] = currentUser;
        database.updateData(updates)
        history.push("/");
    }).catch(error => {
      this.setState({
        error: error
      })
    })

  }

  render() {
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
            height: 400,
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
                  <CardBody className={classes.cardbody}>
                    <form className={classes.containerForm} noValidate autoComplete="off">
                      <GridItem xs={12} sm={12} md={7}>
                        <TextField id="name" label="Nome da Instituição" className={classes.textField} value={this.state.name}
                          onChange={this.handleChange('name')} margin="normal"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="age" label="Idade da Instituição" className={classes.textField} value={this.state.age}
                          onChange={this.handleChange('age')} margin="normal" type="number" helperText="Em Anos"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
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
                                label="Digite o endereço do abrigo"
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
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="qtdPetsFind" label="Média de animais resgatados por mês" className={classes.textField} value={this.state.qtdPetsFind}
                          onChange={this.handleChange('qtdPetsFind')} margin="normal" type="number"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="qtdPetsAdopters" label="Média de animais adotados por mês" className={classes.textField} value={this.state.qtdPetsAdopters}
                          onChange={this.handleChange('qtdPetsAdopters')} margin="normal" type="number"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="qtdPetsCurrent" label="Quantidade de animais atualmente na instituição" className={classes.textField} value={this.state.qtdPetsCurrent}
                          onChange={this.handleChange('qtdPetsCurrent')} margin="normal" type="number"
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField id="qtdColaboradores" label="Quantidade de colaboradores" className={classes.textFiel} value={this.state.qtdColaboradores}
                          onChange={this.handleChange('qtdColaboradores')} margin="normal" type="number"
                          /> 
                      </GridItem>
                    </form>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" onClick={() => this.onSubmit()}>
                      Registrar
                    </Button>
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

export default withStyles(registerStyle)(SheltersRegister);
