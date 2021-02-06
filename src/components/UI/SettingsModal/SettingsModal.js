import React, { useEffect, useState } from "react";

import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    margin: "auto",

    "& > *": {
      marginBottom: "2rem",
    },
  },
}));
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTaskModal({ show, hide }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  useEffect(() => {
    setOpen(show);
  }, [show]);

  async function handleLogout() {
    try {
      await logout()
      history.pushState('/logout')
    }
    catch {
      setError('failed to log out')
    }
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={hide}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={hide}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
      {error}
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemText primary="Account" />
            <Typography>{currentUser.email}</Typography>
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Log Out" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
