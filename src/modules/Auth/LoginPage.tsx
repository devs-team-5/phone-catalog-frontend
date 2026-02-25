import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './LoginPage.module.scss';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/utils/supabaseClient';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const navigate = useNavigate();
  const { t } = useTranslation<'translation'>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginMode) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (signUpError) throw signUpError;
      }
      navigate('/favourites');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred during authentication.');
      } else {
        setError('An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred during Google sign-in.');
      } else {
        setError('An error occurred during Google sign-in.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Typography
          variant="h1"
          className={styles.title}
        >
          {isLoginMode ? t('auth.signIn') : 'Sign Up'}
        </Typography>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.field}>
            {!isLoginMode && (
              <>
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </>
            )}

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
              minLength={6}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ?
              'Processing...'
            : isLoginMode ?
              t('auth.logIn')
            : 'Sign Up'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className={styles.googleBtn}
            disabled={loading}
          >
            Sign in with Google
          </button>
        </form>

        <div className={styles.toggleMode}>
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className={styles.toggleBtn}
          >
            {isLoginMode ?
              "Don't have an account? Sign up"
            : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};
