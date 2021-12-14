import { Router } from 'express';
import { getCoresAPI } from "./apis/cores.js";
import { getServersAPI } from "./apis/server.js";
import { getVersionsAPI } from "./apis/versions.js";
export const getRanaAPIRouter = () => {
    const router = Router();
    router.use(getVersionsAPI());
    router.use(getCoresAPI());
    router.use(getServersAPI());
    return router;
};
