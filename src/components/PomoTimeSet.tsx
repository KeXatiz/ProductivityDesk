interface Props {
  time: number;
  interval: number;
  min: number;
  max: number;
  setTime: (time: number) => void;
  type: "session" | "break";
}

const PomoTimeSet = ({ time, interval, min, max, setTime, type }: Props) => {
  //deconstructing props

  return (
    //increment and decrement buttons for session and break time
    <div>
      <button
        id={`${type}-decrement`}
        className="btn btn-primary"
        onClick={() => (time > min ? setTime(time - interval) : null)}
      >
        -
      </button>
      <span className="mx-3">{time / interval}</span>
      <button
        id={`${type}-increment`}
        className="btn btn-primary"
        onClick={() => (time < max ? setTime(time + interval) : null)}  //interval is 60 second so add 1 minute
      >
        +
      </button>
    </div>
  );
};

export default PomoTimeSet;
