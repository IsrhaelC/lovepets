import React from "react";
import classNames from "classnames";
import withStyles from "material-ui/styles/withStyles";
import { database } from '../../firebase';

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// sections for this page
import Search from "./Search/Search.jsx"
import Result from "./Result/Result.jsx"

// style
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

const dashboardRoutes = [];

class SearchPage extends React.Component {

  constructor () {
    super()

    this.state = {
      allPets: [],
      searchPets: [],
      search: {}
    }
  }

  componentDidMount () {
    var childs = [];
    database.allPets().then((snapshot) => {
      snapshot.forEach(function(child) {
        childs.push(child.val());
      })
      this.setState({
        allPets: childs
      })
    });
  }

  handleSearch = (obj) => {
    var tempPets = [];
    // eslint-disable-next-line
    this.state.allPets.map((pet, index) => {
      if(this.isValid(pet, obj)){
        tempPets.push(pet)
      }
    })
    this.setState({
      searchPets: tempPets
    })
  }

  isValid (pet, obj) {
    if((pet.age === obj.age || obj.age === "") && (pet.gender === obj.gender || obj.gender === "") &&
        (pet.size === obj.size || obj.size === "") && (pet.type === obj.type || obj.type === "")) {
          return true;
    }
    return false
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="LovePets"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/bg-search.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <h1 className={classes.title}>Encontre seu próximo melhor amigo </h1>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Search handleSearch={this.handleSearch}/>
            {this.state.searchPets &&
              <Result result={this.state.searchPets}/>
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(SearchPage);
