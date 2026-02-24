import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './BackButton.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      className={`${styles.back}`}
      onClick={handleBack}
    >
      <ICON_MAP.CHEVRON_LEFT />

      <Typography
        className={`${styles.text}`}
        variant="small"
        color="secondary"
      >
        buttons.back
      </Typography>
    </button>
  );
};
