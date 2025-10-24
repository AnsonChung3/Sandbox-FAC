import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import INDEX_ROUTER from './backend/routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Needed because __dirname isn’t available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

app.use('/', INDEX_ROUTER);

const logOne = function (req, res, next) {
    console.log('one');
    next();
};

app.get(
    '/router-test',
    [logOne],
    (req, res, next) => {
        next();
    },
    (req, res) => {
        console.log('before cycle end');
        res.send('Tada');
    },
);

// this is the default fall back. Keep this at the end of this file
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
