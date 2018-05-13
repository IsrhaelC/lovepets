import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import resultStyle from "assets/jss/material-kit-react/views/resultStyle.jsx";

class Result extends React.Component {

  constructor () {
    super()

    this.state = {
      results: [
        {
          owner: "Shelter One",
          symbol: "R",
          date: "4 de Janeiro, 2018",
          img: "assets/img/bg-search.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Shelter Two",
          symbol: "S",
          date: "5 de Feveiro, 2018",
          img: "assets/img/adopter/safe-1.jpg",
          titleImg: "Cat 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Shelter Thre",
          symbol: "X",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/safe-2.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Shelter Four",
          symbol: "B",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/safe-3.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Shelter Five",
          symbol: "W",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/safe-4.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Shelter Six",
          symbol: "D",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/safe-5.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Rescue One",
          symbol: "M",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/paciencia-1.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Rescue Two",
          symbol: "V",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/paciencia-1.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Rescue Thre",
          symbol: "K",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/paciencia-1.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Rescue Four",
          symbol: "H",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/paciencia-1.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Rescue Five",
          symbol: "Y",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/paciencia-1.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        },
        {
          owner: "Rescue Six",
          symbol: "T",
          date: "4 de Janeiro, 2018",
          img: "assets/img/adopter/paciencia-1.jpg",
          titleImg: "Dog 1",
          description: "This impressive paella is a perfect party dish and a fun meal to cook together"
        }
      ]
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          {this.state.results.map((result, index) => (
            <GridItem key={index} xs={6} sm={6} md={4} className={classes.cardGrid}>
              <Card>
                <CardHeader
                  color="primary"
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>{result.symbol}</Avatar>}
                  title={result.owner}
                  subheader={result.date}>
                </CardHeader>
                <CardMedia
                  className={classes.media}
                  image="http://www.bosquedasaguasclaras.com.br/wp-content/uploads/2015/08/animal-dog-outside-pet.jpg"
                  title={result.titleImg}
                />
                <CardContent>
                  <Typography component="p">
                    {result.titleImg}
                  </Typography>
                  <Typography component="p">
                    {result.description}
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(resultStyle)(Result);
