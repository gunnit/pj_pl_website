import React, { useContext } from 'react';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
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

const matchPicture = {
  1: '/static/images/taxonomy/undraw_mindfulness_scgo.svg',
  2: '/static/images/taxonomy/undraw_product_teardown_elol.svg',
  3: '/static/images/taxonomy/undraw_Marketing_re_7f1g.svg',
  4: '/static/images/taxonomy/undraw_On_the_way_re_swjt.svg',
  5: '/static/images/taxonomy/undraw_tutorial_video_vtd1.svg',
  6: '/static/images/taxonomy/undraw_reviews_lp8w.svg',
  7: '/static/images/taxonomy/undraw_team_spirit_hrr4.svg',
  8: '/static/images/taxonomy/undraw_programming_2svr.svg',
  9: '/static/images/taxonomy/undraw_predictive_analytics_kf9n.svg',
  10: '/static/images/taxonomy/undraw_add_to_cart_vkjp.svg',
  11: '/static/images/taxonomy/undraw_warning_cyit.svg',
  12: '/static/images/taxonomy/undraw_word_of_mouth_v1j9.svg',
  13: '/static/images/taxonomy/undraw_Business_plan_re_0v81.svg',
  14: '/static/images/taxonomy/undraw_clean_up_ucm0.svg',
  15: '/static/images/taxonomy/undraw_Mind_map_re_nlb6.svg',
  16: '/static/images/taxonomy/undraw_career_development_oqcb.svg',
}






export default function PictureCard({ currentGroup, hierarchy_id, process_element_id, title, body, image, setPreviousGroups }) {
  const classes = useStyles();
  const theme = useTheme()
  const { setTaxonomyGroupId } = useContext(Context)

  const handleClick = async () => {
    setTaxonomyGroupId(process_element_id)
    localStorage.setItem('taxonomyGroupId', process_element_id)

    setPreviousGroups(previous => ([...previous, currentGroup]))
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
              transform: 'translateY(-50%)',
              color: theme.palette.text.primary,
            }}
          >
            <PageviewIcon />
            {/* {hierarchy_id} */}
          </Avatar>
          <CardMedia
            component="img"
            title="cover"
            data-sizes="auto"
            src="/static/images/taxonomy/undraw_team_spirit_hrr4.svg"
            // Gets picture based on first number of hierarchy ID
            src={matchPicture[hierarchy_id.split('.')[0]]}
            // data-src={cover.small}
            // data-srcset={`${cover.small} 600w, ${cover.medium} 960w`}
            className={classes.cardMedia}
          />
        </div>

        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            {hierarchy_id} - {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {body}
          </Typography>
        </CardContent>
      </Card>
    </ButtonAnimate>
  );
}