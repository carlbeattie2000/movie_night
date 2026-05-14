import { Form } from '@adonisjs/inertia/react'

export default function Login() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center px-6 py-12">
      {/* Floating kernels */}
      {[...Array(26)].map((_, i) => (
        <div
          key={`kernel-${i}`}
          className="absolute w-3 h-4 rounded-full bg-yellow-400 opacity-75 animate-[kernel_6.5s_linear_infinite]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `-${Math.random() * 6.5}s`,
          }}
        />
      ))}

      {/* Popcorn pops */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`pop-${i}`}
          className="absolute animate-[pop_4.2s_ease-out_infinite]"
          style={{
            left: `${12 + Math.random() * 76}%`,
            top: `${15 + Math.random() * 70}%`,
            animationDelay: `${i * 0.65}s`,
          }}
        >
          <div className="relative w-11 h-11 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-white shadow-md border border-yellow-200" />
            <div className="absolute inset-0 rounded-full border border-yellow-300/70 animate-ping" />
            <span className="absolute -top-1 left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            <span className="absolute top-2 -right-1 w-1 h-1 bg-yellow-400 rounded-full" />
            <span className="absolute -bottom-1 left-5 w-1.5 h-1 bg-yellow-400 rounded-full" />
          </div>
        </div>
      ))}

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-yellow-100 p-10 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-800">Welcome Back</h1>
          </div>

          <Form route='login.store' formMethod='POST' className="space-y-7">
            <div>
              <label className="block text-zinc-600 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 outline-none text-lg transition-all duration-300 placeholder-zinc-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-zinc-900 font-semibold text-lg py-4 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.985]"
            >
              Login
            </button>
          </Form>
        </div>
      </div>

      <style>{`
        @keyframes kernel {
          0% { transform: translateY(30px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.8; }
          100% { transform: translateY(-140px) rotate(380deg); opacity: 0; }
        }

        @keyframes pop {
          0% { transform: scale(0.2) translateY(15px); opacity: 0; }
          25% { transform: scale(1.25); opacity: 1; }
          45% { transform: scale(0.95); }
          100% { transform: scale(1.05) translateY(-25px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
