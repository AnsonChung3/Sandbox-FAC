import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { TFL_KEY } from './public/api_keys/TFL_KEY.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Needed because __dirname isn’t available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

app.get('/tfl-test', async (req, res) => {
    try {
        const response = await fetch(`https://api.tfl.gov.uk/Place/Meta/PlaceTypes?api_key=${TFL_KEY}`);
        console.log(response.status);
        const body = await response.text();
        console.log(body);
        res.send(body); // send something back to client
    } catch (error) {
        console.log(error)
    }

})

// this is the default fall back. Keep this at the end of this file
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
