/* eslint-disable */
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Tooltip from "material-ui/Tooltip";
import Divider from 'material-ui/Divider';

// @material-ui/icons
import { Pets, SupervisorAccount, Favorite, Email, PersonAdd, AccountCircle, Person } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import { auth } from '../../firebase';

function HeaderLinks({ ...props }) {
  const { history, classes } = props;
  var userLogged = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : "false";
  var userHasShelter = "true";
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
          <Link to="/adopters-page" className={classes.navItem}>
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
      {userLogged === "false" && 
        <ListItem className={classes.listItem}>
          <CustomDropdown
            buttonText="Registro"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={PersonAdd}
            dropdownList={[
              <Link to="/adopters-register" className={classes.dropdownLink}>
                Adotantes
              </Link>
            ]}
          />
        </ListItem>
      }
      {userLogged === "true" && 
        <ListItem className={classes.listItem}>
          <CustomDropdown
            buttonText="Registrar Abrigo"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={PersonAdd}
            dropdownList={[
              <Link to="/shelters-register" className={classes.dropdownLink}>
                Abrigos e Protetores
              </Link>
            ]}
          />
        </ListItem>
      }
      {userLogged === "false" && 
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <Person className={classes.icons} />
            <Link to="/login-page" className={classes.navItem}>
              Login
            </Link>
          </Button>
        </ListItem>
      }
      {userLogged === "true" && 
        <ListItem className={classes.listItem}>
          {userHasShelter == "true"  &&
            <CustomDropdown
              buttonText="Minha Conta"
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={AccountCircle}
              dropdownList={[
                <Link to="/" className={classes.dropdownLink}>
                  Favoritos
                </Link>,
                <Divider />,
                <Link to="/" className={classes.dropdownLink}>
                  Meus Pets
                </Link>,
                <Link to="/" className={classes.dropdownLink}>
                  Colaboradores
                </Link>,
                <Link to="/" className={classes.dropdownLink}>
                  Menssagens
                </Link>,
                <Divider />,
                <Link to="/" className={classes.dropdownLink} onClick={() => { auth.doSignOut(); localStorage.clear();}}>
                  Sair
                </Link>
              ]}
            />
          }
          {userHasShelter == "false"  &&
            <CustomDropdown
            buttonText="Minha Conta"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Link to="/" className={classes.dropdownLink}>
                Favoritos
              </Link>,
              <Link to="/" className={classes.dropdownLink} onClick={() => { auth.doSignOut(); localStorage.clear();}}>
                Sair
              </Link>
            ]}
          />
          }
        </ListItem>
      }
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
