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
  expandTask
}) {
  //TASK STYLE////////
  const useStyles = makeStyles({
    //card styles
    root: {
     

      marginTop: ".5rem",
      marginBottom: ".5rem",
      

      borderLeft: taskImportance ? "10px solid gold" : "10px solid transparent",

      backgroundColor: task.completed ? "grey" : "",
      textDecoration: task.completed ? "line-through" : "",
    },

    actions: {
      justifyContent: 'start',
      
      
    },

    notes: {
      display: "-webkit-box",
      boxOrient: "vertical",
      lineClamp: task.expanded ? "" : "2",
      overflow: "hidden",
      transition: 'all 0.8s',
      
      maxHeight: task.expanded ? '500px' : "40px",
      textOverflow: "ellipsis",
    },

    container: {
      
    },

    checkbox: {
      marginLeft: "-10px",
      alignSelf: "start",
      transform: "translateY(3.5px)",
     
    },

    taskText: {
      minWidth: '0',
     
      overflow: 'hidden',
      transition: 'all 0.8s'
      
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

  

  //TASK INPUT  HANDLING///////////////
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);

    completeTask(task.id);
  };

  //TASK EDITING//////////////////
  const handleEditing = (id) => {
    editTask(id);
    showEditModal();
  };

  useEffect(() => {
    setChecked(task.completed);
  });

  //TASK EXPANDING/////////////////////
  const [taskExpand, setTaskExpand] = React.useState(false);
  const handleTaskExpand = (e) => {
    
    setTaskExpand(!taskExpand)
    console.log(taskExpand)
    console.log(task.expanded)
  };

  const classes = useStyles(taskImportance, task.completed, task.expanded);

  return (
    <Card
      variant="outlined"
      key={id}
      className={classes.root}
      onClick={() => {expandTask(task.id)}}
    >
      <CardActions className={classes.actions}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          onClick={(event) => {
            event.stopPropagation();
          }}
          inputProps={{ "aria-label": "primary checkbox" }}
          className={`${classes.checkbox} ${classes.container}`}
        />
        <div className={classes.taskText}>
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
          onClick={(event) => {
            event.stopPropagation();
            handleEditing(task.id);
          }}
          aria-label="delete"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className={classes.editButton}
          onClick={(event) => {
            event.stopPropagation();
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
