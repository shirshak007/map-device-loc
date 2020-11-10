import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NotFoundGif from "../../asset/404.gif";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paperleft: {
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    fontSize: 20,
    fontFamily: "lato",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paperright: {
    marginTop: theme.spacing(2),
    width: "50%",
    display: "flex",
    fontSize: 20,
    fontFamily: "lato",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  imagebox: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    background: "#fff",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    width: "100%",
    height: "auto",
  },
}));

export default function NotFound() {
  const classes = useStyles();
  const history = useHistory();

  const handleClickReturnHome = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <div className={classes.paperleft}>
              <div className={classes.imagebox}>
                <img
                  className={classes.image}
                  width="320"
                  height="240"
                  src={NotFoundGif}
                  alt="404 Not Found"
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div className={classes.paperright}>
              <Typography component="h1" variant="h3">
                404
              </Typography>
              <Typography variant="h5">Uh Oh! You are lost.</Typography>
              <Typography variant="body2">
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.
              </Typography>
              <Button
                onClick={handleClickReturnHome}
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                RETURN HOME
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
