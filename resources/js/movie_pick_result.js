import { Transmit } from '@adonisjs/transmit-client'

const transmit = new Transmit({
  baseUrl: window.location.origin,
})

async function init() {
  const subscription = transmit.subscription('result')

  await subscription.create()

  subscription.onMessage((data) => {
    if (!data.winner) return
    fetch(`/movies/${data.winner}`)
      .then((r) => r.json())
      .then((movie) => {
        document.getElementById('waiting').classList.add('hidden')
        document.getElementById('winner-poster').src = movie.posterUrl
        document.getElementById('winner-title').textContent = movie.title
        document.getElementById('winner-rating').textContent = `★ ${movie.voteAverage.toFixed(1)}`
        document.getElementById('winner').classList.remove('hidden')
      })
      .catch((err) => console.error('Failed to fetch movie:', err))
  })

  await fetch('/select/result/ready', {
    method: 'POST',
  })
}

init()
