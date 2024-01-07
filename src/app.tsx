export default function App() {
  // todo
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-slate-900 px-8 pb-12 pt-8">
      <div>
        <div className="text-red-500" id="break-label">
          todo
        </div>
        <div className="text-red-500" id="session-label">
          todo
        </div>
        <button className="text-red-500" id="break-decrement">
          <svg
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
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M16 24L32 24"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="text-red-500" id="session-decrement">
          <svg
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
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M16 24L32 24"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="text-red-500" id="break-increment">
          <svg
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
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M24 16V32"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 24L32 24"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="text-red-500" id="session-increment">
          <svg
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
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M24 16V32"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 24L32 24"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className="text-red-500" id="break-length">
          5
        </div>
        <div className="text-red-500" id="session-length">
          25
        </div>
        <div className="text-red-500" id="timer-label">
          Session
        </div>
        <div className="text-red-500" id="time-left">
          25:00
        </div>
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
