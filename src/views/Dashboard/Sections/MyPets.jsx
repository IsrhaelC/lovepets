import React, { Component } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import { database } from '../../../firebase';

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
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import CheckCircle from '@material-ui/icons/CheckCircle';

import mypets from "assets/jss/material-kit-react/views/mypets.jsx";

const dashboardRoutes = [];

class MyPets extends Component {

  state = {
    open: false,
    name: "",
    shortDesc: "",
    descricao: "",
    age: "",
    gender: "",
    type: "",
    size: "",
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
    myPets: [],
    currentShelter: JSON.parse(localStorage.getItem('shelter'))
  };

  componentWillMount () {
    var childs = [];
    database.allPets().then((snapshot) => {
      snapshot.forEach(function(child) {
        childs.push(child.val());
      })
      this.setState({
        myPets: childs
      })
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    var childs = [];
    database.allPets().then((snapshot) => {
      snapshot.forEach(function(child) {
        childs.push(child.val());
      })
      this.setState({
        myPets: childs
      })
    });
  };

  onSubmit = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const monName = ["janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro"];
    const now = new Date();
    const dataCadastro = now.getDate() + " de " + monName[now.getMonth()] + " de " + now.getFullYear();

    database.writePetData(currentUser.uid, this.state.currentShelter.name, this.state.name, this.state.descricao,
      this.state.age, this.state.gender, this.state.type, this.state.size, this.state.avatarURL, dataCadastro, this.state.shortDesc)
    .then(() => this.handleClose())
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeName = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});

  handleProgress = (progress) => this.setState({progress});

  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }

  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('petImages').child(filename).getDownloadURL().then(url => {
      this.setState({avatarURL: url})
    }).catch(url => alert("catch"));
  };

  render() {
    const { classes, ...rest } = this.props;
    const isValid = this.state.avatarURL === "" ||
                    this.state.name === "" ||
                    this.state.descricao === "" ||
                    this.state.age === "" ||
                    this.state.gender === "" ||
                    this.state.size === "" ||
                    this.state.type === "";
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
            <TextField
              onChange={this.handleChangeName('name')}
              value={this.state.name}
              name="name"
              margin="dense"
              id="name"
              label="Nome do Pet"
              type="text"
              className={classes.formControl}
            />
            <TextField
              onChange={this.handleChangeName('shortDesc')}
              value={this.state.shortDesc}
              name="shortDesc"
              margin="dense"
              id="shortDesc"
              label="Descrição curta"
              type="text"
              className={classes.formControl}
            />
            <TextField
              id="multiline-static"
              name="descricao"
              label="Descrição  Completa"
              onChange={this.handleChangeName('descricao')}
              multiline
              rows="4"
              defaultValue={this.state.descricao}
              className={classes.formControl}
              margin="normal"
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
                <MenuItem value=""><em>Selecionar</em></MenuItem>
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
                <MenuItem value=""><em>Selecionar</em></MenuItem>
                <MenuItem value={"pequeno"}>Pequeno Porte</MenuItem>
                <MenuItem value={"medio"}>Médio Porte</MenuItem>
                <MenuItem value={"grande"}>Grande Porte</MenuItem>
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
                <MenuItem value=""><em>Selecionar</em></MenuItem>
                <MenuItem value={"macho"}>Macho</MenuItem>
                <MenuItem value={"femea"}>Fêmea</MenuItem>
              </Select>
            </FormControl>
            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref('petImages')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
            {this.state.isUploading &&
              <CircularProgress/>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button disabled={isValid} onClick={this.onSubmit} color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              {this.state.myPets.map((result, index) => (
                <GridItem key={index} xs={6} sm={6} md={4} className={classes.cardGrid}>
                  <Card>
                    <CardHeader
                      color="primary"
                      avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>I</Avatar>}
                      title={result.shelterName}
                      subheader={result.dataCadastro}>
                    </CardHeader>
                    <CardMedia
                      className={classes.media}
                      image={result.imageURL}
                      title={result.name}
                    />
                    <CardContent>
                      <Typography component="p">
                        <strong>{result.name}</strong>
                      </Typography>
                      <Typography component="p">
                        {result.shortDesc}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                      <Tooltip id="tooltip-fab" title="Editar Informações">
                        <IconButton aria-label="Editar Informações" onClick={() => alert(result.name)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip id="tooltip-fab" title="Deletar Pet">
                        <IconButton aria-label="Deletar Pet">
                          <Delete />
                        </IconButton>
                        </Tooltip>
                      <Tooltip id="tooltip-fab" title="Marcar como Adotado">
                        <IconButton aria-label="Marcar como Adotado">
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
      )
  }
};

export default withStyles(mypets)(MyPets);