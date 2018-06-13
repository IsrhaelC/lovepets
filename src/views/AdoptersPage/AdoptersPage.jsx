import React from "react";
import classNames from "classnames";
import withStyles from "material-ui/styles/withStyles";

// material-ui icons
import Pets from "@material-ui/icons/Pets";
import Healing from "@material-ui/icons/Healing";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// images
import profile from "assets/img/adopters/perfil.jpg";
import paciencia1 from "assets/img/adopters/paciencia-1.jpg";
import paciencia2 from "assets/img/adopters/paciencia-2.jpg";
import paciencia3 from "assets/img/adopters/paciencia-3.jpg";
import paciencia4 from "assets/img/adopters/paciencia-4.jpg";
import paciencia5 from "assets/img/adopters/paciencia-5.jpg";
import carinho1 from "assets/img/adopters/carinho-1.jpg";
import carinho2 from "assets/img/adopters/carinho-2.jpg";
import carinho3 from "assets/img/adopters/carinho-3.jpg";
import carinho4 from "assets/img/adopters/carinho-4.jpg";
import carinho5 from "assets/img/adopters/carinho-5.jpg";
import cuidado1 from "assets/img/adopters/safe-1.jpg";
import cuidado2 from "assets/img/adopters/safe-2.jpg";
import cuidado3 from "assets/img/adopters/safe-3.jpg";
import cuidado4 from "assets/img/adopters/safe-4.jpg";
import cuidado5 from "assets/img/adopters/safe-5.png";

// style
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

class ProfilePage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
      <div>
        <Header
          color="transparent"
          brand="LovePets"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/bg-adopters.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={profile} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>Adoção responsável de animais</h3>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <p>
                A adoção é um nobre ato que dá a oportunidade a um 
                bichinho de poder contar uma família que o ame e o 
                trate da maneira que ele merece, já que, além de serem 
                seres especiais, os animais de estimação acabam sendo uma 
                parte essencial da vida das pessoas.
                Embora adotar seja algo que traz felicidade 
                tanto para o animal como para o dono, é uma decisão que 
                requer muitíssima responsabilidade, já que por se tratar 
                de um ser vivo, devemos oferecer não somente todos os cuidados 
                correspondentes, mas também ser um exemplo a ser seguido, sendo 
                uma pessoa que o trate respeitosa e dignamente. 
                <strong> É por isso que aqui deixaremos as chaves para uma adoção responsável..</strong>{" "}
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Paciência",
                        tabIcon: Favorite,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                              <img
                                alt="..."
                                src={paciencia1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={paciencia2}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={paciencia3}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={paciencia4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={paciencia5}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Carinho",
                        tabIcon: Pets,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={carinho1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={carinho2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={carinho3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={carinho4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={carinho5}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Cuidados",
                        tabIcon: Healing,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={cuidado1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={cuidado2}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={cuidado3}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={cuidado4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={cuidado5}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
