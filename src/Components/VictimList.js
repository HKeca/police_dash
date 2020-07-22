import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import LazyLoad, { forceCheck } from "react-lazyload";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const VictimList = (props) => {
  const [showVictims, setShowVictims] = useState(false);

  useEffect(() => {
    return () => {
      setShowVictims(false);
    };
  }, [props.filter]);

  const classes = useStyles();

  const Loading = () => <h5>Loading...</h5>;

  const ShowVictimButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        setShowVictims(true);
        forceCheck();
      }}
    >
      Show Victims
    </Button>
  );

  return !showVictims ? (
    <ShowVictimButton />
  ) : (
    <div>
      <h6>Click a name below for a quick search</h6>
      <List className={classes.root} subheader={<li />}>
        {props.names.map((victim) => {
          return (
            <LazyLoad
              key={victim}
              placeholder={<Loading />}
              overflow={true}
              height={100}
            >
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://google.com/search?q=${victim.substring(
                  6,
                  victim.length
                )} police shooting ${victim.substring(0, 4)}`}
              >
                <ListItem key={victim}>
                  <ListItemText
                    primary={`${victim.substring(6, victim.length)}`}
                    secondary={`${victim.substring(0, 4)}`}
                  />
                </ListItem>
              </a>
            </LazyLoad>
          );
        })}
      </List>
    </div>
  );
};

export default VictimList;
