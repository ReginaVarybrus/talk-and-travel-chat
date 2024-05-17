import { useState, useRef } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';

import { RoomsIcon, DMsIcon, LogoutIcon } from '../SideBar/SideBarStyled.js';
import { TapBarStyled } from './TapBarStyled.js';

// function refreshMessages() {
//   const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

//   return Array.from(new Array(50)).map(
//     () => messageExamples[getRandomInt(messageExamples.length)]
//   );
// }

const TapBar = () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  //   const [messages, setMessages] = useState(() => refreshMessages());

  //   useEffect(() => {
  //     ref.current.ownerDocument.body.scrollTop = 0;
  //     setMessages(refreshMessages());
  //   }, [value, setMessages]);

  return (
    <TapBarStyled sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {/* <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItemButton key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List> */}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="DMs" icon={<RoomsIcon />} />
          <BottomNavigationAction label="Rooms" icon={<DMsIcon />} />
          <BottomNavigationAction label="More" icon={<LogoutIcon />} />
        </BottomNavigation>
      </Paper>
    </TapBarStyled>
  );
};

export default TapBar;
