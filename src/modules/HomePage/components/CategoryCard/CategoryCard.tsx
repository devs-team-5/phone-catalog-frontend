import type React from 'react';
import { useRef } from 'react';
import styles from './CategoryCard.module.scss';
import { Link } from 'react-router-dom';
import { Typography } from '@/components/ui/Typography/Typography';

type Props = {
  to: string;
  image: string;
  video: string;
  title: string;
  count: number;
};

export const CategoryCard: React.FC<Props> = ({
  to,
  image,
  video,
  title,
  count,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        console.error('Video play failed:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className={styles.card}>
      <Link
        to={to}
        className={styles.linkWrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.imgContainer}>
          <img
            src={image}
            className={styles.image}
            alt={title}
            loading="lazy"
          />

          <video
            ref={videoRef}
            className={styles.video}
            src={video}
            muted
            loop
            playsInline
            preload="none"
          />
        </div>

        <Typography
          variant="h4"
          className={styles.cardTitle}
        >
          {title}
        </Typography>

        <Typography
          variant="body"
          color="secondary"
          className={styles.count}
        >
          {count} models
        </Typography>
      </Link>
    </div>
  );
};
