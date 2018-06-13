import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "material-ui/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NotificationImportant from "@material-ui/icons/NotificationsActive"
import Delete from "@material-ui/icons/Reply";
import Tooltip from '@material-ui/core/Tooltip';
import { database } from '../../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import messages from "assets/jss/material-kit-react/views/messages.jsx";

const dashboardRoutes = [];

class Messages extends React.Component {

  constructor () {
    super()
    this.state = {
      myMsgs: [],
      open: false,
      message: {
        from: "",
        date: "",
        messageFrom: ""
      },
      myMsg: ""
    }
  }

  componentDidMount () {
    var unSortMsgs = JSON.parse(localStorage.getItem('messages'));
    unSortMsgs.sort(function(a, b) {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
    this.setState({
      myMsgs: unSortMsgs
    })
  }

  updateMsgs = () => {
    var unSortMsgs = JSON.parse(localStorage.getItem('messages'));
    unSortMsgs.sort(function(a, b) {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
    this.setState({
      myMsgs: unSortMsgs
    })
  }

  handleClickOpen = (idFrom, date, msgUid) => {
    var msgTemp = this.state.myMsgs
    for(var i in msgTemp) {
      if(idFrom === msgTemp[i].from && date === msgTemp[i].date){
        this.setState({
          message:{
            messageFrom:  msgTemp[i].message,
            date: msgTemp[i].date,
            from: msgTemp[i].nameFrom
          }
        })
      }
    }
    var updates = {}
    updates['/messages/' + msgUid + '/isRead'] = true;
    database.updateData(updates).then(() => this.setState({open: true})).catch(error => console.log(error))
    database.getMessages();
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
      <div>
        <Header
          color="white"
          routes={dashboardRoutes}
          brand={"LovePets"}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <GridContainer className={classes.gridContainer}>
          <GridItem xs={12} sm={12} md={6}>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={classes.container}>
                <List className={classes.list}>
                  {this.state.myMsgs.map((value, key) => (
                    <ListItem key={key} dense button className={classes.listItem} onClick={() => this.handleClickOpen(value.from, value.date, value.uid)}>
                      <Avatar>
                        I
                      </Avatar>
                      <ListItemText primary={value.nameFrom ? value.nameFrom : "Sem Nome"} secondary={value.date} className={classes.nameTo}/>
                      <ListItemSecondaryAction className={classes.action}>
                        {value.isRead === true && 
                          <Tooltip id="tooltip-icon" title="Deletar Mensagem">
                            <Delete className={classes.iconDelete} />
                          </Tooltip>
                        }
                        {value.isRead === false &&
                          <Tooltip id="tooltip-icon" title="Mensagem Não Lida">
                            <NotificationImportant className={classes.iconUnread}/>
                          </Tooltip>
                        }
                        
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{"De: " + this.state.message.from}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>{"Mensagem: " }</strong>
            </DialogContentText>
            <DialogContentText>
              {this.state.message.messageFrom}
            </DialogContentText>
            <DialogContentText>
              <i>{this.state.message.date}</i>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              value={this.state.myMsg}
              id="message"
              name="message"
              label="Sua mensagem..."
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Responder
            </Button>
          </DialogActions>
        </Dialog>
        <Footer />
      </div>
    );
  }
}

export default withStyles(messages)(Messages);

