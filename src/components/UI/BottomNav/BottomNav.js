import React, {useContext} from "react";
import {FilterDispatchContext} from "../../Tasker/Tasker"
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";

import { AddCircle, Settings } from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    bottom: "0",
  },
});

export default function BottomNav({ showAddTaskModal, showSettingsModal, taskFilterChange }) {
  // button styles////
  const classes = useStyles();


  // CONTEXT////////////////////////
  const filter = useContext(FilterDispatchContext);


  // STATES /////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);

  //MENU HANDLING/////////////////////
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  ///////////////////////////
  return (
    <BottomNavigation showLabels className={classes.root}>
      <BottomNavigationAction
        label="Sort"
        icon={<RestoreIcon />}
        onClick={handleOpenMenu}
      />
      <BottomNavigationAction
        label="Add"
        icon={<AddCircle />}
        onClick={() => {
          showAddTaskModal("ADD_TASK");
        }}
      />
      <BottomNavigationAction
        label="Settings"
        icon={<Settings />}
        onClick={showSettingsModal}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => {taskFilterChange("SHOW_PENDING"); handleCloseMenu()} }>Pending</MenuItem>
        <MenuItem onClick={() => {taskFilterChange("SHOW_COMPLETED"); handleCloseMenu()} }>Completed</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Important</MenuItem>
      </Menu>
    </BottomNavigation>
  );
}
