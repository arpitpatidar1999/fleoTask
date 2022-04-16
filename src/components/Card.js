import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


// icons
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import LocalDiningSharpIcon from '@mui/icons-material/LocalDiningSharp';


//list things
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button'


export default function CardLayout(props) {
  const handleOnclick = (event) => {
    console.log("event is ====", props);

    window.open(props.data.url);
    
  }
  return (
    <Card sx={{ maxWidth: 345 }} style={{backgroundColor: 'grey'}}>
      <CardHeader
        avatar={
          <GitHubIcon />
        }
        title={props.data.full_name}
        subheader={props.data.owner.login}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.data.description}
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={props.data.stargazers_count} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <CodeOutlinedIcon />
            </ListItemIcon>
            <ListItemText inset primary={props.data.language} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <LocalDiningSharpIcon />
            </ListItemIcon>
            <ListItemText inset primary={props.data.forks_count} />
          </ListItem>
          <ListItem disablePadding>
            <Button onClick={handleOnclick}>
              <ListItemText inset primary="show more" />
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
