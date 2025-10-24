import express from 'express';
import DEFAULT_ROUTES from './default-routes.js';
import TFL_ROUTES from './TFL-routes.js';
import SANDBOX_ROUTES from './sandbox-routes.js';

const INDEX_ROUTER = express.Router();

INDEX_ROUTER.use('/tfl', TFL_ROUTES);
INDEX_ROUTER.use('/default', DEFAULT_ROUTES);
INDEX_ROUTER.use('/sandbox', SANDBOX_ROUTES);

export default INDEX_ROUTER;
