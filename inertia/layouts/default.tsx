import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { Form, Link } from '@adonisjs/inertia/react'
import Input from '~/components/input'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  useEffect(() => {
    if (children.props.flash.error) {
      toast.error(children.props.flash.error)
    }
    if (children.props.flash.success) {
      toast.success(children.props.flash.success)
    }
  })

  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="text-white shrink-0">
            <Link route="home.show">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">🎬</span>
                <span className="font-semibold">
                  Carl<span className="text-yellow-400 font-bold">&</span>Izzy
                </span>
                <span className="text-zinc-500 text-sm font-normal hidden sm:inline">movies</span>
              </div>
            </Link>
          </div>

          {children.props.user && (
            <div className="flex-1">
              <Form route="movies.search_results">
                <div className="relative">
                  <Input name='title' type='text' placeholder='Search movies...' />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-yellow-400 transition-colors duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                      />
                    </svg>
                  </button>
                </div>
              </Form>
            </div>
          )}

          <nav className="flex items-center gap-3 shrink-0">
            {children.props.user ? (
              <>
                <Form route="login.destroy">
                  <button
                    type="submit"
                    className="text-zinc-400 hover:text-white text-sm transition-colors duration-150"
                  >
                    Logout
                  </button>
                </Form>
              </>
            ) : (
              <>
                <Link route="login.create">Login</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <Toaster position="top-center" richColors />
    </>
  )
}
