import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    styling:{
        marginTop: '60px'
    }
  }));
 

export default function ShowBasket(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const {joblist, hideHandler} = props;
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    }

    return (
    <div>
    <Grid container spacing ={3} justify="center" className={classes.styling}>
    {joblist.map((c) => {
            return(
            <React.Fragment>
            <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {c.id}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="hide">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Job Title"
                    subheader="Company Name"
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" >
                      Job Details 
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="hide" color = 'secondary' value ={c.id} onClick = {hideHandler.bind(this, c.id)}>
                      <BackspaceIcon />
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Application Requirements:</Typography>
                      <Typography paragraph>
                        Job Requirements
                      </Typography>
                      <Typography paragraph>
                        University, Grade
                      </Typography>
                      <Typography paragraph>
                        Working time
                      </Typography>
                      <Typography>
                        Address info
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
                </Grid>
                </React.Fragment>
                )
           })}
    </Grid>
    </div>
    )
}