import React, { useContext } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Avatar,
  CardMedia,
  Typography,
  IconButton,
  CardContent
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import { ButtonAnimate } from 'components/Animate';
import Context from 'context/Context';

// ----------------------------------------------------------------------


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  cardMediaWrap: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    paddingTop: 'calc(100% * 9 / 16)',
    '&:before': {
      top: 0,
      zIndex: 9,
      content: "''",
      width: '100%',
      height: '100%',
      position: 'absolute',
      // backdropFilter: 'blur(3px)',
      borderTopLeftRadius: theme.shape.borderRadiusMd,
      borderTopRightRadius: theme.shape.borderRadiusMd,
      // backgroundColor: alpha(theme.palette.primary.darker, 0.72)
    }
  },
  cardMedia: {
    top: 0,
    zIndex: 8,
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  avatarShape: {
    zIndex: 10,
    bottom: -26,
    position: 'absolute'
  },
  cardContent: {
    paddingBottom: 0,
    marginTop: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

function UserItem({ process_element_id, title, body, image }) {
  const classes = useStyles();

  const { setTaxonomyGroupId } = useContext(Context)



  const handleClick = async () => {
    setTaxonomyGroupId(process_element_id)
    localStorage.setItem('taxonomyGroupId', process_element_id)
  }


  return (
    <ButtonAnimate className={classes.root} onClick={handleClick}>
      <Card className={classes.root}>
        <div className={classes.cardMediaWrap}>
          {/* <MIcon
          size={144}
          color="paper"
          src="/static/icons/shape-avatar.svg"
          className={classes.avatarShape}
        /> */}
          <Avatar
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              position: 'absolute',
              transform: 'translateY(-50%)'
            }}
          >
            <PageviewIcon />
          </Avatar>
          <CardMedia
            component="img"
            title="cover"
            data-sizes="auto"
            src="/static/images/taxonomy/undraw_team_spirit_hrr4.svg"
            // data-src={cover.small}
            // data-srcset={`${cover.small} 600w, ${cover.medium} 960w`}
            className={classes.cardMedia}
          />
        </div>

        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" align="center">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {body}
          </Typography>
        </CardContent>
      </Card>
    </ButtonAnimate>
  );
}

export default UserItem;
