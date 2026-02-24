import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './LoginPage.module.scss';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation<'translation'>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@gmail.com' && password === '123456') {
      const mockUser = { id: 1, username: 'Admin', email };
      const mockToken = 'fake-jwt-token';

      login(mockUser, mockToken);
      navigate('/favourites');
    } else {
      setError('Invalid email or password. Try admin@gmail.com / 123456');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Typography
          variant="h1"
          className={styles.title}
        >
          auth.signIn
        </Typography>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />

            <label htmlFor="password">{t('auth.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
          >
            {t('auth.logIn')}
          </button>
        </form>
      </div>
    </div>
  );
};
