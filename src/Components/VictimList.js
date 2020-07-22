import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
// import ListSubheader from "@material-ui/core/ListSubheader";
import LazyLoad from "react-lazyload";

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
      }}
    >
      Show Victims
    </Button>
  );

  //   const victimListToRender = props.names.map((victim) => {
  //     return (
  //       <ListItem key={victim}>
  //         <ListItemText primary={`${victim}`} />
  //       </ListItem>
  //     );
  //   });

  return !showVictims ? (
    <ShowVictimButton />
  ) : (
    <List className={classes.root} subheader={<li />}>
      {props.names.map((victim) => {
        return (
          <LazyLoad
            key={victim}
            placeholder={<Loading />}
            height={100}
            overflow={true}
          >
            <ListItem key={victim}>
              <ListItemText primary={`${victim}`} />
            </ListItem>
          </LazyLoad>
        );
      })}
    </List>
  );
};

export default VictimList;
