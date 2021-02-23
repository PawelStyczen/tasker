import React, { useEffect } from "react";
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

import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StarIcon from '@material-ui/icons/Star';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTaskModal({
  title,
  show,
  hide,
  setTaskName,
  setTaskNotes,
  setImportantTask,
  importantTask,
  taskName,
  taskNotes,
  saveTask,
  editTask
}) {
  //MODAL CONTROLS/////////
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(show);
    if(!editTask){setImportantTask(false)}
  }, [show]);



  //CHECKBOX CONTROLS//////
  const handleChange = (event) => {
    setImportantTask(event.target.checked);
    
  };
    
  

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
              {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={saveTask}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Task"
            onChange={setTaskName}
            value={taskName}
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<StarBorderIcon />}
                checkedIcon={<StarIcon />}
                onChange={handleChange}
                checked={importantTask}
                name="checkedB"
                color="primary"
              />
            }
            label="Important"
          />
          <TextField
            id="filled-textarea"
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            onChange={setTaskNotes}
            value={taskNotes}
          />
        </form>
      </Dialog>
    </div>
  );
}
