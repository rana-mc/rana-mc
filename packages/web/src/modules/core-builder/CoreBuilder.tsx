import { selectCurrentGameVersion } from '@modules/game-versions/gameVersionsSlice';
import Empty from '@ui/Empty';
import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { strategies, Strategy } from './strategies';

type Props = {
  onCoreBuild: (core: ServerCore) => void;
};

const CoreBuilder = ({ onCoreBuild }: Props) => {
  const [strategy, setStrategy] = useState<Strategy>();
  const gameVersionValue = useAppSelector(selectCurrentGameVersion);

  const handlerStrategyChange = (_strategy: Strategy) => () => {
    setStrategy(_strategy);
  };

  const handleCoreBuild = (core: ServerCore) => {
    onCoreBuild(core);
  };

  if (!gameVersionValue) {
    return null;
  }

  return (
    <>
      {strategies.map((_strategy) => (
        // eslint-disable-next-line react/jsx-pascal-case
        <_strategy.Selector onChange={handlerStrategyChange(_strategy)} />
      ))}
      {strategy?.CoreBuilder ? (
        <strategy.CoreBuilder gameVersion={gameVersionValue} onCoreBuild={handleCoreBuild} />
      ) : (
        <Empty text="Please, select server core" />
      )}
    </>
  );
};

export default CoreBuilder;
