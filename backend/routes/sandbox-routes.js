import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const SANDBOX_ROUTES = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enterLog = function (req, res, next) {
    console.log('enter Sandbox route');
    next();
};
SANDBOX_ROUTES.use(enterLog);

SANDBOX_ROUTES.get('/canvas', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/sandbox-canvas.html'));
});

SANDBOX_ROUTES.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/index.html'));
});

export default SANDBOX_ROUTES;