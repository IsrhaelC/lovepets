import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import searchStyle from "assets/jss/material-kit-react/views/search.jsx";

class Search extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      age: "",
      gender: "",
      type: "",
      size: ""
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes[this.state.cardAnimaton]}>
                <p className={classes.divider}><strong>Encontre seu Pet</strong></p>
                <CardBody className={classes.cardbody}>
                  <form className={classes.form} autoComplete="off">
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-simple">Idade</InputLabel>
                      <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'age',  
                          id: 'age-simple',
                        }}>
                        <MenuItem value="">
                          <em>Selecionar</em>
                        </MenuItem>
                        <MenuItem value={10}>Filhote</MenuItem>
                        <MenuItem value={20}>Jovem</MenuItem>
                        <MenuItem value={30}>Adulto</MenuItem>
                        <MenuItem value={30}>Idoso</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="type-simple">Espécie</InputLabel>
                      <Select
                        value={this.state.type}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'type',  
                          id: 'type-simple',
                        }}>
                        <MenuItem value="">
                          <em>Selecionar</em>
                        </MenuItem>
                        <MenuItem value={20}>Cachorro</MenuItem>
                        <MenuItem value={10}>Gato</MenuItem>
                        <MenuItem value={30}>Outros</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="size-simple">Tamanho</InputLabel>
                      <Select
                        value={this.state.size}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'size',  
                          id: 'size-simple',
                        }}>
                        <MenuItem value="">
                          <em>Selecionar</em>
                        </MenuItem>
                        <MenuItem value={20}>Pequeno Porte</MenuItem>
                        <MenuItem value={20}>Médio Porte</MenuItem>
                        <MenuItem value={20}>Grande Porte</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="gender-simple">Sexo</InputLabel>
                      <Select
                        value={this.state.gender}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'gender',  
                          id: 'gender-simple',
                        }}>
                        <MenuItem value="">
                          <em>Selecionar</em>
                        </MenuItem>
                        <MenuItem value={20}>Macho</MenuItem>
                        <MenuItem value={20}>Fêmea</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button color="primary" size="lg">
                    Buscar
                  </Button>
                </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(searchStyle )(Search);