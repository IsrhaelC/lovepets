import React, { Component } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";

import withStyles from "material-ui/styles/withStyles";

import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import Result from "../../SearchPage/Result/Result.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx";

import mypets from "assets/jss/material-kit-react/views/mypets.jsx";

const dashboardRoutes = [];

class MyPets extends Component {

  state = {
    open: false,
    age: "",
    gender: "",
    type: "",
    size: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.root}>
        <Header
          color="white"
          routes={dashboardRoutes}
          brand="LovePets"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 70,
            color: "white"
          }}
          {...rest}
        />
        <Tooltip id="tooltip-fab" title="Adicionar Novo Pet">
          <Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="add" className={classes.buttonFloat}>
            <AddIcon />
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.formContainer}>Cadastrar Novo Pet</DialogTitle>
          <DialogContent className={classes.formContainer}>
            <DialogContentText>
              Informe os dados do novo pet
            </DialogContentText>
            <TextField margin="dense" id="name" label="Nome do Pet" type="text" className={classes.formControl}/>
            <CustomInput
              labelText="Descrição do pet"
              id="desc"
              formControlProps={{
                className: classes.formControl
              }}
              inputProps={{
                multiline: true,
                rows: 5
              }}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Idade</InputLabel>
              <Select
                value={this.state.age}
                onChange={this.handleChange}
                inputProps={{
                  name: 'age',  
                  id: 'age-simple',
                }}>
                <MenuItem value=""><em>Selecionar</em></MenuItem>
                <MenuItem value={"filhote"}>Filhote</MenuItem>
                <MenuItem value={"jovem"}>Jovem</MenuItem>
                <MenuItem value={"adulto"}>Adulto</MenuItem>
                <MenuItem value={"idoso"}>Idoso</MenuItem>
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
                <MenuItem value={"cachoro"}>Cachorro</MenuItem>
                <MenuItem value={"gato"}>Gato</MenuItem>
                <MenuItem value={"outros"}>Outros</MenuItem>
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
                <MenuItem value={"pqn"}>Pequeno Porte</MenuItem>
                <MenuItem value={"md"}>Médio Porte</MenuItem>
                <MenuItem value={"grd"}>Grande Porte</MenuItem>
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
                <MenuItem value={"macho"}>Macho</MenuItem>
                <MenuItem value={"femea"}>Fêmea</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Result />
          </div>
        </div>
        <Footer />
      </div>
      )
  }
};

export default withStyles(mypets)(MyPets);