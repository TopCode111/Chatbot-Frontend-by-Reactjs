import { Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import FamilyContent from "./FamilyContent";
import FriendInfo from "./FriendInfo";
import MemorialDay from "./MemorialDay";
import HeatedFood from "./HatedFood";
import LessonInfo from "./LessonInfo";
import TeacherInfo from "./TeacherInfo";
import FavorFood from "./FavorFood";
const useStyles = makeStyles((theme) => ({
  root: { padding: "0px", paddingTop: "0px" },
  divider: {
    background: "#000",
    width: "2px",
    height: window.innerHeight,
    margin: "0px",
    //     border: "solid 10px ",
  },
  sidebar: {
    background: "#000",
  },
}));

export default function FamilyList() {
  const classes = useStyles();
  const [tabContent, setTabContent] = useState(1);
  const selectItem = (item) => {
    console.log("sleelctIemmmm==", item);
    setTabContent(item);
  };
  return (
    <div className={classes.root}>
      <Grid container justify="flex-start">
        <Grid item md={3}>
          <SideBar
            selectItem={(item) => selectItem(item)}
            id={tabContent.id ? tabContent.id : 1}
            className={classes.sidebar}
          />
        </Grid>
        <Grid item md={1}>
          <Divider
            orientation="vertical"
            variant="middle"
            className={classes.divider}
          />
        </Grid>
        <Grid item md={8}>
          {(tabContent === 1 || tabContent.id === 1) && <FamilyContent />}
          {tabContent.id === 2 && <MemorialDay title={tabContent.title} />}
          {tabContent.id === 3 && <FriendInfo title={tabContent.title} />}
          {tabContent.id === 4 && <TeacherInfo title={tabContent.title} />}
          {tabContent.id === 5 && <LessonInfo title={tabContent.title} />}
          {tabContent.id === 6 && <FavorFood title={tabContent.title} />}
          {tabContent.id === 7 && <HeatedFood title={tabContent.title} />}
        </Grid>
      </Grid>
    </div>
  );
}
