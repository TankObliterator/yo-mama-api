# Contributing

Thank you for your interest in contributing to the Yo Mama API!

We welcome all new "Yo Mama" jokes (see guidelines), and general improvements to the API. To get started, please follow the rules outlined below.

## Joke Guidelines

- Jokes should be in the format "Yo mama's so..." (e.g., "Yo mama's so fat, she has her own zip code.").
- Keep jokes reasonably appropriate.
- Jokes should be in English.

## Adding New Jokes

1. Fork this repository.
2. Open the `.txt` file in the `jokes/` directory that relates to the category of your joke (e.g., `fat.txt`, `dumb.txt`, `lazy.txt`).
3. Add your joke on a new line at the bottom of the file.
   - Make sure your joke follows the Joke Guidelines.
4. Submit a Pull Request targeting the `main` branch.

## Adding a New Category

1. Create a new `.txt` file inside the `jokes/` directory (e.g., `jokes/awesome.txt`) with each joke on a new line.
2. Open `src/index.js` and add your new category string to the `jokeCategories` array (around line 15).
3. Open `README.md` and document your new category in the Categories list.
4. Submit a Pull Request.
