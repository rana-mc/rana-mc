type FabricLocalDBData = {
  installers: FabricInstaller[];
  loaders: FabricLoader[];
  status: { [coreName: string]: number }
};
