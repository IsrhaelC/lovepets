import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddBox from '@material-ui/icons/AddBox';
import Report from '@material-ui/icons/Report';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import { database } from '../../../firebase';

import resultStyle from "assets/jss/material-kit-react/views/resultStyle.jsx";

class Result extends React.Component {

  constructor () {
    super()
    this.state = {
      petDetail: {},
      open: false,
      openMensage: false,
      message: ""
    }
  }

  showDetails = (pet) => {

    switch (pet.age) {
      case "filhote":
        pet.age = "Filhote"
        break;
      case "jovem":
        pet.age = "Jovem"
        break;
      case "adulto":
        pet.age = "Adulto"
        break;
      case "idoso":
        pet.age = "Idoso"
        break;
      default:
        break;
    }
    switch (pet.type) {
      case "cachorro":
        pet.type = "Cachorro"
        break;
      case "gato":
        pet.type = "Gato"
        break;
      case "outros":
        pet.type = "Outros"
        break;
      default:
        break;
    }
    switch (pet.size) {
      case "pequeno":
        pet.size = "Pequeno Porte"
        break;
      case "medio":
        pet.size = "Médio Porte"
        break;
      case "grande":
        pet.size = "Grande Porte"
        break;
      default:
        break;
    }
    switch (pet.gender) {
      case "femea":
        pet.gender = "Fêmea"
        break;
      case "macho":
        pet.gender = "Macho"
        break;
      default:
        break;
    }
    this.setState({
      petDetail: pet
    })
    this.setState({ open: true });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenMensage = () => {
    this.setState({ openMensage: true });
    this.setState({ open: false });
  };

  handleCloseMensage = () => {
    this.setState({ openMensage: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleMessage = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentShelter = JSON.parse(localStorage.getItem('shelter'));
    const now = new Date();
    database.sendMessage(currentUser.uid, currentShelter.uid, this.state.petDetail.petUid, this.state.message, now.toLocaleString(), false).then(result => {
      database.getMessages();
      this.handleCloseMensage();
    }).catch(error => {
      console.log(error)
    })

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          {this.props.result.map((result, index) => (
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
                  <Tooltip id="tooltip-fab" title="Favoritar Pet">
                    <IconButton aria-label="Add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip id="tooltip-fab" title="Ver Mais Detalhes">
                    <IconButton aria-label="Share" onClick={() => this.showDetails(result)}>
                      <AddBox />
                    </IconButton>
                  </Tooltip>
                  <Tooltip id="tooltip-fab" title="Compartilhar Pet">
                    <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip id="tooltip-fab" title="Reportar um problema com essa postagem">
                    <IconButton aria-label="Share">
                      <Report />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          classes={{
            paper: classes.dialogContainer
          }}
        >
          <DialogTitle id="form-dialog-title" className={classes.formContainer}>Detalhes</DialogTitle>
          <DialogContent>
            <Card>
              <CardHeader
                color="primary"
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>I</Avatar>}
                title={this.state.petDetail.shelterName}
                subheader={this.state.petDetail.dataCadastro}>
              </CardHeader>
              <CardMedia
                className={classes.media}
                image={this.state.petDetail.imageURL}
                title={this.state.petDetail.name}
              />
              <CardContent>
                <Typography component="h2">
                  <strong>Nome: {this.state.petDetail.name}</strong>
                </Typography>
                <Typography component="h4">
                  <strong>Descrição: </strong>
                  {this.state.petDetail.descricao}
                </Typography>
                <Chip label={"Espécie: " + this.state.petDetail.type} className={classes.chip} />
                <Chip label={"Idade: " + this.state.petDetail.age} className={classes.chip} />
                <Chip label={"Porte: " + this.state.petDetail.size} className={classes.chip} />
                <Chip label={"Sexo: " + this.state.petDetail.gender} className={classes.chip} />
              </CardContent>
            </Card>  
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancelar
            </Button>
            <Button variant="raised" color="primary" onClick={this.handleClickOpenMensage}>
              Mensagem
              <Icon>send</Icon>
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openMensage}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{"Abrigo " + this.state.petDetail.shelterName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Envie uma mensagem sobre <strong>{this.state.petDetail.name}</strong>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              value={this.state.message}
              id="message"
              name="message"
              label="Sua mensagem..."
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseMensage} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleMessage} color="primary">
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(resultStyle)(Result);
