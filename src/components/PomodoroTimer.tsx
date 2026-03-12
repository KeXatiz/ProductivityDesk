import { useEffect, useState } from "react";
import PomoTimeSet from "./PomoTimeSet";
import PomoTimeDisplay from "./PomoTimeDisplay";
import type { DisplayState } from "../extend";

const defaultSessionTime = 25 * 60; // 25 minutes in seconds
const defaultBreakTime = 5 * 60; // 5 minutes in seconds

const max = 60 * 60; // 60 minutes in an hour, 60 seconds in a minute
const min = 60; // 1 minute in seconds
const interval = 60; // 60 second is 1 minute

const PomodoroTimer = () => {
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  
  //instead of creating multiple useState we just create one useState and have an object that holds all the state value
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    isRunning: false  // to track if the timer is running or not
  })


  const startStop = () => {
    //start and stop the timer
    console.log("start/stop button clicked");
    setDisplayState((prev) => ({
      ...prev,
      isRunning: !prev.isRunning  //same like setIsRunning(!isRunning);  //if true, set to false. if false, set to true
    }));
  };

  const reset = () => {
    //reset the timer to default values
    setSessionTime(defaultSessionTime);
    setBreakTime(defaultBreakTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      isRunning: false
    })
  }

  useEffect(() => {
    let timer: number;                      // to store the timer ID so we can clear it later
    if (!displayState.isRunning) return;    // if timer is not running, do nothing

    timer = setInterval(() => {             //setInterval is js function that runs a function every specified number of milliseconds    
      setDisplayState((prev) => ({
        ...prev,
        time: prev.time - 1}                // decrease the time by 1 second  
      ));      
    }, 1000);                               // 1 second = 1000 milliseconds

    return () => clearInterval(timer);      // clear the timer when component unmounts or when isRunning changes
  }, [displayState.isRunning]);             // run this effect when isRunning changes

  const changeSessionTime = (time: number) => {
    if(displayState.isRunning) return;  // if timer is running, do nothing

    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      isRunning: false
    })
  }

  const changeBreakTime = (time: number) => {
    if(displayState.isRunning) return;  // if timer is running, do nothing
    setBreakTime(time);
  }
  

  return (
    <div className="container-fluid text-center">
      <h2>Pomodoro Timer</h2>
      <div className="row">
        <div className="col-md">
          <h3>Session</h3>
          <PomoTimeSet
            time={sessionTime}
            interval={interval}
            setTime={changeSessionTime}
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
            setTime={changeBreakTime}
            min={min}
            max={max}
            type="break"
          />
        </div>
      </div>
      <div className="col-md">
        <PomoTimeDisplay displayState={displayState} startStop={startStop} reset={reset} />
      </div>
    </div>
  );
};

export default PomodoroTimer;
