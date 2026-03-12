import { useEffect, useState } from "react";
import PomoTimeSet from "./PomoTimeSet";

const max = 60 * 60; // 60 minutes in an hour, 60 seconds in a minute
const min = 60; // 1 minute in seconds
const interval = 60; // 60 second is 1 minute

const defaultSessionTime = 25 * 60; // 25 minutes in seconds
const defaultBreakTime = 5 * 60; // 5 minutes in seconds

const PomodoroTimer = () => {
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [displayState, setDisplayState] = useState<"session" | "break">(
    "session",
  ); // can only be <session or break>
  const [isRunning, setIsRunning] = useState(false); // to track if the timer is running or not

  const startStop = () => {
    //start and stop the timer
    console.log("start/stop button clicked");
  };

  const reset = () => {};

  const toggelTimer = () => {
    //toggle between session and break
    setIsRunning(!isRunning);  //if true, set to false. if false, set to true
  };

  const [time, setTime] = useState(1500);

  useEffect(() => {
    if (!isRunning) return; // if timer is not running, do nothing

    const timer = setInterval(() => {       //setInterval is js function that runs a function every specified number of milliseconds
      setTime((prev) => prev - 1);          // decrease the time by 1 second
    }, 1000);                               // 1 second = 1000 milliseconds

    return () => clearInterval(timer); // clear the timer when component unmounts or when isRunning changes
  }, [isRunning]); // run this effect when isRunning changes

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="container-fluid text-center">
      <h2>Pomodoro Timer</h2>
      <div className="row">
        <div className="col-md">
          <h3>Session</h3>
          <PomoTimeSet
            time={sessionTime}
            interval={interval}
            setTime={setSessionTime}
            min={min}
            max={max}
            type="session"
          />
        </div>

        <div className="col-md">
          <h3>Break</h3>
          <PomoTimeSet
            time={breakTime}
            interval={interval}
            setTime={setBreakTime}
            min={min}
            max={max}
            type="break"
          />
        </div>
      </div>
      <div className="col-md">
        <h3>{displayState === "session" ? "Session" : "Break"}</h3>
      </div>
      <div className="row">
        <div className="row-md">
          <h3>
            {sessionTime / 60}:{(sessionTime % 60).toString().padStart(2, "0")}
          </h3>
          <h1>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        </div>
        <div className="col-md">
          <button
            className="btn btn-success"
            onClick={() => {
              startStop();
              toggelTimer();
            }}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="btn btn-danger">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
