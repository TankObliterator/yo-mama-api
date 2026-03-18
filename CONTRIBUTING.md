# Contributing

Thank you for your interest in contributing to the Yo Mama API!

We welcome all new "Yo Mama" jokes and general improvements to the API. To get started, please follow these guidelines.

## Joke Guidelines

- Jokes should be in the format "Yo mama's so..." (e.g., "Yo mama's so fat, she has her own zip code.").
- Jokes should remain semi-appropriate.
- Jokes should be in English.

## Adding New Jokes

1. Fork this repository.
2. Open the `.json` file in the `jokes/` directory that relates to the category of your joke (e.g., `fat.json`, `dumb.json`, `lazy.json`).
3. Add your joke to the JSON array.
   - Make sure your joke follows the Joke Guidelines.
   - Make sure your changes are valid JSON (watch your commas and properly escape nested quotes!).
4. Submit a Pull Request targeting the `main` branch.

## Adding a New Category

1. Create a new `.json` file inside the `jokes/` directory (e.g., `jokes/awesome.json`) containing a JSON array of your new jokes.
2. Open `src/index.js` and add your new category string to the `jokeCategories` array (around line 15).
3. Open `README.md` and document your new category in the Categories list.
4. Submit a Pull Request.
