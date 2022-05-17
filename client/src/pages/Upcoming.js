import { useEffect, useMemo,useState } from "react";
import { 
  withStyles,
  Appear,
  Link,
  Paragraph,
  Table,
  Words,
} from "arwes";

import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

const Upcoming = props => {
  const { 
    entered,
    launches,
    classes,
    abortLaunch,
  } = props;
  const [upcomingLaunches , setUpcomingLaunches] = useState(launches);
  useEffect(()=>{
    setUpcomingLaunches(launches)
  },[launches])

  const tableBody = useMemo(() => {
    return upcomingLaunches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.missionNumber)}>
          <td>
            <Clickable style={{color:"red"}}>
              <Link className={classes.link} onClick={() => abortLaunch(launch.missionNumber)}>
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.missionNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.destination}</td>
        </tr>;
      });
  }, [upcomingLaunches, abortLaunch, classes.link]);

  return <Appear id="upcoming" animate show={entered}>
    <Paragraph>Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets.</Paragraph>
    <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>
    <Table animate show={entered}>
      <table style={{tableLayout: "fixed"}}>
        <thead>
          <tr>
            <th style={{width: "3rem"}}></th>
            <th style={{width: "3rem"}}>No.</th>
            <th style={{width: "10rem"}}>Date</th>
            <th style={{width: "11rem"}}>Mission</th>
            <th style={{width: "11rem"}}>Rocket</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </Table>
  </Appear>;
}

export default withStyles(styles)(Upcoming);