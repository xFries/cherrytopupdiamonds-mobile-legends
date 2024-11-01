const express = require('express');
const http = require('https');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*', // Allow all origins (for development purposes)
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get user info from API
app.get('/getUserInfo', (req, res) => {
    const { userid, zoneid } = req.query;


const url = 'https://id-game-checker.p.rapidapi.com/mobile-legends/1393323764/15748';
    const options = {
        method: 'GET',
        hostname: 'id-game-checker.p.rapidapi.com',
        path: `/mobile-legends/${userid}/${zoneid}`,
        headers: {
            'x-rapidapi-key': '97d91667ddmshf44945fe8893112p1e101djsn6620cca38f04', // Replace with your actual RapidAPI key
            'x-rapidapi-host': 'id-game-checker.p.rapidapi.com'
        }
    };

    const reqApi = http.request(options, function (apiRes) {
        const chunks = [];

        apiRes.on('data', function (chunk) {
            chunks.push(chunk);
        });

        apiRes.on('end', function () {
            const body = Buffer.concat(chunks);
            try {
                res.json(JSON.parse(body.toString()));
            } catch (error) {
                res.status(500).json({ error: 'Failed to parse response' });
            }
        });
    });

    reqApi.on('error', (error) => {
        res.status(500).json({ error: error.message });
    });

    reqApi.end();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
