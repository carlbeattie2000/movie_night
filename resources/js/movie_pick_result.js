import { Transmit } from '@adonisjs/transmit-client'

const transmit = new Transmit({
  baseUrl: window.location.origin,
})

async function init() {
  const subscription = transmit.subscription('result')

  await subscription.create()

  subscription.onMessage((data) => {
    if (!data.winner) return
    window.location.href = '/match/result'
  })

  await fetch('/match/ready', {
    method: 'POST',
  })
}

init()
