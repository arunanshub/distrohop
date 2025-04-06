set dotenv-load	:= true

# Build and start the app using docker compose
app-up:
  docker compose --profile app up -d --build

# Stop the app that's running in docker compose
app-down:
  docker compose --profile app down
