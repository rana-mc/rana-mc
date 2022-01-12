import { FabricBuildUtils } from '@rana-mc/fabric';
import { ForgeBuildUtils } from '@rana-mc/forge';
import APIRoute from '../APIRoute';

export default class CoresAPI extends APIRoute {
  forgeBuildUtils: ForgeBuildUtils;

  fabricBuildUtils: FabricBuildUtils;

  get TAG() {
    return 'RanaAPI-cores';
  }

  constructor() {
    super();

    this.forgeBuildUtils = new ForgeBuildUtils();
    this.fabricBuildUtils = new FabricBuildUtils();

    this.init();
  }

  init = async () => {
    this.useForgeCores();
    this.useFabricBuildUtils();
  };

  useForgeCores() {
    this.router.use('/forge-cores', async (req, res) => {
      const { version, force } = req.query as {
        version: string;
        force: string;
      };
      const refresh = !!force;

      const cores = await this.forgeBuildUtils.getCores(version, refresh);

      if (!cores) return res.sendStatus(500);
      return res.send(cores);
    });
  }

  useFabricBuildUtils() {
    this.router.use('/fabric-installers', async (req, res) => {
      const { force } = req.query as { version: string; force: string };
      const refresh = !!force;

      const installers = await this.fabricBuildUtils.getInstallers(refresh);

      if (!installers) return res.sendStatus(500);
      return res.send(installers);
    });

    this.router.use('/fabric-loaders', async (req, res) => {
      const { force } = req.query as { version: string; force: string };
      const refresh = !!force;

      const loaders = await this.fabricBuildUtils.getLoaders(refresh);

      if (!loaders) return res.sendStatus(500);
      return res.send(loaders);
    });

    this.router.use('/fabric-core-status', async (req, res) => {
      const { gameVersion, loaderVersion, installerVersion, force } = req.query as {
        gameVersion: string;
        loaderVersion: string;
        installerVersion: string;
        force: string;
      };
      const refresh = !!force;

      const status = await this.fabricBuildUtils.getCoreStatus(
        {
          game: gameVersion,
          loader: loaderVersion,
          installer: installerVersion,
        },
        refresh
      );

      if (!status) return res.sendStatus(500);
      return res.send(status);
    });
  }
}
