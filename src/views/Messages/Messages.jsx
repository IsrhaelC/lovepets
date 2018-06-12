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
import Delete from "@material-ui/icons/Delete";
import Tooltip from '@material-ui/core/Tooltip';
import { database } from '../../firebase';

import messages from "assets/jss/material-kit-react/views/messages.jsx";

const dashboardRoutes = [];

class Messages extends React.Component {

  constructor () {
    super()
    this.state = {
      myMsgs: []
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
                    <ListItem key={key} dense button className={classes.listItem}>
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
        <Footer />
      </div>
    );
  }
}

export default withStyles(messages)(Messages);

