import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import TitleIcon from "../../asset/HeaderLogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    position: "sticky",
    borderRadius: theme.shape.borderRadius,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: "flex",
    backgroundColor: "#fff",
    position: "static",
    padding: theme.spacing(0, 1),
  },
  imagebox: {
    padding: theme.spacing(1),
    width: "200px",
    height:
      "auto" /*change the height always 30-40 pixel less than gridpaper. It contains the title of image*/,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "149px",
    },
  },
  image: {
    width: "100%",
    height: "auto",
  },
  theme: {
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    right: 0,
    color: "black",
  },
  link: {
    padding: theme.spacing(2),
    borderRadius: "10px",
    marginRight: "10px",
    textDecoration: "none",
    fontSize: "1.5em",
    fontWeight: "500",
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
      color: "white",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  //animate the title image
  const [title, titleanimation] = useState(true);
  const [link, linkanimation] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: title ? 1 : 0,
    config: { duration: 1000 },
  });
  const { y } = useSpring({
    from: { y: 0 },
    y: link ? 1 : 0,
    config: { duration: 1000 },
  });
  //handle dark/light theme
  const [state, setState] = React.useState({
    CheckedDark: localStorage.getItem("Theme") === "dark" ? true : false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    localStorage.setItem("Theme", event.target.checked ? "dark" : "light");
    window.location.reload(false);
  };
  //console.log(state.CheckedDark);
  //console.log(localStorage.getItem("Theme"));

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.imagebox}>
          <NavLink to="/" activeClassName="selected">
            <div onClick={() => titleanimation(!title)}>
              <animated.div
                style={{
                  opacity: x.interpolate({ range: [0, 1], output: [1, 1] }),
                  transform: x
                    .interpolate({
                      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                      output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                    })
                    .interpolate((x) => `scale(${x})`),
                }}
              >
                <img
                  className={classes.image}
                  src={TitleIcon}
                  height="50px"
                  width="50px"
                  alt="title"
                />
              </animated.div>
            </div>
          </NavLink>
        </div>
        <NavLink
          onClick={() => linkanimation(!link)}
          className={classes.link}
          to="/select-sensor"
        >
          <animated.div
            style={{
              opacity: y.interpolate({ range: [0, 1], output: [1, 1] }),
              transform: y
                .interpolate({
                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                })
                .interpolate((y) => `scale(${y})`),
            }}
          >
            Select Sensor
          </animated.div>
        </NavLink>
        <div className={classes.theme}>
          <FormControlLabel
            control={
              <Switch
                checked={state.CheckedDark}
                onChange={handleChange}
                name="CheckedDark"
              />
            }
            label={state.CheckedDark ? "Dark" : "Light"}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
