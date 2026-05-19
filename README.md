# Movie Night

A small app I built for me and my girlfriend after we kept forgetting whose turn it was to choose the movie. We’d also end up accidentally watching one person’s picks several nights in a row, so I decided to make something to handle it for us.

I also added a small word game before the movie selection process, where the winner gets a slight advantage when choosing.

### Features
- Designed for two users
- Movie search powered by [TMDb](https://www.themoviedb.org/?language=en-GB)
- Watch providers powered by [JustWatch](https://www.justwatch.com/)
- Shared watchlist and watched movies list
- Real-time events using Socket.IO
- Word game that gives the winner a small edge
- Rate watched movies

## Deployment

### Ubuntu
```bash
# Install SQLite
sudo apt-get install sqlite3

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# Install Node.js
nvm install 24
```

#### Install and Configure Caddy
Install Caddy using the official documentation:
[Caddy Installation Docs](https://caddyserver.com/)

Example Caddy configuration:
```bash
your-domain.com {
  reverse_proxy localhost:3333
}
```
#### Clone the Repository

```bash
mkdir -p /var/www
cd /var/www

git clone https://github.com/carlbeattie2000/movie_night.git movies

cd movies

npm install

# Copy and fill out environment variables
cp .env.example .env
```

#### Build the application
```bash
# Generate application key
node ace generate:key

# Build the app
node ace build

# Copy environment file into build output
cp .env build/.env

cd build

# Run database migrations
node ace migration:run

# Start with PM2
pm2 start "node bin/server.js" --name movie_night
```


## Disclaimer
This project is still a work in progress and may contain bugs or rough edges.
