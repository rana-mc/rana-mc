import FabricStrategy from './FabricStrategy/FabricStrategy';
import ForgeStrategy from './ForgeStrategy';

export type Strategy = typeof ForgeStrategy | typeof FabricStrategy;

export type StrategyCoreBuilder =
  | typeof ForgeStrategy.CoreBuilder
  | typeof FabricStrategy.CoreBuilder;

export const strategies: Strategy[] = [ForgeStrategy, FabricStrategy];
