export default function App() {
  // todo
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-slate-900 px-8 pb-12 pt-8">
      <div>
        <div className="text-red-500" id="break-label">todo</div>
        <div className="text-red-500" id="session-label">todo</div>
        <button className="text-red-500" id="break-decrement">-</button>
        <button className="text-red-500" id="session-decrement">-</button>
        <button className="text-red-500" id="break-increment">+</button>
        <button className="text-red-500" id="session-increment">+</button>
        <div className="text-red-500" id="break-length">5</div>
        <div className="text-red-500" id="session-length">25</div>
        <div className="text-red-500" id="timer-label">Session</div>
        <div className="text-red-500" id="time-left">25:00</div>
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
  )
}
