import { Marker } from "../../model/marker";
import { useSummaryContext } from "../../state/SummaryContext";
import { useRouteDistance } from "./distance-calculator";
import s from "./RouteSummary.module.css";

enum Move {
  UP,
  DOWN,
}

interface RouteSummaryProps {
  directions: google.maps.DirectionsResult | null;
}

const RouteSummary = ({ directions }: RouteSummaryProps) => {
  const { currentWaypoints, setCurrentWaypoints } =
    useSummaryContext();

  const routeDistance = useRouteDistance(directions);

  const handleMove = (index: number, move: Move) => {
    if (move === Move.UP && index === 0) return;
    if (move === Move.DOWN && index === currentWaypoints.length - 1) return;

    const deltaMove = move === Move.UP ? -1 : 1;

    let temp = currentWaypoints[index + deltaMove];
    currentWaypoints[index + deltaMove] = currentWaypoints[index];
    currentWaypoints[index] = temp;

    setCurrentWaypoints([...currentWaypoints]);
  };

  console.log("Summary rendered");
  console.log(currentWaypoints);

  return (
    <div className={s.container}>
      <p>Chosen waypoints</p>
      {currentWaypoints.length > 0 ? (
        <ul>
          {currentWaypoints.map((marker, index) => (
            <li key={marker.id}>
              <p>
                {getListItemPreffix(index, currentWaypoints)}
                Marker {marker.id}
              </p>
              {directions == null ? (
                <div className={s.controls}>
                  <button onClick={() => handleMove(index, Move.UP)}>Up</button>
                  <button onClick={() => handleMove(index, Move.DOWN)}>
                    Down
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>No waypoints chosen</p>
      )}
      {routeDistance ? (
        <div className={s.routeResult}>
          The distance of the route is {routeDistance} km
        </div>
      ) : null}
    </div>
  );
};

function getListItemPreffix(index: number, currentWaypoints: Marker[]) {
  if (index === 0) {
    return (
      <span
        style={{
          fontWeight: "bold",
          fontSize: "14px",
          border: "green 4px solid",
          borderRadius: "1rem",
          padding: ".3rem",
        }}
      >
        Start
      </span>
    );
  } else if (index === currentWaypoints.length - 1) {
    return (
      <span
        style={{
          fontWeight: "bold",
          fontSize: "14px",
          border: "violet 4px solid",
          borderRadius: "1rem",
          padding: ".3rem",
        }}
      >
        Finish
      </span>
    );
  } else {
    return (
      <span className={s.line}
        style={{
          fontWeight: "bold",
          fontSize: "14px",
          padding: ".5rem",
          marginLeft: "1rem",
          marginRight: "1rem",
        }}
      >
      </span>
    );
  }
}

export default RouteSummary;
