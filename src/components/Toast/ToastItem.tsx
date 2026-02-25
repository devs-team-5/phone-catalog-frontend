import { useEffect, useRef, useState } from 'react';
import { useToastStore } from '@/store/toast';
import styles from './Toast.module.scss';
import type { Toast } from '@/store/toast';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import clsx from 'clsx';

interface Props {
  toast: Toast;
  index: number;
}

export const ToastItem: React.FC<Props> = ({ toast, index }) => {
  const { removeToast } = useToastStore();
  const [remaining, setRemaining] = useState(toast.duration);
  const [isPaused, setIsPaused] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      removeToast(toast.id);
    }, remaining);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [remaining, isPaused, removeToast, toast.id]);

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      setRemaining((prev) => prev - elapsed);
    }

    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const renderIcon = () => {
    if (toast.icon === 'heart') return <ICON_MAP.WISHLIST_RED />;
    if (toast.icon === 'cart') return <ICON_MAP.CHECK />;

    if (toast.type === 'success') return <ICON_MAP.CHECK />;
    if (toast.type === 'error') return <ICON_MAP.INFO />;

    return <ICON_MAP.INFO />;
  };

  return (
    <div
      className={clsx(
        styles.toast,
        styles[toast.type],
        toast.isLeaving && styles.leaving,
      )}
      style={{
        transform: `
          translateY(${index * -22}px)
          scale(${1 - index * 0.05})
        `,
        zIndex: 100 - index,
      }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div className={styles.icon}>{renderIcon()}</div>

      <div className={styles.content}>
        <div className={styles.title}>{toast.title}</div>
        <div className={styles.message}>{toast.message}</div>
      </div>

      <button
        className={styles.close}
        onClick={() => removeToast(toast.id)}
      >
        ×
      </button>

      <div
        className={styles.progress}
        style={{
          animationDuration: `${toast.duration}ms`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      />
    </div>
  );
};
