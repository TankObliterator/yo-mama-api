# Yo Mama API

A simple API for fetching "Yo Mama" jokes across various categories.

### Public URL
```
https://yo-mama.tankobliterator.net
```
> This URL made available on a best-effort basis. If you require reliability, please self-host the API.

### Categories

- `fat`
- `old`
- `ugly`
- `hairy`
- `dumb`
- `poor`
- `lazy`

### Endpoints

- `GET /`: Get basic API info and endpoints.
- `GET /random`: Fetches a random joke from any category.
- `GET /random/:category`: Fetches a random joke from the specified category.
- `GET /all`: Fetches all jokes across all categories.
- `GET /all/:category`: Fetches all jokes from the specified category.

# Self-hosting

## Docker

When changes are pushed to `main`, a new Docker image is created and pushed to `ghcr.io/TankObliterator/yo-mama-api:latest`.

### Docker Run Command

```bash
docker run -p 3000:3000 -e FETCH_UPDATES=false ghcr.io/TankObliterator/yo-mama-api:latest
```

### Docker Compose file

```yaml
version: '3.8'

services:
  yo-mama-api:
    image: ghcr.io/tankobliterator/yo-mama-api:latest
    container_name: yo-mama-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - FETCH_UPDATES=false
```

### Environment Variables

- `PORT`: (Default: `3000`) The port the API runs on.
- `FETCH_UPDATES`: (Default: `false`) If set to `true`, the application will check the specified GitHub repository once a day for an updated jokes list.
- `GITHUB_REPO_RAW_URL`: (Default: `https://raw.githubusercontent.com/TankObliterator/yo-mama-api/main/jokes`) The base URL where the raw `.txt` files are hosted, to fetch updates from.

# Credits

- Various AI tools were utilized in the creation of this API.
- Inspired by https://github.com/beanboi7/yomomma-apiv2.
- Origional jokes list from https://github.com/aadithyanr/yomama-jokes-api.
