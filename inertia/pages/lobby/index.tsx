export default function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center px-6">
      {[...Array(24)].map((_, i) => (
        <div
          key={`kernel-${i}`}
          className="absolute w-3 h-4 rounded-full bg-yellow-400 opacity-80 animate-[kernel_6s_linear_infinite]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      {[...Array(12)].map((_, i) => (
        <div
          key={`pop-${i}`}
          className="absolute animate-[pop_4s_ease-out_infinite]"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-zinc-50 shadow-sm border border-yellow-100" />

            <div className="absolute inset-0 rounded-full border border-yellow-300 animate-ping opacity-40" />

            <span className="absolute -top-2 left-1 w-1 h-1 rounded-full bg-yellow-400" />
            <span className="absolute top-0 -right-2 w-1 h-1 rounded-full bg-yellow-400" />
            <span className="absolute -bottom-1 left-6 w-1 h-1 rounded-full bg-yellow-400" />
          </div>
        </div>
      ))}

      <div className="relative z-10 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center">
              <span className="text-3xl">🍿</span>
            </div>

            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
          </div>
        </div>

        <p className="text-zinc-400 text-sm tracking-wide mb-3">
          MOVIE MATCH
        </p>

        <p className="text-zinc-500 text-lg mb-8">
          We’ll reveal your match once you’re both done.
        </p>

        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>

      <style>{`
        @keyframes kernel {
          0% {
            transform: translateY(20px) rotate(0deg);
            opacity: 0;
          }

          10% {
            opacity: 0.8;
          }

          100% {
            transform: translateY(-120px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pop {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }

          20% {
            transform: scale(1.2);
            opacity: 1;
          }

          30% {
            transform: scale(1);
          }

          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
