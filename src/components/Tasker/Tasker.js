import React, { useReducer, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Task from "../Task/Task";

import BottomNav from "../UI/BottomNav/BottomNav";
import AddTaskModal from "../UI/AddTaskModal/AddTaskModal";
import SettingsModal from "../UI/SettingsModal/SettingsModal";

function reducer(tasks, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...tasks, newTask(action.payload.name, action.payload.notes)];
    case "GET_FROM_FIREBASE":
      return [...tasks, { ...action.payload.task }];
    // tasks: [action.payload.task, ...tasks]

    case "SAVE_EDITED_TASK":
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            name: action.payload.name,
            notes: action.payload.notes,
          };
        }
        return task;
      });
    case "REMOVE_TASK":
      return tasks.filter((task) => task.id !== action.payload.id);
    case "COMPLETE_TASK":
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    default:
      return tasks;
  }
}

function newTask(name, notes) {
  return { id: Date.now(), name: name, completed: false, notes: notes };
}



function filterTaskReducer(filteredTasks, action) {
  switch (action.type) {
    case "SHOW_ALL":
      return [...action.payload.tasks];
    case "SHOW_COMPLETED":
      return [...action.payload.tasks.filter((task) => task.completed)];
    case "SHOW_PENDING":
      return [...action.payload.tasks.filter((task) => !task.completed)];
  }
}







function Tasker() {
  //STYLING/////////////////////////////////////////////////////////////////////////////////////////////////
  const useStyles = makeStyles({
    root: {
      paddingTop: "1rem",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      minHeight: "95vh",
      overflow: "hidden",
      position: "relative",
    },
  });
  const classes = useStyles();



  //TASK HANDLING////////////////////////////////////////////////////////////////////////////////////////////////
  //main task state
  const [tasks, dispatch] = useReducer(reducer, []);
  //check if firebase was initialized
  const [firebaseDbInitialized, setFirebaseDbInitialized] = React.useState(
    false
  );
  const { currentUser } = useAuth();

  //ADD TASKS/////////////////////////////
  const addTaskHandler = () => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        name: taskName,
        notes: taskNotes,
      },
    });

    hideModalHandler();
  };

  //EDIT TASKS//////
  const saveEditedTaskHandler = () => {
    dispatch({
      type: "SAVE_EDITED_TASK",
      payload: {
        name: taskName,
        notes: taskNotes,
        id: editedTaskId,
      },
    });
    hideModalHandler();
  };

  //DELETE TASKS///
  const deleteTaskHandler = (id) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: {
        taskName: taskName,
        id: id,
      },
    });
  };

  //COMPLETE TASKS/////////
  const completeTaskHandler = (id) => {
    dispatch({
      type: "COMPLETE_TASK",
      payload: {
        id: id,
      },
    });
    console.log(id);
  };

  //FIREBASE///////////////////////////////////////////////////////////////////////////////////
  
  useEffect(() => {
    getFromFirebase();
  }, []);

  useEffect(() => {
    if (firebaseDbInitialized) {
      addToFirebase(tasks)
    }
  }, [tasks]);

  const addToFirebase = (tasks) => {
    console.log("addToFirebase initialized");
    console.log(currentUser.uid);
    db.ref(currentUser.uid).set(tasks, (err) => {
      if (err) console.log(err);
    });
  };

  const getFromFirebase = () => {
    var query = db.ref(currentUser.uid).orderByKey();
    query.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        console.log(childData);
        dispatch({
          type: "GET_FROM_FIREBASE",
          payload: {
            task: childData,
          },
        });
      });
    });
    setFirebaseDbInitialized(true);
  };
  

  //MODAL CONTROLS///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [showModal, setShowModal] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState(false);

  const showAddTaskModalHandler = (editing) => {
    if (editing === "EDIT_TASK") {
      setEditingTask(true);
      setShowModal(true);
    } else {
      setEditingTask(false);
      setShowModal(true);
    }
  };

  const showSettingsModalHandler = () => {
    setShowSettings(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
    setShowSettings(false);
  };

  //TASK INPUT CONTROLS///////////////////
  const [taskName, setTaskName] = React.useState("");
  const handleTaskInput = (val) => {
    setTaskName(val.target.value);
  };
  const [taskNotes, setTaskNotes] = React.useState("");
  const handleNotesInput = (val) => {
    setTaskNotes(val.target.value);
  };

  //TASK EDIT INPUT CONTROLS///////////
  const [editedTaskId, setEditedTaskId] = React.useState("");
  const editTaskHandler = (id) => {
    let editedTask = tasks.find((task) => task.id === id);
    setTaskName(editedTask.name);
    setTaskNotes(editedTask.notes);
    setEditedTaskId(id);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
  // FILTER LOGIC ///////////////////////////////////////////////////////
  const [filteredTasks, filter] = useReducer(filterTaskReducer, []);
  const [taskFilter, setTaskFilter] = React.useState("SHOW_ALL");
  useEffect(() => {
    if (firebaseDbInitialized) {
      getVisibleTasks(tasks, taskFilter);
    }
  }, [tasks, taskFilter]);

  const getVisibleTasks = (tasks, type) => {
    filter({
      type: type,
      payload: {
        tasks: tasks,
      },
    });
  };

  const taskFilterChangeHandler = (newFilter) => {
    setTaskFilter(newFilter);
    
  };

  ////////////////////////////////////////////////////
  return (
    <React.Fragment>
      <Container className={classes.root} maxWidth="md">
        {firebaseDbInitialized
          ? filteredTasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  taskNotes={task.notes}
                  taskTekst={task.name}
                  deleteTask={deleteTaskHandler}
                  completeTask={completeTaskHandler}
                  editTask={editTaskHandler}
                  saveEditedTask={saveEditedTaskHandler}
                  showEditModal={() => {
                    showAddTaskModalHandler("EDIT_TASK");
                  }}
                  task={task}
                />
              );
            })
          : null}

        <AddTaskModal
          show={showModal}
          hide={hideModalHandler}
          setTaskName={handleTaskInput}
          setTaskNotes={handleNotesInput}
          taskName={editingTask ? taskName : null}
          taskNotes={editingTask ? taskNotes : null}
          saveTask={editingTask ? saveEditedTaskHandler : addTaskHandler}
          title={editingTask ? "Edit Task" : "Add Task"}
        />
        <SettingsModal
          show={showSettings}
          hide={hideModalHandler}
        ></SettingsModal>
      </Container>

      <BottomNav
        showAddTaskModal={showAddTaskModalHandler}
        showSettingsModal={showSettingsModalHandler}
        taskFilterChange={taskFilterChangeHandler}
      />
    </React.Fragment>
  );
}

export default Tasker;
