# Yo Mama API

A simple API for fetching "Yo Mama" jokes across various categories.
> AI was heavily utilized in the creation of this API.

## Categories

- `fat`
- `old`
- `ugly`
- `hairy`
- `dumb`
- `poor`
- `lazy`

## Endpoints

- `GET /`: Get basic API info and endpoints.
- `GET /random`: Fetches a random joke from any category.
- `GET /random/:category`: Fetches a random joke from the specified category.
- `GET /all`: Fetches all jokes across all categories.
- `GET /all/:category`: Fetches all jokes from the specified category.

## Environment Variables

The application can be configured with the following environment variables:

- `PORT`: (Default: `3000`) The port the API runs on.
- `FETCH_UPDATES`: (Default: `false`) If set to `true`, the application will check the specified GitHub repository once a day for an updated jokes list.
- `GITHUB_REPO_RAW_URL`: (Default: `https://raw.githubusercontent.com/TankObliterator/yo-mama-api/main/jokes`) The base URL where the raw `.json` files are hosted, to fetch updates from.

## Docker

This API includes a fully automated Docker build workflow. When changes are pushed to `main` or `master`, the `.github/workflows/docker-publish.yml` creates a new Docker image and pushes it to the GitHub Container Registry (`ghcr.io`).

Run the Docker image:

```bash
docker run -p 3000:3000 -e FETCH_UPDATES=true ghcr.io/TankObliterator/yo-mama-api:latest
```
