import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong } from "@material-ui/icons";

export default function Task({
  task,
  id,
  taskTekst,
  taskNotes,
  taskImportance,
  deleteTask,
  completeTask,
  showEditModal,
  editTask,
}) {
  //TASK STYLE////////
  const useStyles = makeStyles({
    //card styles
    root: {
      //display: "flex",

      marginTop: ".5rem",
      marginBottom: ".5rem",
      transition: "all .2s",
      //maxHeight: "90px",

      borderLeft: taskImportance ? "10px solid gold" : "10px solid transparent",

      backgroundColor: task.completed ? "grey" : "",
      textDecoration: task.completed ? "line-through" : "",
    },

    actions: {
      alignItems: "stretch",

      //justifyItems: 'start'
      margin: "auto",
      //paddingTop: "10px"
    },

    notes: {
      display: "-webkit-box",
      boxOrient: "vertical",
      lineClamp: "4",
      overflow: "hidden",
      //width: "50px",
      textOverflow: "ellipsis",
    },

    container: {
      //flexGrow: '1'
    },

    checkbox: {
      marginLeft: "-10px",
      alignSelf: "start",
      transform: "translateY(3.5px)",
      //margin: 'auto'
    },

    //text styles
    taskTextUnchecked: {},
    taskTextChecked: {
      textDecoration: "line-through",
    },

    deleteButton: {
      alignSelf: "start",
      marginLeft: "auto !important",
    },

    editButton: {
      alignSelf: "start",
    },
  });

  const classes = useStyles(taskImportance, task.completed);

  //TASK INPUT  HANDLING///////////////
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);

    setTimeout(() => {
      completeTask(task.id);
    });
  };

  //TASK EDITING//////////////////
  const handleEditing = (id) => {
    editTask(id);
    showEditModal();
  };

  useEffect(() => {
    setChecked(task.completed);
  });

  return (
    <Card variant="outlined" key={id} className={classes.root}>
      <CardActions className={classes.actions}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
          className={`${classes.checkbox} ${classes.container}`}
        />
        <div className={classes.checkbox}>
          <Typography variant="body2">
            <strong>{taskTekst}</strong>
            <br></br>
          </Typography>
          <Typography
            className={`${classes.notes} ${classes.container}`}
            variant="caption"
          >
            {taskNotes}
          </Typography>
        </div>
        <IconButton
          className={classes.deleteButton}
          onClick={() => {
            handleEditing(task.id);
          }}
          aria-label="delete"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className={classes.editButton}
          onClick={() => {
            deleteTask(task.id);
          }}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
