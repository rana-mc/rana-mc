import { FabricCores } from '@rana-mc/fabric';
import { ForgeCores } from '@rana-mc/forge';
import APIRoute from '../APIRoute';

export default class CoresAPI extends APIRoute {
  forgeCores: ForgeCores;

  fabricCores: FabricCores;

  get TAG() {
    return 'RanaAPI-cores';
  }

  constructor() {
    super();

    this.forgeCores = new ForgeCores();
    this.fabricCores = new FabricCores();

    this.init();
  }

  init = async () => {
    this.useForgeCores();
    this.useFabricCores();
  };

  useForgeCores() {
    this.router.use('/forge-cores', async (req, res) => {
      const { version, force } = req.query as { version: string, force: string };
      const refresh = !!force;

      const cores = await this.forgeCores.getCores(version, refresh);

      if (!cores) return res.sendStatus(500);
      return res.send(cores);
    });
  }

  useFabricCores() {
    this.router.use('/fabric-cores', async (req, res) => {
      const { force } = req.query as { version: string, force: string };
      const refresh = !!force;

      const cores = await this.fabricCores.getCores(refresh);

      if (!cores) return res.sendStatus(500);
      return res.send(cores);
    });
  }
}
