import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import TFL_ROUTES from './backend/router/TFL-routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Needed because __dirname isn’t available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

app.use('/tfl', TFL_ROUTES);

})

// this is the default fall back. Keep this at the end of this file
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
