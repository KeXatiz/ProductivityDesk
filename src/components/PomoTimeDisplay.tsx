import { formatTime, type DisplayState } from "../extend";

interface Props {
  displayState: DisplayState; //DisplayState contains time, timeType and isRunning
  startStop: (displayState: DisplayState) => void;
  reset: () => void;
}

const PomoTimeDisplay = ({ displayState, startStop, reset }: Props) => {
  return (
    <div>
      <h3>{displayState.timeType}</h3>
      <h1>{formatTime(displayState.time)}</h1>
      <div>
        <button
          className="btn btn-success"
          onClick={() => startStop(displayState)}
        >
          {displayState.isRunning ? "Pause" : "Start"}
        </button>
        <button className="btn btn-danger" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomoTimeDisplay;
