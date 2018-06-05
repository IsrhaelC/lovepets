import React, { Component } from 'react';
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";

import withStyles from "material-ui/styles/withStyles";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import DashboardIcon from '@material-ui/icons/Dashboard';
import Pets from '@material-ui/icons/Pets';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Result from "../../SearchPage/Result/Result.jsx"

import mypets from "assets/jss/material-kit-react/views/mypets.jsx";

const dashboardRoutes = [];

class MyPets extends Component {
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
        <Button variant="fab" color="primary" aria-label="add" className={classes.buttonFloat}>
          <AddIcon />
        </Button>
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