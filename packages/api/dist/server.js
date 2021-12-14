import express from 'express';
import { config as makeEnvs } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from '@rana-mc/db';
import { log } from "./utils/index.js";
import { getCurseForgeProxy } from "./proxy.js";
import { getRanaAPIRouter } from "./ranaApi.js";
const API_PORT = 3001;
export const startApiServer = async () => {
    makeEnvs();
    await db.init();
    log(`RanaDB: ${JSON.stringify(db.data())}`);
    // TODO: not secure? debug mode?
    log(`API key is ${process.env.CURSE_API_KEY}`);
    const app = express();
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.json());
    app.use('/api', getRanaAPIRouter());
    app.use('/v1', getCurseForgeProxy());
    app.listen(API_PORT, () => {
        log(`Working on ${API_PORT} port...`);
    });
};
