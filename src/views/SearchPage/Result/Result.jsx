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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          {this.props.result.map((result, index) => (
            <GridItem key={index} xs={6} sm={6} md={4} className={classes.cardGrid}>
              <Card>
                <CardHeader
                  color="primary"
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>I</Avatar>}
                  title={result.shelterName}
                  subheader={result.dataCadastro}>
                </CardHeader>
                <CardMedia
                  className={classes.media}
                  image={result.imageURL}
                  title={result.name}
                />
                <CardContent>
                  <Typography component="p">
                    <strong>{result.name}</strong>
                  </Typography>
                  <Typography component="p">
                    {result.shortDesc}
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
