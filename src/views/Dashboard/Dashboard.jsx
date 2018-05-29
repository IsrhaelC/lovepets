import React, { Component } from 'react';
import { Link } from "react-router-dom";

import withStyles from "material-ui/styles/withStyles";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import ChartCard from "components/Card/ChartCard.jsx"
import ChartistGraph from "react-chartist";
import { AccessTime } from "@material-ui/icons";

import DashboardIcon from '@material-ui/icons/Dashboard';
import Pets from '@material-ui/icons/Pets';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import MonetizationOff from '@material-ui/icons/MoneyOff';


import dashboard from "assets/jss/material-kit-react/views/dashboard.jsx";

const dashboardRoutes = [];
var Chartist = require("chartist");

var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

const completedTasksChart = {
  data: {
    labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
    series: [[230, 750, 450, 300, 280, 240, 200, 190]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

class Dashboard extends Component {
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
          <ChartCard
            chart={
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            }
            chartColor="red"
            title="Completed Tasks"
            text="Last Campaign Performance"
            statIcon={AccessTime}
            statText="campaign sent 2 days ago"
          />
        </main>
      </div>
      )
  }
};

export default withStyles(dashboard)(Dashboard);