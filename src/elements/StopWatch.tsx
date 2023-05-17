import React, { useState, useEffect } from "react";

interface IProps {
  count: number;
  onChangeTimer: () => void;
}

const StopWatch = (props: IProps) => {
  const { count, onChangeTimer }: IProps = props;

  const [minutes, setMinutes] = useState(((count / (1000 * 60)) % 60));
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      if (minutes === 0 && seconds === 0) {
        onChangeTimer();
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <React.Fragment>
      <div>
        0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </React.Fragment>
  );
};

export default StopWatch;
