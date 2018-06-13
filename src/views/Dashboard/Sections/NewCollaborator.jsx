import React, { Component } from 'react';
import withStyles from "material-ui/styles/withStyles";
import classNames from "classnames";
import { database } from '../../../firebase';

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Card from "components/Card/Card.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";

// material-ui Core
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

// material-ui components
import TextField from 'material-ui/TextField';

// material-ui icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Admin from '@material-ui/icons/Lock';

// style
import newcollaborator from "assets/jss/material-kit-react/views/newcollaborator.jsx";

const dashboardRoutes = [];

class NewCollaborator extends Component {

  constructor () {
    super()
    this.state = {
      newuser: "",
      userResult: {},
      open: false,
      openAlert: false,
      collaborators: [],
      errorMessage: {
        title: "",
        msg: "",
        buttonClose: "",
        buttonConfirm: ""
      },
      removeMemberUid: ""
    }
  }

  componentDidMount () {
    this.updateMembers();
  }

  handleChange = name => event => {
    
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = () => {
    var search = this.state.newuser;
    var tempUser = {};
    var error = false;
    database.allUsers().then(snapshot => {
      snapshot.forEach(function(child) {
        if(child.val().email === search || child.val().nickname === search){
          tempUser = child.val();
          console.log(child.val())
          error = true;
        }
      })
      if(error === true) {
        this.setState({
          userResult: tempUser,
          open: true
        })
      } else {
        this.setState({
          openAlert: true,
          errorMessage: {
            title: "Usuário Não encontrado",
            msg: "Email ou Nickname não foi encontrado",
            buttonClose: "Fechar"
          }
        })
      }
    })
  }

  addMember = () => {
    var shelter = JSON.parse(localStorage.getItem('shelter'));
    var updates = {}
    console.log(this.state.userResult)
    updates['/users/' + this.state.userResult.uid + '/shelterUid'] = shelter.uid;
    updates['/users/' + this.state.userResult.uid + '/hasShelter'] = true;
    database.updateData(updates).then(() => {
      this.setState({
        open: false
      })
      this.updateMembers();
    }).catch(error => {
      console.log(error)
    })
  }

  handleRemove = (uid, name) => {
    this.setState({
      openAlert: true,
      errorMessage: {
        title: "Remover Usuario",
        msg: "Deseja realmente remover o colaborador " + name + "?",
        buttonClose: "Cancelar",
        buttonConfirm: "Remover"
      },
      removeMemberUid: uid
    })
  }

  updateMembers () {
    var shelter = JSON.parse(localStorage.getItem('shelter'));
    var tempColl = [];
    database.allUsers().then(snapshot => {
      snapshot.forEach(function(child) {
        if(child.val().shelterUid === shelter.uid){
          tempColl.push(child.val())
        }
      })
      this.setState({
        collaborators: tempColl
      })
    })
  }

  removeMember = () => {
    var updates = {}
    console.log(this.state.userResult)
    updates['/users/' + this.state.removeMemberUid + '/shelterUid'] = "none";
    updates['/users/' + this.state.removeMemberUid + '/hasShelter'] = false;
    database.updateData(updates).then(obj => {
      this.setState({
        openAlert: false
      })
      this.updateMembers();
    }).catch(error => {
      console.log(error)
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenAlert = () => {
    this.setState({ openAlert: true });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
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
        <main className={classes.section}>
          <GridContainer className={classes.search}>
            <GridItem xs={12} sm={12} md={6}>
              <TextField id="newuser" label="Novo Colaborador" type="text" className={classes.textField}
                onChange={this.handleChange('newuser')} margin="normal" value={this.state.newuser}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                helperText="Digite o E-mail ou Nickname do colaborador"
              />
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.search}>
            <GridItem xs={12} sm={12} md={6}>
              <Button color="primary" onClick={this.onSubmit}>
                Buscar
              </Button>
            </GridItem>
          </GridContainer>
          <GridContainer>
            {this.state.collaborators.map((value, key) => (
              <GridItem key={key} xs={12} sm={12} md={3}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img src={value.avatarURL} alt="..." className={imageClasses} />
                  </GridItem>
                  <h4 className={classes.cardTitle}>
                    {value.name} <i>{"(" + value.nickname + ")"}</i>
                    <br />
                    <small className={classes.smallTitle}>{value.email}</small>
                  </h4>
                  <CardFooter className={classes.justifyCenter}>
                    {value.uid !== value.shelterUid &&
                      <Tooltip id="tooltip-fab" title="Remover Colaborador">
                        <IconButton onClick={() => this.handleRemove(value.uid, value.nickname)} color="transparent" className={classes.margin5}>
                          <RemoveCircle />
                        </IconButton>
                      </Tooltip>
                    }
                    {value.uid === value.shelterUid &&
                      <Tooltip id="tooltip-fab" title="Administrador">
                        <IconButton color="transparent" className={classes.margin5}>
                          <Admin />
                        </IconButton>
                      </Tooltip>
                    }
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </GridContainer>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" className={classes.formContainer}>Adicionar Novo Colaborador</DialogTitle>
            <DialogContent className={classes.formContainer}>
              <DialogContentText>
                <strong>{"Dados do novo colaborador: "}</strong>
              </DialogContentText>
              <DialogContentText>
                {"Nome: " + this.state.userResult.name}
              </DialogContentText>
              <DialogContentText>
                {"Nickname: " + this.state.userResult.nickname}
              </DialogContentText>
              <DialogContentText>
                {"Email: " + this.state.userResult.email}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.addMember} color="primary">
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.openAlert}
            onClose={this.handleCloseAlert}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" className={classes.formContainer}>{this.state.errorMessage.title}</DialogTitle>
            <DialogContent className={classes.formContainer}>
              <DialogContentText>
                <strong>{this.state.errorMessage.msg}</strong>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseAlert} color="primary">
                {this.state.errorMessage.buttonClose}
              </Button>
              {this.state.errorMessage.buttonConfirm !== "" &&
                <Button onClick={this.removeMember} color="secondary">
                  {this.state.errorMessage.buttonConfirm}
                </Button>
              }
            </DialogActions>
          </Dialog>
        </main>
      </div>
      )
  }
};

export default withStyles(newcollaborator)(NewCollaborator);