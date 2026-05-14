import { Form } from '@adonisjs/inertia/react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Popcorn from '~/components/popcorn'
import { InertiaProps } from '~/types'

type Provider = {
  logo_path: string
  provider_name: string
}

type Movie = {
  title: string
  posterUrl: string
  voteAverage: number
  release_date?: string
  providers?: Provider[]
}

type PageProps = InertiaProps
export default function Index({ user }: PageProps) {
  const [leaving, setLeaving] = useState(false)
  const [result, setResult] = useState<Movie | null>(null)

  useEffect(() => {
    const socket = io()
    socket.emit('ready', user?.id)

    socket.on('result', (movie: Movie) => {
      setLeaving(true)
      setTimeout(() => setResult(movie), 700)
    })

    return () => {
      socket.emit('unready', user?.id)
      socket.disconnect()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center px-6">
      <Popcorn amount={128} />

      {/* Waiting state */}
      <div
        className="relative z-10 text-center transition-all duration-700"
        style={{
          opacity: leaving ? 0 : 1,
          transform: leaving ? 'translateY(40px) scale(0.95)' : 'translateY(0) scale(1)',
          pointerEvents: leaving ? 'none' : 'auto',
          position: result ? 'absolute' : 'relative',
        }}
      >
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center">
              <span className="text-3xl">🍿</span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
          </div>
        </div>
        <p className="text-zinc-400 text-sm tracking-wide mb-3">MOVIE MATCH</p>
        <p className="text-zinc-500 text-lg mb-8">We'll reveal your match once you're both done.</p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>

      {/* Result reveal */}
      {result && (
        <div className="relative z-10 w-full max-w-xs text-center animate-[dropIn_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards]">
          <p className="text-zinc-400 text-xs mb-6 tracking-wide uppercase font-medium">
            Tonight you're watching
          </p>
          <div className="relative mx-auto w-40 sm:w-48 rounded-2xl overflow-hidden aspect-[2/3] shadow-xl mb-5">
            <img src={result.posterUrl} alt={result.title} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-zinc-900 text-xl font-semibold mb-1">{result.title}</h2>
          <p className="text-zinc-500 text-sm">★ {result.voteAverage.toFixed(1)}</p>

          {result.providers && result.providers.length > 0 ? (
            <div className="mt-6">
              <p className="text-zinc-400 text-xs uppercase tracking-wide font-medium mb-3">
                Available on
              </p>
              <div className="grid grid-cols-2 gap-3">
                {result.providers.map((provider) => (
                  <div key={provider.provider_name} className="flex flex-col items-center gap-1.5">
                    <img
                      src={`https://image.tmdb.org/t/p/w92/${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-9 h-9 rounded-xl object-cover"
                    />
                    <span className="text-zinc-500 text-xs">{provider.provider_name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-zinc-400 text-xs uppercase tracking-wide font-medium mb-1">
                Streaming
              </p>
              <p className="text-zinc-500 text-sm">Not available on any streaming services</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <Form route="matches.cancel" formMethod="POST">
              <button className="w-full px-6 py-2.5 rounded-lg border border-red-200 text-red-400 text-sm font-semibold hover:border-red-300 hover:text-red-500 transition-colors duration-150">
                Not feeling it
              </button>
            </Form>
            <Form route="home.show">
              <button className="w-full px-6 py-2.5 rounded-lg border border-zinc-200 text-zinc-600 text-sm font-semibold hover:border-zinc-400 hover:text-zinc-900 transition-colors duration-150">
                Back to list
              </button>
            </Form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes kernel {
          0% { transform: translateY(20px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }
        @keyframes pop {
          0% { transform: scale(0.2); opacity: 0; }
          20% { transform: scale(1.2); opacity: 1; }
          30% { transform: scale(1); }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes dropIn {
          0% { transform: translateY(-60px) scale(0.95); opacity: 0; }
          60% { transform: translateY(8px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
