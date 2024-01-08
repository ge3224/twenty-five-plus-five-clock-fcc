import { useEffect, useRef, useState } from "react";
import { millisecondsToMinutesAndSeconds } from "./lib/formats";
import { Timer } from "./lib/definitions";

export default function App() {
  const oneMinute = 60000;
  const oneSecond = 1000;

  const pauseIcon = useRef<SVGSVGElement>(null);
  const playIcon = useRef<SVGSVGElement>(null);

  const [sessionTime, setSessionTime] = useState<number>(1500000);
  const [breakTime, setBreakTime] = useState<number>(300000);

  const [remainingSession, setRemainingSession] = useState<number>(sessionTime);
  const [remainingBreak, setRemainingBreak] = useState<number>(breakTime);

  const [currentTimer, setCurrentTimer] = useState<Timer>(Timer.session);

  const [paused, setPaused] = useState<boolean>(true);

  const resetClock = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (!paused) {
      setPaused(true);
    }
    setRemainingSession(sessionTime);
    setBreakTime(breakTime);
  };

  const decrementSessionTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      const _sessionTime = sessionTime - oneMinute;
      setSessionTime(_sessionTime > 0 ? _sessionTime : oneMinute);
      setRemainingSession(_sessionTime > 0 ? _sessionTime : oneMinute);
    }
  };

  const incrementSessionTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      const _sessionTime = sessionTime + oneMinute;
      setSessionTime(
        _sessionTime <= oneMinute * 60 ? _sessionTime : oneMinute * 60,
      );
      setRemainingSession(
        _sessionTime <= oneMinute * 60 ? _sessionTime : oneMinute * 60,
      );
    }
  };

  const decrementBreakTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      const _breakTime = breakTime - oneMinute;
      setBreakTime(_breakTime > 0 ? _breakTime : oneMinute);
      setRemainingBreak(_breakTime > 0 ? _breakTime : oneMinute);
    }
  };

  const incrementBreakTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      const _breakTime = breakTime + oneMinute;
      setBreakTime(_breakTime <= oneMinute * 60 ? _breakTime : oneMinute * 60);
      setRemainingBreak(
        _breakTime <= oneMinute * 60 ? _breakTime : oneMinute * 60,
      );
    }
  };

  const pausePlayToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();

    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  };

  useEffect(() => {
    if (paused) {
      playIcon.current?.classList.remove("hidden");
      pauseIcon.current?.classList.add("hidden");
    } else {
      playIcon.current?.classList.add("hidden");
      pauseIcon.current?.classList.remove("hidden");
    }
  }, [paused]);

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        let _current =
          currentTimer === Timer.session ? remainingSession : remainingBreak;

        _current = _current - oneSecond;
        if (_current >= 0) {
          if (currentTimer === Timer.session) {
            setRemainingSession(_current);
          } else {
            setRemainingBreak(_current);
          }
        } else {
          if (currentTimer === Timer.session) {
            setRemainingBreak(breakTime);
            setCurrentTimer(Timer.break);
          } else {
            setRemainingSession(sessionTime);
            setCurrentTimer(Timer.session);
          }
        }
      }, oneSecond);
      return () => clearInterval(timer);
    }
  }, [paused, remainingSession, currentTimer, remainingBreak]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-slate-900 px-8 pb-12 pt-8">
      <div>
        {/* set break length interface */}
        <div className="grid grid-cols-3 items-center justify-center gap-1 text-center">
          <h2 className="col-span-3 text-red-500" id="break-label">
            Break Length
          </h2>
          <button
            className="text-red-500"
            id="session-decrement"
            onClick={decrementBreakTime}
          >
            <svg
              className="mx-auto block"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                fill="none"
                stroke="#333"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M16 24L32 24"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="text-red-500" id="break-length">
            {Math.floor(breakTime / oneMinute)}
          </div>
          <button
            className="text-red-500"
            id="session-increment"
            onClick={incrementBreakTime}
          >
            <svg
              className="mx-auto block"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                fill="none"
                stroke="#333"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M24 16V32"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 24L32 24"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* set session length interface*/}
        <div className="grid grid-cols-3 items-center justify-center gap-1 text-center">
          <h2 className="col-span-3 text-red-500" id="session-label">
            Session Length
          </h2>
          <button
            className="text-red-500"
            id="break-decrement"
            onClick={decrementSessionTime}
          >
            <svg
              className="mx-auto block"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                fill="none"
                stroke="#333"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M16 24L32 24"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="text-red-500" id="session-length">
            {Math.floor(sessionTime / oneMinute)}
          </div>
          <button
            className="text-red-500"
            id="break-increment"
            onClick={incrementSessionTime}
          >
            <svg
              className="mx-auto block"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                fill="none"
                stroke="#333"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M24 16V32"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 24L32 24"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="text-red-500" id="timer-label">
          {currentTimer}
        </div>
        <div className="text-red-500" id="time-left">
          {currentTimer === Timer.session
            ? millisecondsToMinutesAndSeconds(remainingSession)
            : millisecondsToMinutesAndSeconds(remainingBreak)}
        </div>
        {/* play/pause toggle button */}
        <button
          className="text-red-500"
          id="start_stop"
          onClick={pausePlayToggle}
        >
          <svg
            ref={playIcon}
            id="play-icon"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
              fill="none"
              stroke="#333"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="hidden"
            ref={pauseIcon}
            id="pause-icon"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12V36"
              stroke="#333"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 12V36"
              stroke="#333"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/* reset button */}
        <button className="text-red-500" id="reset" onClick={resetClock}>
          <svg
            id="reset-icon"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2721 36.7279C14.5294 39.9853 19.0294 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C19.0294 6 14.5294 8.01472 11.2721 11.2721C9.61407 12.9301 6 17 6 17"
              stroke="#333"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 9V17H14"
              stroke="#333"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {/* GitHub Link: A link to the source code repository on GitHub. */}
      <div className="mt-8 w-full text-center text-sm text-slate-100 underline visited:text-slate-100">
        <a
          href="https://github.com/ge3224/twenty-five-plus-five-clock-fcc"
          target="_blank"
        >
          Source Code on Github
        </a>
      </div>
    </main>
  );
}
