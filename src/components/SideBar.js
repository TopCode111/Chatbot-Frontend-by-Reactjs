import React from "react";
import { Grid, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  
  list: {
    marginTop: "20px",
  },
  listItem: {
    margin: "15px",
    fontSize: "20px",
  },
}));

export default function SideBar({ selectItem, id }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <List className={classes.list}>
            {[
              { id: 1, title: "家族メンバー" },
              { id: 2, title: "記念日情報" },
              { id: 3, title: "友達情報" },
              { id: 4, title: "先生情報" },
              { id: 5, title: "習い事情報" },
              { id: 6, title: "好きな食べ物" },
              { id: 7, title: "嫌いな食べ物" },
            ].map((item, index) => (
              <ListItem
                button
                className={classes.listItem}
                onClick={() => selectItem(item)}
                key={index}
              >
                {id === item.id ? <strong>{item.title}</strong> : item.title}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
