import { formatTime, type DisplayState } from "../extend";

interface Props {
  displayState: DisplayState; //DisplayState contains time, timeType and isRunning
  startStop: (displayState: DisplayState) => void;
  reset: () => void;
  skip: () => void;
}

const PomoTimeDisplay = ({ displayState, startStop, reset, skip }: Props) => {
  return (
    <div>
      <h3>{displayState.timeType}</h3>
      <h2>{formatTime(displayState.time)}</h2>
      <div>
        <button
          className="btn btn-success"
          onClick={() => startStop(displayState)}
        >
          {displayState.isRunning ? "Pause" : "Start"}
        </button>
        
        {displayState.isRunning && (<button className="btn btn-secondary" onClick={skip}> Skip </button>)}

        <button className="btn btn-danger" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomoTimeDisplay;
