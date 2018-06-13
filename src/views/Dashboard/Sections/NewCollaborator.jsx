import React, { Component } from 'react';

import withStyles from "material-ui/styles/withStyles";
import classNames from "classnames";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import TextField from 'material-ui/TextField';
import CardFooter from "components/Card/CardFooter.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { database } from '../../../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      collaborators: []
    }
  }

  componentDidMount () {
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
          openAlert: true
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
    database.updateData(updates).then(obj => {
      this.setState({
        open: false
      })
      console.log(obj)
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
                    {value.name}
                    <br />
                    <small className={classes.smallTitle}>{value.email}</small>
                  </h4>
                  <CardFooter className={classes.justifyCenter}>
                    <IconButton color="transparent" className={classes.margin5}>
                      <i className={classes.socials + " fab fa-twitter"} />
                    </IconButton>
                    <IconButton color="transparent" className={classes.margin5}>
                      <i className={classes.socials + " fab fa-linkedin"} />
                    </IconButton>
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
            <DialogTitle id="form-dialog-title" className={classes.formContainer}>{"Usuário não encontrado"}</DialogTitle>
            <DialogContent className={classes.formContainer}>
              <DialogContentText>
                <strong>{"Email ou Nickname não foi encontrado"}</strong>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseAlert} color="primary">
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
      )
  }
};

export default withStyles(newcollaborator)(NewCollaborator);