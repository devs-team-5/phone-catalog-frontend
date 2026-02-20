import { Typography } from '@/components/ui/Typography/Typography';
import styles from './Test.module.scss';
import { BackButton } from '@/components/common/BackButton/BackButton';

export const Test = () => {
  return (
    <>
      <Typography variant="h1">Test test</Typography>
      <Typography variant="uppercase">Test test</Typography>
      <div className={styles['price-wrapper']}>
        <span className={styles['price-text']}>$899</span>
      </div>
      <Typography variant="line-through">{`$899`}</Typography>
      <BackButton />
    </>
  );
};
