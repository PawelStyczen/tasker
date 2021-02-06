import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';

import { AddCircle, Settings } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
      
      position : 'sticky',
      bottom : '0',
      
      
    },
  });

 
  
    export default function BottomNav({showAddTaskModal, showSettingsModal}) {
      // button styles/////
        const classes = useStyles();
        const [value, setValue] = React.useState(0);

   
      
        return (
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Add" icon={<AddCircle />} onClick={() => {showAddTaskModal("ADD_TASK")}} />
            <BottomNavigationAction label="Settings" icon={<Settings />} onClick={showSettingsModal} />
          </BottomNavigation>
        );
      }
  


