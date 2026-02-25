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

  return (
    <div
      className={clsx(
        styles.toast,
        styles[toast.type],
        toast.isLeaving && styles.leaving,
      )}
      style={{
        transform: `
          translateY(${index * 10}px)
            scale(${1 - index * 0.03})
          `,
        boxShadow: `
          0 ${8 + index * 4}px ${30 + index * 10}px rgba(0,0,0,0.4)
         `,
        zIndex: 100 - index,
      }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div className={styles.icon}>
        {toast.type === 'success' ?
          <ICON_MAP.CHECK />
        : <ICON_MAP.INFO />}
      </div>

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
