import { BrandNew } from './components/BrandNew';
import { HotPrices } from './components/HotPrices';
import { ShopByCategory } from './components/ShopByCategory';
import { Welcome } from './components/Welcome/Welcome';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main>
      <div className="container">
        <div className={styles.sections}>
          <Welcome />
          <BrandNew />
          <ShopByCategory />
          <HotPrices />
        </div>
      </div>
    </main>
  );
};
