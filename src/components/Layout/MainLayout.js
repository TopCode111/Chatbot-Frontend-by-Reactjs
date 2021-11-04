import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../hooks/auth/useCurrentUser";
import { useAppContext } from "../../store/AppContext";
import "../index.css";
import { useUserContext } from "../../store/UserContext";
import LocalStorageService from "../../utils/localStorageService";

const localStorageService = LocalStorageService.getService();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  menu: {
    display: "flex",
    alignItems: "center",
  },
  first: {
    color: "white",
    textTransform: "uppercase",
  },
  chat: {
    paddingLeft: 20,
    color: "white",
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
export default function ButtonAppBar({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const { authData, setAuthData } = useUserContext();
  const current = null;
  const { data: currentUser } = useCurrentUser();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Typography variant="span">
              <Link className={classes.first} to="/">
                Robopro
              </Link>
            </Typography>
            <Typography variant="span">
              <Link className={classes.chat} to="/chat">
                チャットボット
              </Link>
            </Typography>
          </Typography>
          {authData ? (
            <div className={classes.menu}>
              <button
                className="menu-button"
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}
              >
                {authData && (
                  <>
                    {currentUser?.profile.avatar != null ? (
                      <div
                        className="menu-avater"
                        style={{
                          backgroundImage: `url(${currentUser?.profile.avatar})`,
                        }}
                      ></div>
                    ) : (
                      <div
                        className="menu-avater"
                        style={{
                          backgroundImage: `url(data:image/jpeg;base64,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)`,
                        }}
                      ></div>
                    )}
                  </>
                )}
              </button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {currentUser?.is_superuser == true ? (
                  <StyledMenuItem>
                    <Link to="/users">
                      <Typography variant="h6">ユーザー管理</Typography>{" "}
                    </Link>
                  </StyledMenuItem>
                ) : (
                  ""
                )}
                <StyledMenuItem>
                  <Link to="/familypage">
                    <Typography variant="h6">ユーザー情報</Typography>{" "}
                  </Link>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Link to="/profile">
                    <Typography variant="h6">プロフィール</Typography>{" "}
                  </Link>
                </StyledMenuItem>
                {!authData && (
                  <>
                    <StyledMenuItem>
                      <Link to="/login">
                        <Typography variant="h6">ログイン</Typography>{" "}
                      </Link>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <Link to="/signup">
                        <Typography variant="h6">登録</Typography>{" "}
                      </Link>
                    </StyledMenuItem>
                  </>
                )}

                {authData && (
                  <StyledMenuItem>
                    <Link
                      onClick={() => {
                        localStorageService.clearToken(null);
                        setAuthData(null);
                        history.push("/login");
                      }}
                      to=""
                    >
                      <Typography variant="h6">ログアウト</Typography>{" "}
                    </Link>
                  </StyledMenuItem>
                )}
              </StyledMenu>
            </div>
          ) : (
            <>
              {" "}
              <Box
                mx={2}
                style={{
                  position: "absolute",
                  right: "65px",
                }}
              >
                <Link to="/login">
                  {" "}
                  <Typography variant="h6">ログイン</Typography>{" "}
                </Link>
              </Box>
              <Box
                mx={2}
                style={{
                  position: "absolute",
                  right: "5px",
                }}
              >
                <Link to="/signup">
                  {" "}
                  <Typography variant="h6">登録</Typography>{" "}
                </Link>
              </Box>{" "}
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}
