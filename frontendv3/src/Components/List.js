import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const newsSources = [
    {
        "title": "NY Times",
        "icon-url": "https://avatars.githubusercontent.com/u/221409?s=200&v=4",
        "link": "https://nytimes.com"
    },
    {
      "title": "Hufftington Post",
      "icon-url": "data:image/png;base64,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",
      "link": "https://huffpost.com"
    },
    {
        "title": "BBC",
        "icon-url": "https://play-lh.googleusercontent.com/Iip-8Yn3PLAzecCMb4ZaHTvFObl3ETUWZmd5zLflhbB6BXKyNc5aM4hrGAA9NXSs7i0",
        "link": "https://bbc.com"
      },
  ]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function FolderList() {
  const classes = useStyles();

  return (
    <div>
    <div style={{display: 'flex', justifyContent: 'center'}}>Here are some credible news sources!</div>
    <List className={classes.root}>
      {newsSources.map((news) => (
      <ListItem style={{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '60%', display: 'flex', justifyContent: 'space-evenly'}}>
                <div style={{width: '30%', display: 'flex', justifyContent: 'center'}}>
                    <img width="50" height="50" src={news['icon-url']}/>
                </div>
                <div style={{width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <a href={news.link} target = "_blank"  style={{ }}>{news.title}</a>
                </div>
            </div>
      </ListItem>
      ))}
    </List>
    </div>
  );
}