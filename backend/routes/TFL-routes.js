import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { TFL_KEY } from '../../backend/api_keys/TFL_KEY.js';

const TFL_ROUTES = express.Router();
const url = 'https://api.tfl.gov.uk';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enterLog = function (req, res, next) {
    console.log('enter TFL route');
    next();
};
TFL_ROUTES.use(enterLog);

TFL_ROUTES.get('/meta-line-stop-points', async (req, res) => {
    try {
        const response = await fetch(`${url}/Line/bakerloo/stoppoints?api_key=${TFL_KEY}`);
        const body = await response.text();
        console.log(response.status);
        // console.log(body); // send something back to client
        const parsedBody = JSON.parse(body);
        const arrayExtract = parsedBody.map((element) => element.commonName);
        console.log(arrayExtract);
        res.send(arrayExtract);
    } catch (error) {
        console.log(error)
    }
});
TFL_ROUTES.get('/meta-lines', async (req, res) => {
    try {
        const response = await fetch(`${url}/Line/Mode/tube,dlr?api_key=${TFL_KEY}`);
        const body = await response.text();
        console.log(response.status);
        // console.log(body); // send something back to client
        const parsedBody = JSON.parse(body);
        const arrayExtract = parsedBody.filter((item) => item.modeName === 'tube').map((element) => element.id);
        console.log(arrayExtract);
        res.send(arrayExtract);
    } catch (error) {
        console.log(error)
    }
});

TFL_ROUTES.get('/meta', async (req, res) => {
    try {
        const response = await fetch (`${url}/Line/Meta/Modes?api_key=${TFL_KEY}`);
        console.log(response.status);
        const body = await response.text();
        const parsedBody = JSON.parse(body);
        const arrayExtract = parsedBody.map((item) => item.modeName);
        console.log(arrayExtract);
        res.send(arrayExtract);
    } catch (error) {
        console.log(error)
    }
})

TFL_ROUTES.get('/tfl-test', async (req, res) => {
    try {
        const response = await fetch(`${url}/Place/Meta/PlaceTypes?api_key=${TFL_KEY}`);
        console.log(response.status);
        const body = await response.text();
        console.log(body);
        res.send(body); // send something back to client
    } catch (error) {
        console.log(error)
    }

})

TFL_ROUTES.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/tfl.html'));
});

export default TFL_ROUTES;