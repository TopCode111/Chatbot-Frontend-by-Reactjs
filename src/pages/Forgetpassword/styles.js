import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    width: "100%",
  },
  container: {
    margin: "auto",
    height: "342px;",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  logo: {
    width: "60px",
  },
}));

export default useStyles;
