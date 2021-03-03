import 'firebase/auth';
import firebase from 'firebase/app';
import { PATH_APP } from 'routes/paths';
import React, { useState, useContext } from 'react';
import SearchNotFound from 'components/SearchNotFound';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    TableRow,
    TableCell,
    Typography,
} from '@material-ui/core';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { MIconButton } from '@material-extend';
import { useSnackbar } from 'notistack';
import PageviewIcon from '@material-ui/icons/Pageview';
// ----------------------------------------------------------------------




function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    likeCell: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    likeButtons: {
        display: 'flex',
    },
    buttonAnimate: {
        // display: 'flex',
        height: '100%',
        width: '100%',
    },
    highlight: {
    },
    // clickableCell: {
    //     '&:hover': {
    //         // backgroundColor: `${theme.palette.warning.lighter} !important`,
    //         cursor: 'pointer'
    //     },

    // },
    likeButton: {
        color: theme.palette.warning.light
    }
}));

// ----------------------------------------------------------------------

export default function Row({
    id,
    hierarchy_id,
    process_element,
    definition,
    metric,
    process_element_id,
    liked,
    user_liked,
    labelId
}) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(-1);
    const [isOpen, setOpen] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const [userHasLiked, setUserHasLiked] = useState(user_liked)
    const [numberOfLikes, setNumberOfLikes] = useState(liked.length)
    const { setTaxonomyGroupId, userId } = useContext(Context)

    const history = useHistory()
    const theme = useTheme()

    // const handleSelectAllClick = event => {
    //   if (event.target.checked) {
    //     const newSelecteds = glossary.map(n => n.name);
    //     setSelected(newSelecteds);
    //     return;
    //   }
    //   setSelected([]);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = event => {
        setFilterName(event.target.value);
    };

    // const handleOpen = (event, id) => {
    //   setOpen(event.currentTarget);

    //   // Context to get the process details if the user clicks to view the process details
    //   setCurrentProcessId(id)

    //   // So the currentProcessId can persist in case the user reloads while viewing a page that needs a currentProcessId
    //   localStorage.setItem('currentProcessId', id)

    // };


    const handleClick = (process_element_id) => {
        setTaxonomyGroupId(process_element_id)
        localStorage.setItem('taxonomyGroupId', process_element_id)
        history.push(PATH_APP.discovery.group)
    }

    const { enqueueSnackbar } = useSnackbar();

    const handleLikeClick = async (process_element_id, like) => {
        if (like && userHasLiked) {
            return
        } else if (!like && !userHasLiked) {
            return
        }


        setUserHasLiked(like)

        if (like) {
            setNumberOfLikes(previous => previous + 1)
            enqueueSnackbar('Added to Liked Processes', { variant: 'success' })
        } else {
            setNumberOfLikes(previous => previous - 1)
            enqueueSnackbar('Removed from Liked Processes', { variant: 'error' })
        }

        const token = await firebase.auth().currentUser.getIdToken(true);

        await fetch(`${apiBaseUrl}/like-this-process/${userId}/${process_element_id}`, {
            method: 'POST',
            // body: JSON.stringify({}),
            headers: {
                // "Content-Type": 'application/json',
                "Authorization": token
            }
        })




    }


    return (

        <TableRow
            key={id}
            tabIndex={-1}
            role="checkbox"
        >
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
            >
                <MIconButton size='large'>
                    <PageviewIcon onClick={() => handleClick(process_element_id)} />
                </MIconButton>
            </TableCell>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
            >
                {hierarchy_id}
            </TableCell>
            {/* <ButtonAnimate className={classes.buttonAnimate}> */}
            <TableCell>
                {process_element}
            </TableCell>
            {/* </ButtonAnimate> */}
            <TableCell>{definition}</TableCell>
            <TableCell>{metric}</TableCell>
            <TableCell className={classes.likeCell}>

                <Typography>{numberOfLikes}</Typography>
                <div className={classes.likeButtons}>
                    <MIconButton color={userHasLiked ? 'warning' : 'default'}>
                        <ThumbUpIcon onClick={() => handleLikeClick(process_element_id, true)} />
                    </MIconButton>
                    <MIconButton>
                        <ThumbDownIcon onClick={() => handleLikeClick(process_element_id, false)} />
                    </MIconButton>
                </div>
            </TableCell>
        </TableRow>
    );
}