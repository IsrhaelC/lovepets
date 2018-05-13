/* eslint-disable */
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Tooltip from "material-ui/Tooltip";

// @material-ui/icons
import { Pets, SupervisorAccount, Favorite, Email, PersonAdd, Person  } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Pets className={classes.icons} />
          <Link to="/search" className={classes.dropdownLink}>
            Encontrar Meu Pet
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <SupervisorAccount className={classes.icons} />
          <Link to="/shelters-rescues" className={classes.navItem}>
            Abrigos e Protetores
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Favorite className={classes.icons} />
          <Link to="/profile-page" className={classes.navItem}>
            Adotantes
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Email className={classes.icons} />
          <Link to="/contact-us" className={classes.navItem}>
            Contate-nos
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          buttonText="Registro"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={PersonAdd}
          dropdownList={[
            <Link to="/shelters-register" className={classes.dropdownLink}>
              Abrigos e Protetores
            </Link>,
            // eslint-disable-next-line
            <Link to="/" className={classes.dropdownLink}>
              Adotantes
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          buttonText="Login"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Person}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Abrigos e Protetores
            </Link>,
            // eslint-disable-next-line
            <Link to="/" className={classes.dropdownLink}>
              Adotantes
            </Link>
          ]}
        />
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
