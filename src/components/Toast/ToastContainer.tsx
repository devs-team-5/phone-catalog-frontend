import { useToastStore } from '@/store/toast';
import styles from './Toast.module.scss';
import { ToastItem } from './ToastItem';

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className={styles.container}>
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          index={index}
        />
      ))}
    </div>
  );
};
