import { Badge as BaseBadge } from 'rsuite';
import cn from 'classnames';
import { TypeAttributes } from 'rsuite/esm/@types/common';
import styles from './index.css';

type Props = {
  content: React.ReactNode;
  color?: TypeAttributes.Color;
  altColor: 'grey';
};

const Badge = ({ content, color, altColor }: Props) => {
  return (
    <div className={cn('badge', `badge_${altColor}`)}>
      <BaseBadge content={content} color={color}></BaseBadge>
    </div>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default Badge;
