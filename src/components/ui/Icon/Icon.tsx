import { ICON_MAP } from './icons';
import type { IconName } from '@/components/ui/Icon/IconName';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size, className }: IconProps) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      className={className}
    />
  );
};
