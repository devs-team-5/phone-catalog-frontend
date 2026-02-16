import { Icon } from '../Icon/Icon';
import type { IconName } from '@/components/ui/Icon/IconName';
import './BadgeIcon.css';

interface BadgeIconProps {
  name: IconName;
  count?: number;
  className?: string;
}

export const BadgeIcon = ({
  name,
  count = 0,
  className = '',
}: BadgeIconProps) => {
  return (
    <div className="badge-container">
      <Icon
        name={name}
        size={20}
        className={className}
      />

      {count > 0 && <span className="icon-badge">{count}</span>}
    </div>
  );
};
