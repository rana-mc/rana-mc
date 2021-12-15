import { ForgeCores } from '@rana-mc/forge';
import APIRoute from '../APIRoute';

export default class CoresAPI extends APIRoute {

  forgeCores: ForgeCores;

  get TAG() {
    return "RanaAPI-cores";
  }

  constructor() {
    super();
    this.forgeCores = new ForgeCores();
  }

  init() {
    // TODO: make it by 'type' in query
    this.useForgeCores();
    this.useFabricCores();
  }

  useForgeCores() {
    this.router.use('/forge-cores', async (req, res) => {
      const { version, force } = req.query as { version: string, force: string };
      const cores = await this.forgeCores.fetchCores(version);

      res.send(cores);
    });
  }

  useFabricCores() {
    this.router.use('/fabric-cores', async (req, res) => {
      res.send([]);
    });
  }
}