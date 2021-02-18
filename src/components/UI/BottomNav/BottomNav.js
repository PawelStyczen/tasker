import React from "react";
import { FilterDispatchContext } from "../../Tasker/Tasker";
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

export default function BottomNav({
  showAddTaskModal,
  showSettingsModal,
  taskFilterChange,
}) {
  // button styles////
  const classes = useStyles();

  //MENU HANDLING/////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // FILTER CHANGE///////////////////////////////////
  const [filterLabel, setFilterLabel] = React.useState("all tasks");
  const handleFilterChange = (filter) => {
    taskFilterChange(filter);
    switch (filter) {
      case "SHOW_ALL":
        setFilterLabel("All tasks");
      case "SHOW_COMPLETED":
        setFilterLabel("Completed");
      case "SHOW_PENDING":
        setFilterLabel("Pending");
      case "SHOW_IMPORTANT":
        setFilterLabel("Important");
    }
    //Close menu
    handleCloseMenu();
  };

  ///////////////////////////
  return (
    <BottomNavigation showLabels className={classes.root}>
      <BottomNavigationAction
        label={filterLabel}
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
        <MenuItem
          onClick={() => {
            handleFilterChange("SHOW_ALL");
          }}
        >
          All tasks
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilterChange("SHOW_PENDING");
          }}
        >
          Pending
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilterChange("SHOW_COMPLETED");
          }}
        >
          Completed
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilterChange("SHOW_IMPORTANT");
          }}
        >
          Important
        </MenuItem>
      </Menu>
    </BottomNavigation>
  );
}
