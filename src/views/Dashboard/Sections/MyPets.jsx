import React, { Component } from 'react';
import { Link } from "react-router-dom";

import withStyles from "material-ui/styles/withStyles";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import DashboardIcon from '@material-ui/icons/Dashboard';
import Pets from '@material-ui/icons/Pets';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import MonetizationOff from '@material-ui/icons/MoneyOff';


import dashboard from "assets/jss/material-kit-react/views/dashboard.jsx";

const dashboardRoutes = [];

class MyPets extends Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.root}>
        <Header
          color="dark"
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
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
        <List>
          <Link to="/dashboard">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/my-pets">
            <ListItem button>
              <ListItemIcon>
                <Pets />
              </ListItemIcon>
              <ListItemText primary="Meus Pets" />
            </ListItem>
          </Link>
          <Link to="/new-collaborator">
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText primary="Adicionar Colaborador" />
            </ListItem>
          </Link>
          <Link to="/new-income">
            <ListItem button>
              <ListItemIcon>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText primary="Cadastrar Receita" />
            </ListItem>
          </Link>
          <Link to="/new-expense">
            <ListItem button>
              <ListItemIcon>
                <MonetizationOff />
              </ListItemIcon>
              <ListItemText primary="Cadastrar Despesa" />
            </ListItem>
          </Link>
        </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
      )
  }
};

export default withStyles(dashboard)(MyPets);