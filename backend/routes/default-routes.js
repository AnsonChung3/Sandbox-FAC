import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const DEFAULT_ROUTES = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enterLog = function (req, res, next) {
    console.log('enter Default route');
    next();
};
DEFAULT_ROUTES.use(enterLog);

DEFAULT_ROUTES.get('/custom-text/:val', (req, res) => {
    console.log(req.params.val);
    res.send('Check your terminal!');
});

DEFAULT_ROUTES.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/index.html'));
});

export default DEFAULT_ROUTES;