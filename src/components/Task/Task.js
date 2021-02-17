import React, {useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from "@material-ui/core/styles";

export default function Task ({task, id, taskTekst, taskNotes, deleteTask, completeTask, showEditModal, editTask}) {


  //TASK STYLE////////
  const useStyles = makeStyles({
    //card styles
    root: {
      marginTop: ".5rem",
      marginBottom: ".5rem",
      transition: "all .2s",
    },

    taskCompleted: {
      backgroundColor: "grey",
    },

    //text styles
    taskTextUnchecked: {},
    taskTextChecked: {
      textDecoration: "line-through",
    },

    deleteButton: {
    marginLeft: "auto !important"
    }
  });

  const classes = useStyles();

  //TASK INPUT  HANDLING///////////////
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setTimeout (() => {completeTask(task.id)}, 1000);
  };

//TASK EDITING//////////////////
const handleEditing = (id) => {
  editTask(id)
  showEditModal();

}

useEffect(() => {
  console.log(task.completed)
  setChecked(task.completed)
}, )


  return (
    <Card
      variant="outlined"
      key={id}
      className={
        task.completed ? `${classes.root} ${classes.taskCompleted}` : classes.root
      }
    >
      <CardActions>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Typography
          variant="body1"
          className={
            task.completed ? classes.taskTextChecked : classes.taskTextUnchecked
          }
        >
          <strong>{taskTekst}</strong>
          <br></br>
          {taskNotes}
        </Typography>
        <IconButton className={classes.deleteButton} onClick={() => {handleEditing(task.id)}} aria-label="delete" >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => {deleteTask(task.id)}} aria-label="delete" >
          <DeleteIcon  />
        </IconButton>
      </CardActions>
    </Card>
  );
};


