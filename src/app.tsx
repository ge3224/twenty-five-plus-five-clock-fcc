import { useEffect, useRef, useState } from "react";
import { millisecondsToMinutesAndSeconds } from "./lib/formats";
import { Timer } from "./lib/definitions";
import { minutesToMilliseconds } from "./lib/time";

export default function App() {
  const oneMinute = 60000;
  const oneSecond = 1000;

  const pauseIcon = useRef<SVGSVGElement>(null);
  const playIcon = useRef<SVGSVGElement>(null);
  const audioNotification = useRef<HTMLAudioElement>(null);

  const [sessionTime, setSessionTime] = useState<number>(oneMinute * 25);
  const [breakTime, setBreakTime] = useState<number>(oneMinute * 5);
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

    setBreakTime(minutesToMilliseconds(5));
    setSessionTime(minutesToMilliseconds(25));
    setCurrentTimer(Timer.session);

    if (audioNotification.current) {
      audioNotification.current.currentTime = 0;
      audioNotification.current.pause();
    }

    setRemainingSession(sessionTime);
    setRemainingBreak(breakTime);
  };

  const decrementSessionTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      if (sessionTime > oneMinute) {
        setSessionTime(sessionTime - oneMinute);
      }
    }
  };

  const incrementSessionTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      if (sessionTime < oneMinute * 60) {
        setSessionTime(sessionTime + oneMinute);
      }
    }
  };

  useEffect(() => {
    setRemainingSession(sessionTime);
  }, [sessionTime]);

  const decrementBreakTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      if (breakTime > oneMinute) {
        setBreakTime(breakTime - oneMinute);
      }
    }
  };

  const incrementBreakTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    if (paused) {
      if (breakTime < 60 * oneMinute) {
        setBreakTime(breakTime + oneMinute);
      }
    }
  };

  useEffect(() => {
    setRemainingBreak(breakTime);
  }, [breakTime]);

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
        if (_current > 0) {
          if (currentTimer === Timer.session) {
            setRemainingSession(_current);
          } else {
            setRemainingBreak(_current);
          }
        } else {
          if (currentTimer === Timer.session) {
            audioNotification.current?.play();
            setRemainingBreak(breakTime);
            setCurrentTimer(Timer.break);
            setRemainingSession(sessionTime);
          } else {
            setRemainingSession(sessionTime);
            setCurrentTimer(Timer.session);
            setRemainingBreak(breakTime);
          }
        }
      }, oneSecond);
      return () => clearInterval(timer);
    }
  }, [
    breakTime,
    currentTimer,
    paused,
    remainingBreak,
    remainingSession,
    sessionTime,
  ]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-slate-900 px-8 pb-12 pt-8">
      <div className="text-center">
        <h1 className="mb-6 text-7xl text-slate-400">25 + 5 Clock</h1>
        <div className="mb-6 flex gap-4">
          {/* set break length interface */}
          <div className="grid grid-cols-3 items-center justify-center gap-1 rounded border border-slate-950 p-3 text-center">
            <h3 className="col-span-3 text-3xl text-red-500" id="break-label">
              Break Length
            </h3>
            <button
              className="text-red-500 [&>svg>path]:stroke-slate-400 [&>svg>path]:hover:stroke-slate-200 [&>svg>path]:active:stroke-indigo-600"
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
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 24L32 24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="text-3xl text-red-500" id="break-length">
              {Math.floor(breakTime / oneMinute)}
            </div>
            <button
              className="text-red-500 [&>svg>path]:stroke-slate-400 [&>svg>path]:hover:stroke-slate-200 [&>svg>path]:active:stroke-indigo-600"
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
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 16V32"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 24L32 24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* set session length interface*/}
          <div className="grid grid-cols-3 items-center justify-center gap-1 rounded border border-slate-950 p-3 text-center">
            <h3 className="col-span-3 text-3xl text-red-500" id="session-label">
              Session Length
            </h3>
            <button
              className="text-red-500 [&>svg>path]:stroke-slate-400 [&>svg>path]:hover:stroke-slate-200 [&>svg>path]:active:stroke-indigo-600"
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
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 24L32 24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="text-3xl text-red-500" id="session-length">
              {Math.floor(sessionTime / oneMinute)}
            </div>
            <button
              className="text-red-500 [&>svg>path]:stroke-slate-400 [&>svg>path]:hover:stroke-slate-200 [&>svg>path]:active:stroke-indigo-600"
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
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 16V32"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 24L32 24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="text-center">
          <h2 className="mb-3 text-6xl text-red-500" id="timer-label">
            {currentTimer}
          </h2>
          <div className="mb-3 text-3xl text-red-500" id="time-left">
            {currentTimer === Timer.session
              ? millisecondsToMinutesAndSeconds(remainingSession)
              : millisecondsToMinutesAndSeconds(remainingBreak)}
          </div>
          {/* play/pause toggle button */}
          <button
            className="text-red-500 [&>svg>path]:stroke-slate-400 [&>svg>path]:hover:stroke-slate-200 [&>svg>path]:active:stroke-indigo-600"
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
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 12V36"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* reset button */}
          <button
            className="text-red-500 [&>svg>path]:stroke-slate-400 [&>svg>path]:hover:stroke-slate-200 [&>svg>path]:active:stroke-indigo-600"
            id="reset"
            onClick={resetClock}
          >
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
      </div>
      {/* audio file */}
      <audio
        ref={audioNotification}
        id="beep"
        preload="auto"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
      {/* GitHub Link: A link to the source code repository on GitHub. */}
      <div className="mt-8 w-full text-center text-sm text-slate-100 underline visited:text-slate-100">
        <a
          className="text-slate-600 visited:text-slate-600 hover:text-slate-400 active:text-indigo-700"
          href="https://github.com/ge3224/twenty-five-plus-five-clock-fcc"
          target="_blank"
        >
          Source Code on Github
        </a>
      </div>
    </main>
  );
}
