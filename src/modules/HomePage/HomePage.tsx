import { BrandNew } from '@/components/BrandNew/BrandNew';
import { ShopByCategory } from './components/ShopByCategory';
import { Welcome } from './components/Welcome/Welcome';
import styles from './HomePage.module.scss';
import { HotPrices } from '@/components/HotPrices';

export const HomePage = () => {
  return (
    <main>
      <div className={styles.sections}>
        <Welcome />
        <BrandNew />
        <ShopByCategory />
        <HotPrices />
      </div>
    </main>
  );
};
