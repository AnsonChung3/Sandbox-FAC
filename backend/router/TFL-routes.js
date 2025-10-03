import express from "express";
import { TFL_KEY } from '../../public/api_keys/TFL_KEY.js';

const TFL_ROUTES = express.Router();

const enterLog = function (req, res, next) {
    console.log('enter TFL route');
    next();
};
TFL_ROUTES.use(enterLog);

TFL_ROUTES.get('/tfl-test', async (req, res) => {
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

export default TFL_ROUTES;