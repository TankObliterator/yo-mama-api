require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FETCH_UPDATES = process.env.FETCH_UPDATES === 'true';
// Provide the base URL to your raw github repository folder containing the JSON files
const GITHUB_REPO_RAW_URL = process.env.GITHUB_REPO_RAW_URL || 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPOSITORY/main/jokes';

// Standard categories
const jokeCategories = ['fat', 'old', 'ugly', 'hairy', 'dumb', 'poor'];
const jokes = {};

// Load jokes from disk
function loadJokesFromDisk() {
    jokeCategories.forEach(category => {
        const filePath = path.join(__dirname, '..', 'jokes', `${category}.json`);
        try {
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                jokes[category] = JSON.parse(data);
                console.log(`Loaded ${jokes[category].length} jokes for category '${category}' from disk.`);
            } else {
                jokes[category] = [];
                console.log(`No local jokes file found for '${category}'.`);
            }
        } catch (error) {
            console.error(`Error loading jokes for ${category} from disk:`, error.message);
            jokes[category] = [];
        }
    });
}

// Fetch jokes from GitHub
async function fetchJokesFromGithub() {
    console.log('Checking GitHub for updated jokes list...');
    for (const category of jokeCategories) {
        try {
            const response = await axios.get(`${GITHUB_REPO_RAW_URL}/${category}.json`);
            if (response.data && Array.isArray(response.data)) {
                jokes[category] = response.data;
                console.log(`Updated ${category} jokes from GitHub (${jokes[category].length} jokes).`);
                
                // Save to local disk cache
                const filePath = path.join(__dirname, '..', 'jokes', `${category}.json`);
                fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
            }
        } catch (error) {
            console.error(`Failed to fetch ${category}.json from GitHub:`, error.message);
        }
    }
}

// Initialize on startup
loadJokesFromDisk();

if (FETCH_UPDATES) {
    console.log('Fetching updates from github is ENABLED.');
    // Run immediately on startup if updates enabled
    fetchJokesFromGithub();
    
    // Schedule to run once a day at midnight
    cron.schedule('0 0 * * *', () => {
        console.log('Running daily cron job to update jokes from GitHub...');
        fetchJokesFromGithub();
    });
} else {
    console.log('Fetching updates from github is DISABLED. Using local files.');
}

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Yo Mama API!',
        categories: jokeCategories,
        endpoints: {
            random: '/jokes/random',
            byCategory: '/jokes/:category',
            allInCategory: '/jokes/:category/all'
        }
    });
});

app.get('/jokes/random', (req, res) => {
    // Pick a random category first
    const availableCategories = jokeCategories.filter(c => jokes[c] && jokes[c].length > 0);
    if (availableCategories.length === 0) {
        return res.status(404).json({ error: 'No jokes found' });
    }
    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    const categoryJokes = jokes[randomCategory];
    const randomJoke = categoryJokes[Math.floor(Math.random() * categoryJokes.length)];
    res.json({ category: randomCategory, joke: randomJoke });
});

app.get('/jokes/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    if (!jokeCategories.includes(category)) {
        return res.status(404).json({ error: 'Category not found', available_categories: jokeCategories });
    }
    const categoryJokes = jokes[category] || [];
    if (categoryJokes.length === 0) {
        return res.status(404).json({ error: 'No jokes found for this category' });
    }
    const randomJoke = categoryJokes[Math.floor(Math.random() * categoryJokes.length)];
    res.json({ category, joke: randomJoke });
});

app.get('/jokes/:category/all', (req, res) => {
    const category = req.params.category.toLowerCase();
    if (!jokeCategories.includes(category)) {
        return res.status(404).json({ error: 'Category not found', available_categories: jokeCategories });
    }
    res.json({ category, jokes: jokes[category] || [] });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
